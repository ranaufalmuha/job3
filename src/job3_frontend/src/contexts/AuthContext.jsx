import { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from "@dfinity/agent";
import { canisterId, idlFactory } from "./../../../declarations/job3_backend/index.js";

const isDevelopment = process.env.DFX_NETWORK === 'local';
const backendCanister = canisterId;

const CONFIG = {
    development: {
        host: "http://localhost:4943", // Ganti ke localhost
        // HILANGKAN #authorize dari URL!
        identityProvider: process.env.CANISTER_ID_INTERNET_IDENTITY
            ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
            : `http://uzt4z-lp777-77774-qaabq-cai.localhost:4943`
    },
    production: {
        host: "https://icp-api.io",
        identityProvider: "https://id.ai", // Hilangkan #authorize juga
    },
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [principal, setPrincipal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticatedActor, setAuthenticatedActor] = useState(null);
    const [authClient, setAuthClient] = useState(null);
    const [error, setError] = useState(null);


    const createAuthenticatedActor = async (identity) => {
        try {
            const config = isDevelopment ? CONFIG.development : CONFIG.production;

            const agent = new HttpAgent({
                identity,
                host: config.host,
            });

            if (isDevelopment) {
                try {
                    await agent.fetchRootKey();
                    console.log("✅ Root key fetched successfully");
                } catch (e) {
                    console.warn("⚠️ fetchRootKey failed:", e.message);
                    // Continue anyway - sometimes it still works
                }
            }

            // FIX: Gunakan canisterId bukan backendCanister sebagai property name
            const actor = Actor.createActor(idlFactory, {
                agent,
                canisterId: backendCanister, // Ini harus jadi property canisterId
            });

            return actor;
        } catch (error) {
            console.error("❌ Error creating authenticated actor:", error);
            setError(`Actor creation failed: ${error.message}`);
            return null;
        }
    };

    const initAuthClient = async () => {
        try {
            const client = await AuthClient.create({
                idleOptions: {
                    disableDefaultIdleCallback: true,
                    idleTimeout: 1000 * 60 * 30,
                },
            });
            console.log("✅ Auth client created");
            setAuthClient(client);
            return client;
        } catch (error) {
            console.error("❌ Failed to create auth client:", error);
            setError(`Auth client creation failed: ${error.message}`);
            return null;
        }
    };

    const checkAuth = async () => {
        console.log("🔍 Checking authentication...");
        try {
            let client = authClient;
            if (!client) {
                client = await initAuthClient();
                if (!client) {
                    setLoading(false);
                    return;
                }
            }

            const isAuthenticated = await client.isAuthenticated();
            console.log("🔍 Is authenticated:", isAuthenticated);

            if (isAuthenticated) {
                const identity = client.getIdentity();
                const principalText = identity.getPrincipal().toText();
                console.log("🔍 Principal:", principalText);

                // Skip anonymous principal
                if (principalText === '2vxsx-fae') {
                    console.log("⚠️ Anonymous principal, treating as not authenticated");
                    setPrincipal(null);
                    setAuthenticatedActor(null);
                } else {
                    setPrincipal(principalText);
                    const actor = await createAuthenticatedActor(identity);
                    setAuthenticatedActor(actor);
                }
            } else {
                setPrincipal(null);
                setAuthenticatedActor(null);
            }
        } catch (error) {
            console.error("❌ Auth check error:", error);
            setError(`Auth check failed: ${error.message}`);
            setPrincipal(null);
            setAuthenticatedActor(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        console.log("🚀 Starting login process...");
        setError(null);

        try {
            let client = authClient;
            if (!client) {
                client = await initAuthClient();
                if (!client) {
                    throw new Error("Failed to initialize auth client");
                }
            }

            const config = isDevelopment ? CONFIG.development : CONFIG.production;
            console.log("🔧 Using config:", {
                isDevelopment,
                identityProvider: config.identityProvider,
                host: config.host
            });

            // Pre-flight check untuk development
            if (isDevelopment) {
                try {
                    const testResponse = await fetch(config.host + '/api/v2/status');
                    console.log("✅ dfx replica is accessible");
                } catch (e) {
                    console.error("❌ Cannot reach dfx replica:", e);
                    setError("dfx replica is not running. Please run 'dfx start'");
                    return;
                }
            }

            return new Promise((resolve, reject) => {
                console.log("🔐 Calling AuthClient.login...");

                client.login({
                    identityProvider: config.identityProvider,
                    maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
                    windowOpenerFeatures: `
                        width=500,height=600,
                        left=${Math.round((window.screen.width - 500) / 2)},
                        top=${Math.round((window.screen.height - 600) / 2)},
                        toolbar=0,location=0,menubar=0,status=0,scrollbars=1,resizable=1
                    `,
                    onSuccess: async () => {
                        console.log("✅ Login callback: SUCCESS");
                        try {
                            const identity = client.getIdentity();
                            const principalText = identity.getPrincipal().toText();

                            console.log("✅ Login successful, principal:", principalText);

                            setPrincipal(principalText);
                            const actor = await createAuthenticatedActor(identity);
                            setAuthenticatedActor(actor);
                            resolve();
                        } catch (error) {
                            console.error("❌ Post-login setup failed:", error);
                            setError(`Post-login setup failed: ${error.message}`);
                            reject(error);
                        }
                    },
                    onError: (error) => {
                        console.error("❌ Login callback: ERROR", error);

                        let errorMessage = 'Login failed';
                        if (error?.message?.includes('ERR_BLOCKED_BY_CLIENT')) {
                            errorMessage = 'Connection blocked by ad blocker or browser. Please disable ad blocker for localhost.';
                        } else if (error?.message?.includes('popup') || error?.message?.includes('blocked')) {
                            errorMessage = 'Please allow popups for this site.';
                        } else if (error?.message?.includes('UserInterrupt')) {
                            errorMessage = 'Login cancelled';
                        } else if (error?.message?.includes('Connection closed')) {
                            errorMessage = 'Cannot connect to Internet Identity. Check dfx status.';
                        } else if (error?.message) {
                            errorMessage = error.message;
                        }

                        setError(errorMessage);
                        reject(error);
                    },
                });
            });
        } catch (error) {
            console.error("❌ Login initialization error:", error);
            setError(`Login failed: ${error.message}`);
            throw error;
        }
    };

    const logout = async () => {
        console.log("🚪 Logging out...");
        try {
            let client = authClient;
            if (!client) {
                client = await AuthClient.create();
            }

            await client.logout();
            setPrincipal(null);
            setAuthenticatedActor(null);
            setError(null);
            console.log("✅ Logout successful");
        } catch (error) {
            console.error("❌ Logout error:", error);
            setError(`Logout failed: ${error.message}`);
        }
    };

    useEffect(() => {
        console.log("🎬 AuthProvider mounted, checking auth...");
        checkAuth();
    }, []);

    const value = {
        principal,
        setPrincipal,
        loading,
        login,
        logout,
        checkAuth,
        authenticatedActor,
        isAuthenticated: !!principal && principal !== '2vxsx-fae',
        error,
        setError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};