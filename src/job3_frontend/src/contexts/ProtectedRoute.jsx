import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { useAuth } from "./AuthContext";
import LoadingPage from "../pages/additional/LoadingPage";

const ProtectedRoute = ({ children }) => {
    const { principal, loading, authenticatedActor } = useAuth();
    const location = useLocation();

    const [checking, setChecking] = useState(true);
    const [userExists, setUserExists] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [fatalErr, setFatalErr] = useState(null);

    useEffect(() => {
        let alive = true;

        const run = async () => {
            if (loading) return;

            if (!principal) {
                setChecking(false);
                return;
            }

            if (!authenticatedActor) {
                setFatalErr("Not authenticated yet (actor missing).");
                setChecking(false);
                return;
            }

            try {
                const pid =
                    typeof principal === "string"
                        ? Principal.fromText(principal)
                        : principal;

                const res = await authenticatedActor.getUserByPrincipalId(pid);

                if (!alive) return;

                if (res?.ok !== undefined) {
                    setUserExists(true);
                } else if (res?.err?.NotFound !== undefined) {
                    setNotFound(true);
                } else if (res?.err) {
                    setFatalErr(JSON.stringify(res.err));
                } else {
                    setFatalErr("Unexpected response shape.");
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

    // 🔄 Loading auth atau cek user → tampilkan halaman loading
    if (loading || checking) {
        return <LoadingPage />;
    }

    if (!principal) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (notFound) {
        return <Navigate to="/create-user" state={{ from: location }} replace />;
    }

    if (fatalErr && !userExists) {
        console.error("ProtectedRoute error:", fatalErr);
        return (
            <div className="p-6 text-red-400">
                <p className="font-mono text-sm">
                    Failed to verify user: {fatalErr}
                </p>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
