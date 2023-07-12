"use client";

import { Tweet } from "@/gql/graphql";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweets";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import FeedHolder from "../Feed/FeedHolder";
import { graphqlClient } from "@/client/api";
import { getSignedUrlForTweetQuery } from "@/graphql/query/tweets";
import axios from "axios";
import { toast } from "react-hot-toast";

interface InputProps {
  data?: Tweet[];
}

const TweetInput: React.FC = () => {
  const { user } = useCurrentUser();
  const { mutate, mutateAsync } = useCreateTweet();

  const [image, setImage] = useState("");

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (e: Event) => {
      e.preventDefault();
      const File: File | undefined | null = input.files?.item(0);
      if (!File) return;
      console.log(File.type);

      const { getSignedUrlForTweet } = await graphqlClient.request(
        getSignedUrlForTweetQuery,
        {
          imageName: File.name,
          imageType: File.type,
        }
      );

      if (getSignedUrlForTweet) {
        toast.loading("Uploading image...", { id: "2" });
        await axios.put(getSignedUrlForTweet, File, {
          headers: {
            "Content-Type": File.type,
          },
        });
        toast.success("Upload completed", { id: "2" });
        const url = new URL(getSignedUrlForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImage(myFilePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handleFn = handleInputChangeFile(input);

    input.addEventListener("change", handleFn);
    input.click();
  }, []);

  const [content, setContent] = useState("");

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
      imageURL: image,
    });
    setContent("");
    setImage("");
  }, [content, mutate, image]);
  return (
    <>
      <div className="grid grid-cols-12 gap-3 p-4">
        <div className="col-span-1">
          {user?.profileImageURL && (
            <Image
              src={user?.profileImageURL}
              className="rounded-full"
              height={50}
              width={50}
              alt="none"
            />
          )}
        </div>
        <div className="col-span-11">
          <div className=" border-b border-slate-700">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              placeholder="What is happening?"
              className="w-full text-xl outline-none border-none bg-transparent"
            ></textarea>
            {image && <Image src={image} height={300} width={300} alt={""} />}
          </div>
          <div className="flex justify-between items-center mt-2">
            <BsImageFill
              className="cursor-pointer"
              onClick={handleSelectImage}
            />
            <button
              onClick={handleCreateTweet}
              className="bg-[#109bf0] text-sm font-semibold py-2 px-4 rounded-full "
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetInput;
function mutateAsync(arg0: { content: string }) {
  throw new Error("Function not implemented.");
}
