"use client";
import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/client/api";
import { VerifyGoogleUserTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

const GoogleButton: React.FC = () => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        VerifyGoogleUserTokenQuery,
        { token: googleToken }
      );
      if (!verifyGoogleToken) return toast.error("token not found");

      toast.success("Verified Success");
      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
        await queryClient.invalidateQueries(["current-user"]);
      }
    },
    [queryClient]
  );

  return (
    <>
      {!user ? (
        <div className="rounded-lg  p-5 bg-slate-500">
          <h1 className="text-xl">New to twitter?</h1>
          <GoogleLogin onSuccess={handleLogin} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GoogleButton;
