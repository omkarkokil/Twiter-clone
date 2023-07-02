import { graphql } from "../../gql";

export const VerifyGoogleUserTokenQuery = graphql(`#graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);
