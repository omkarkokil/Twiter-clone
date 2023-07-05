import { graphql } from "@/gql";

export const GetAllTweetsQuery = graphql(`
  query GetAllTweetData {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);