import React, { useState, useEffect } from "react";
import { authApp } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedPage({ children }) {
  const location = useLocation();
  const [user, loading, error] = useAuthState(authApp.auth);

  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
      replace
    />
  );
}
