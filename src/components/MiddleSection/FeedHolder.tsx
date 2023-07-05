"use client";

import React, { FC } from "react";
import FeedCard from "./FeedCard";
import { useGetAllTweets } from "@/hooks/tweets";
import { Tweet } from "@/gql/graphql";

const FeedHolder: FC = () => {
  const { tweets = [] } = useGetAllTweets();
  return (
    <>
      {tweets?.map((tweet) => (
        <FeedCard key={tweet?.id} data={tweet as Tweet} />
      ))}
    </>
  );
};

export default FeedHolder;
