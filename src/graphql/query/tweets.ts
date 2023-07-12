import { graphql } from "@/gql";

export const GetAllTweetsQuery = graphql(`
  query GetAllTweetData {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);

export const getSignedUrlForTweetQuery = graphql(
  `
    query GetSignedUrl($imageType: String!, $imageName: String!) {
      getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)
    }
  `
);
