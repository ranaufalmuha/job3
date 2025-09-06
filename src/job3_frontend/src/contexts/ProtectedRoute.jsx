import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoadingPage from "../pages/additional/LoadingPage";

/**
 * ProtectedRoute
 * - require: "user" | "company" | "any"
 *   - "user"    -> hanya akun user yang boleh
 *   - "company" -> hanya akun company yang boleh
 *   - "any"     -> user atau company boleh (kalau none diarahkan ke pemilihan/creation)
 *
 * Redirect default (silakan sesuaikan path-nya dengan app kamu):
 * - none + require=user    -> /create-user
 * - none + require=company -> /create-company
 * - company masuk user-only -> /company (atau dashboard company kamu)
 * - user masuk company-only -> /app (atau dashboard user kamu)
 */
const ProtectedRoute = ({ children, require = "any" }) => {
    const { principal, loading, authenticatedActor } = useAuth();
    const location = useLocation();

    const [checking, setChecking] = useState(true);
    const [accountType, setAccountType] = useState/** @type {null | "none" | "user" | "company"} */(null);
    const [fatalErr, setFatalErr] = useState(null);

    useEffect(() => {
        let alive = true;

        const run = async () => {
            if (loading) return;

            if (!principal) {
                // tidak login
                setChecking(false);
                return;
            }

            if (!authenticatedActor) {
                if (alive) {
                    setFatalErr("Not authenticated yet (actor missing).");
                    setChecking(false);
                }
                return;
            }

            try {
                const res = await authenticatedActor.getAccountType();
                if (!alive) return;

                if (res && typeof res === "object") {
                    if ("user" in res) setAccountType("user");
                    else if ("company" in res) setAccountType("company");
                    else if ("none" in res) setAccountType("none");
                    else {
                        setFatalErr("Unexpected accountType variant.");
                    }
                } else {
                    setFatalErr("Empty or invalid response from getAccountType.");
                }
            } catch (e) {
                if (!alive) return;
                setFatalErr(e?.message || String(e));
            } finally {
                if (alive) setChecking(false);
            }
        };

        run();
        return () => {
            alive = false;
        };
    }, [loading, principal, authenticatedActor]);

    // ⏳ Loading auth / cek akun
    if (loading || checking) {
        return <LoadingPage />;
    }

    // 🔐 Belum login -> go to /auth
    if (!principal) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // ❌ Error fatal saat cek akun
    if (fatalErr) {
        console.error("ProtectedRoute error:", fatalErr);
        return (
            <div className="p-6 text-red-400">
                <p className="font-mono text-sm">Failed to verify account: {fatalErr}</p>
            </div>
        );
    }

    // 🎯 Routing rules berdasar require + accountType
    if (require === "user") {
        if (accountType === "none") {
            return <Navigate to="/create-user" state={{ from: location }} replace />;
        }
        if (accountType === "company") {
            // sudah company, blokir akses ke rute khusus user
            return <Navigate to="/company" replace />;
        }
        // user OK
        return children;
    }

    if (require === "company") {
        if (accountType === "none") {
            return <Navigate to="/create-user" state={{ from: location }} replace />;
        }
        if (accountType === "user") {
            // sudah user, blokir akses ke rute khusus company
            return <Navigate to="/app" replace />;
        }
        // company OK
        return children;
    }

    // require === "any"
    if (accountType === "none") {
        // kalau kamu punya halaman pemilihan tipe akun, arahkan ke sana
        return <Navigate to="/create-user" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
