// pages/ProfileGate.tsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingPage from "./additional/LoadingPage";

export const ProfileGate = () => {
  const { authenticatedActor, principal } = useAuth();
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] =
    useState(null);
  const [fatalErr, setFatalErr] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!authenticatedActor || !principal) return;
      setLoading(true);
      try {
        const res = await authenticatedActor.getAccountType();
        if (cancelled) return;

        if (res && typeof res === "object") {
          if ("user" in res) setAccountType("user");
          else if ("company" in res) setAccountType("company");
          else if ("none" in res) setAccountType("none");
          else setFatalErr("Unexpected variant from getAccountType.");
        } else {
          setFatalErr("Invalid response from getAccountType.");
        }
      } catch (e) {
        if (!cancelled) setFatalErr(e?.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [authenticatedActor, principal]);

  if (loading) return <LoadingPage />;

  if (fatalErr) {
    return (
      <div className="p-6 text-red-400">
        <p className="font-mono text-sm">Failed to verify account: {fatalErr}</p>
      </div>
    );
  }

  // Kalau belum punya akun apa pun → arahkan ke create-user (atau halaman pemilihan tipe akun)
  if (accountType === "none") {
    return <Navigate to="/create-user" state={{ from: location }} replace />;
  }

  // Redirect sesuai tipe akun (hanya saat user mengunjungi /profile secara langsung)
  // NOTE: biarkan child routes jalan jika sudah berada di /profile/user atau /profile/company/*
  if (location.pathname === "/profile") {
    if (accountType === "user") return <Navigate to="/profile/user" replace />;
    if (accountType === "company")
      return <Navigate to="/profile/company" replace />;
  }

  // Kalau sudah di child route, cukup render <Outlet/>
  return <Outlet />;
};
