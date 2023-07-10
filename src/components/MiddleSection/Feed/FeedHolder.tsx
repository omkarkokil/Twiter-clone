"use client";

import React, { FC } from "react";
import FeedCard from "./FeedCard";
import { Tweet } from "@/gql/graphql";
import { graphqlClient } from "@/client/api";
import { GetAllTweetsQuery } from "@/graphql/query/tweets";
import { notFound } from "next/navigation";
import { useGetAllTweets } from "@/hooks/tweets";

// const getServerSideProps = async () => {
//   const userinfo = await graphqlClient.request(GetAllTweetsQuery);

//   if (!userinfo.getAllTweets) return notFound();

//   return {
//     tweets: userinfo.getAllTweets,
//   };
// };

interface TweetArray {
  tweets?: Tweet[];
}

const FeedHolder: FC<TweetArray> = (props) => {
  // const tweet = await getServerSideProps();
  console.log(props);

  const { tweets = props.tweets } = useGetAllTweets();

  return (
    <>
      {tweets?.map((tweet) => (
        <FeedCard key={tweet?.id} data={tweet as Tweet} />
      ))}
    </>
  );
};

export default FeedHolder;
