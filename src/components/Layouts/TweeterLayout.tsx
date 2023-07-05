import React, { FC, ReactNode } from "react";
import { BiHash, BiSolidHomeCircle } from "react-icons/bi";
import {
  BsBell,
  BsBookmark,
  BsFillPersonFill,
  BsTwitter,
} from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import GoogleButton from "../RightSection/GoogleButton";
import FeedHolder from "../MiddleSection/Feed/FeedHolder";
import TweetInput from "../MiddleSection/Tweet/TweetInput";
import UserBatch from "../LeftSection/Batch/UserBatch";
import Link from "next/link";
import Nav from "../LeftSection/Navbar/Nav";

interface Twitterprops {
  children: ReactNode;
}

const TweeterLayout: FC<Twitterprops> = (props) => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="pt-4 col-span-2 sm:col-span-3 h-screen  flex flex-col justify-between items-center sm:items-end  sm:pr-20 ">
        <div className="fixed">
          <div className="text-3xl w-fit  hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <Nav />
        </div>
        <UserBatch />
      </div>
      <div className="sm:col-span-5 col-span-10 border border-r-[.5] border-l-[.5] border-gray-800">
        {props.children}
      </div>
      <div className="p-5 hidden sm:col-span-3 sm:block">
        <GoogleButton />
      </div>
    </div>
  );
};

export default TweeterLayout;
