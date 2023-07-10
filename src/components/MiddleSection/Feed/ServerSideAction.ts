import { graphqlClient } from "@/client/api";
import { GetAllTweetsQuery } from "@/graphql/query/tweets";
import { notFound } from "next/navigation";

export const getServerSideProps = async () => {
  const userinfo = await graphqlClient.request(GetAllTweetsQuery);

  if (!userinfo.getAllTweets) return notFound();

  return userinfo.getAllTweets;
};
