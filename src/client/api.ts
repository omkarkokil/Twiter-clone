import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";
console.log(isClient, "faslse");

export const graphqlClient = new GraphQLClient(
  "http://localhost:8000/graphql",
  {
    headers: () => ({
      Authorization: isClient
        ? `Bearer ${window.localStorage.getItem("__twitter_token")}`
        : "",
    }),
  }
);
