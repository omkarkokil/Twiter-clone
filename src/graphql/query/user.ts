import { graphql } from "../../gql";

export const VerifyGoogleUserTokenQuery = graphql(`
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
      following {
        lastName
        firstName
        profileImageURL
        id
      }
      recommenedUsers {
        lastName
        firstName
        profileImageURL
        id
      }
      followers {
        lastName
        firstName
        profileImageURL
        id
      }
      tweet {
        id
        content
        author {
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);

export const getUserByIdQuery = graphql(`
  #graphql
  query GetuserById($id: ID!) {
    getUserById(id: $id) {
      lastName
      firstName
      id
      profileImageURL
      following {
        lastName
        firstName
        profileImageURL
        id
      }
      followers {
        lastName
        firstName
        profileImageURL
        id
      }

      tweet {
        content
        id
        imageURL
        author {
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);
