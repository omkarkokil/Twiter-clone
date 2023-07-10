"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/client/api";
import { VerifyGoogleUserTokenQuery } from "../../graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import FollowButton from "@/app/[id]/layouts/FollowButton";
import Link from "next/link";

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
        await queryClient.invalidateQueries(["curent-user"]);
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
        <div className="rounded-lg p-5 bg-slate-900">
          <h1 className="text-xl mb-5">Users you may know</h1>
          {user.recommenedUsers?.map((ele) => (
            <>
              <div
                key={ele?.id}
                className="flex items-center justifu-center mt-4 gap-5"
              >
                {ele?.profileImageURL && (
                  <Image
                    src={ele?.profileImageURL}
                    height={50}
                    className="rounded-full"
                    alt={"none"}
                    width={50}
                  />
                )}
                <div>
                  <p className="text-sm my-1">
                    {ele?.firstName} {ele?.lastName}
                  </p>
                  <Link
                    href={`/${ele?.id}`}
                    className="bg-white text-black text-sm px-3 py-1 w-full rounded-lg"
                  >
                    View
                  </Link>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default GoogleButton;
