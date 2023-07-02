import Image from "next/image";
import React, { FC } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineUpload,
} from "react-icons/ai";

const FeedCard: FC = () => {
  return (
    <div className="border border-gray-800 border-x-0  p-4 hover:bg-[#111] transition-all cursor-pointer ">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            height={50}
            width={50}
            className="rounded-full"
            src={
              "https://avatars.githubusercontent.com/u/98259743?s=400&u=a6292d3c6a741ce89c0cc71aa77f7d893108fa74&v=4"
            }
            alt="none"
          />
        </div>
        <div className="col-span-11">
          <h5 className="text-md">Electric Node</h5>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            facere saepe harum excepturi laudantium eius, labore aspernatur!
            Consequuntur quaerat numquam eius veniam facilis soluta commodi
            maiores id placeat? Voluptate, itaque!
          </p>
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
