"use client";
import React, { useCallback } from "react";
import { toast } from "react-hot-toast";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/client/api";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { VerifyGoogleUserTokenQuery } from "@/graphql/query/user";

const GoogleButton: React.FC = () => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  console.log(user);

  const handleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        VerifyGoogleUserTokenQuery,
        {
          token: googleToken,
        }
      );
      console.log(verifyGoogleToken);
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
      <div className="rounded-lg  p-5 bg-slate-500">
        <h1 className="text-xl">New to twitter?</h1>
        <GoogleLogin onSuccess={handleLogin} />
      </div>
    </>
  );
};

export default GoogleButton;
