import { graphqlClient } from "@/client/api";
import { CreateTweetData } from "@/gql/graphql";
import { CreateTweetMutations } from "@/graphql/mutations/tweets";
import { GetAllTweetsQuery } from "@/graphql/query/tweets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["tweets-data"],
    queryFn: () => graphqlClient.request(GetAllTweetsQuery),
  });

  return { ...query, tweets: query.data?.getAllTweets };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqlClient.request(CreateTweetMutations, { payload }),
    onMutate: (payload) => toast.loading("Creating tweet", { id: "1" }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tweets-data"]);
      toast.success("Tweets created successfully", {id: "1"});
    },
  });

  return mutation;
};
