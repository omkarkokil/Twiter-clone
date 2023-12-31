import { graphqlClient } from "@/client/api";
import TweeterLayout from "@/components/Layouts/TweeterLayout";
import FeedCard from "@/components/MiddleSection/Feed/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { getUserByIdQuery } from "@/graphql/query/user";
import { notFound } from "next/navigation";

import Image from "next/image";
import React, { FC } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { NextRouter } from "next/router";
import FollowButton from "./layouts/FollowButton";

const getServerSideUserProps = async (context: any) => {
  const id = context.id as string | undefined;

  if (!id) return notFound();

  const userinfo = await graphqlClient.request(getUserByIdQuery, {
    id,
  });

  if (!userinfo.getUserById) return notFound();

  return {
    userInfo: userinfo.getUserById as User,
  };
};

const Profile = async ({ params }: { params: any }) => {
  const user = await getServerSideUserProps(params);

  // const { user: currentUser } = useCurrentUser();

  return (
    <div>
      <TweeterLayout>
        <div>
          <nav className="flex items-center gap-2">
            <div className="px-4">
              <Link href={"/"}>
                <div className="p-1 cursor-pointer rounded-full hover:bg-slate-700">
                  <BsArrowLeftShort className="text-3xl " />
                </div>
              </Link>
            </div>
            <div className="px-2 py-1">
              <h1 className="text-lg font-bold">
                {" "}
                {user?.userInfo.firstName} {user?.userInfo.lastName}
              </h1>
              <p className="text-xs  text-slate-600 ">
                {user?.userInfo?.tweet?.length} Tweets
              </p>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-700">
            {user.userInfo.profileImageURL && (
              <Image
                src={user?.userInfo?.profileImageURL}
                height={125}
                className="rounded-full"
                width={125}
                alt="none"
              />
            )}
            <h1 className="text-xl mt-4 font-bold px-2">
              {user?.userInfo.firstName} {user?.userInfo.lastName}
            </h1>
            <div className="flex items-center justify-between px-2">
              <div className="px-2 text-sm text-gray-500">
                <span>
                  <span className="text-white text-lg">
                    {user.userInfo.followers?.length}
                  </span>{" "}
                  Followers
                </span>{" "}
                <span>
                  {" "}
                  <span className="text-white text-lg">
                    {user.userInfo.following?.length}
                  </span>{" "}
                  Following
                </span>{" "}
              </div>
              <FollowButton userInfo={user.userInfo as User} />
            </div>
          </div>
          <div>
            {user?.userInfo?.tweet?.map((tweet) => (
              <FeedCard data={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </TweeterLayout>
    </div>
  );
};

export default Profile;
