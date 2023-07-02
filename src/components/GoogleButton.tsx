"use client";
import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/client/api";
import { VerifyGoogleUserTokenQuery } from "@/graphql/query/user";

const GoogleButton: React.FC = () => {
  const handleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error("Token not found");

    const { verifyGoogleToken } = await graphqlClient.request(
      VerifyGoogleUserTokenQuery,
      { token: googleToken }
    );
    if (verifyGoogleToken)
    return window.localStorage.setItem(
      "__token_for_Google",
      verifyGoogleToken
      );
      toast.success("verify success");
  }, []);

  return (
    <>
      <GoogleLogin onSuccess={handleLogin} />
    </>
  );
};

export default GoogleButton;
