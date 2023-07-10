import React, { FC } from "react";
import FeedCard from "./FeedCard";
import { Tweet } from "@/gql/graphql";
import { graphqlClient } from "@/client/api";
import { GetAllTweetsQuery } from "@/graphql/query/tweets";
import { notFound } from "next/navigation";
import { useGetAllTweets } from "@/hooks/tweets";

const getServerSideProps = async () => {
  const userinfo = await graphqlClient.request(GetAllTweetsQuery);

  if (!userinfo.getAllTweets) return notFound();

  return {
    tweets: userinfo.getAllTweets,
  };
};

const FeedHolder: FC = async () => {
  const tweet = await getServerSideProps();

  // const { tweets = tweet.tweets } = useGetAllTweets();

  return (
    <>
      {tweet.tweets?.map((tweet) => (
        <FeedCard key={tweet?.id} data={tweet as Tweet} />
      ))}
    </>
  );
};

export default FeedHolder;
