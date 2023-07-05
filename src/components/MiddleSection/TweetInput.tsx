"use client";

import { useCreateTweet } from "@/hooks/tweets";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { BsImageFill } from "react-icons/bs";

const TweetInput: React.FC = () => {
  const { user } = useCurrentUser();
  const { mutate } = useCreateTweet();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const [content, setContent] = useState("");

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
    setContent("");
  }, [content, mutate]);
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
