import { graphql } from "@/gql";

export const CreateTweetMutations = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetData!) {
    CreateTweet(payload: $payload) {
      id
    }
  }
`);
