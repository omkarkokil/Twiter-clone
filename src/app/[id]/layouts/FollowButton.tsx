"use client";

import { graphqlClient } from "@/client/api";
import { User } from "@/gql/graphql";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";
import { useCurrentUser } from "@/hooks/user";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { FC, useCallback, useMemo } from "react";

interface UserProps {
  userInfo?: User;
}

const FollowButton: FC<UserProps> = (props) => {
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();

  const amIFolowing = useMemo(() => {
    if (!props.userInfo) return false;
    return (
      (user?.following?.findIndex((ele) => ele?.id === props.userInfo?.id) ??
        -1) >= 0
    );
  }, [user?.following, props.userInfo]);

  const handleUnFollow = useCallback(async () => {
    if (!props.userInfo?.id) return;
    await graphqlClient.request(unfollowUserMutation, {
      to: props.userInfo?.id,
    });
    await queryClient.invalidateQueries(["curent-user"]);
  }, [props.userInfo?.id, queryClient]);

  const handleFollow = useCallback(async () => {
    if (!props.userInfo?.id) return;
    await graphqlClient.request(followUserMutation, {
      to: props.userInfo?.id,
    });
    await queryClient.invalidateQueries(["curent-user"]);
  }, [props.userInfo?.id, queryClient]);

  return (
    <>
      {props.userInfo?.id !== user?.id &&
        (amIFolowing ? (
          <button
            onClick={handleUnFollow}
            className="bg-white text-black  py-2 px-5 rounded-full font-semibold"
          >
            UnFollow
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className="bg-white text-black  py-2 px-5 rounded-full font-semibold"
          >
            Follow
          </button>
        ))}
    </>
  );
};

export default FollowButton;
