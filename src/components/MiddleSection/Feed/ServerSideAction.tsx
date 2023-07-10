import React from "react";
import { graphqlClient } from "@/client/api";
import { GetAllTweetsQuery } from "@/graphql/query/tweets";
import { notFound } from "next/navigation";
import FeedHolder from "./FeedHolder";
import { Tweet } from "@/gql/graphql";

const getServerSideProps = async () => {
  const tweets = await graphqlClient.request(GetAllTweetsQuery);

  if (!tweets.getAllTweets) return notFound();

  return { tweets: tweets.getAllTweets as Tweet[] };
};

const ServerSideAction = async () => {
  const tweet = await getServerSideProps();

  return (
    <>
      <FeedHolder tweets={tweet.tweets as Tweet[]} />
    </>
  );
};

export default ServerSideAction;
