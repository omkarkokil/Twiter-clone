import Image from "next/image";
import React, { FC } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineUpload,
} from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: FC<FeedCardProps> = (props) => {
  const { data } = props;

  return (
    <div className="border border-gray-800 border-x-0  p-4 hover:bg-[#111] transition-all cursor-pointer ">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && (
            <Image
              height={50}
              width={50}
              className="rounded-full"
              src={data.author?.profileImageURL}
              alt="none"
            />
          )}
        </div>
        <div className="col-span-11">
          <Link href={`${data.author?.id}`}>
            <h5 className="text-md font-bold">
              {data.author?.firstName} {data.author?.lastName}
            </h5>
          </Link>
          <p className="text-xs">{data.content}</p>
          <div className=" mt-4 text-lg flex items-center w-[70%] justify-between">
            <div>
              <BiMessageRoundedDots />
            </div>
            <div>
              <AiOutlineRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <AiOutlineUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
