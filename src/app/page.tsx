import Image from "next/image";
import {
  BsTwitter,
  BsBookmark,
  BsBell,
  BsFillPersonFill,
} from "react-icons/bs";
import { BiSolidHomeCircle, BiSearch, BiHash } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import { Inter } from "next/font/google";
import FeedCard from "@/components/FeedCard";
import GoogleButton from "@/components/GoogleButton";

export default function Home() {
  interface TwitterSideBarButton {
    title: String;
    icon: React.ReactNode;
  }

  const sideNavbar: TwitterSideBarButton[] = [
    {
      title: "Home",
      icon: <BiSolidHomeCircle />,
    },
    {
      title: "Explore",
      icon: <BiHash />,
    },
    {
      title: "Notification",
      icon: <BsBell />,
    },
    {
      title: "Messages",
      icon: <HiMail />,
    },

    {
      title: "Bookmarks",
      icon: <BsBookmark />,
    },

    {
      title: "Profile",
      icon: <BsFillPersonFill />,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen ">
        <div className="col-span-3 pt-4 flex flex-col items-end pr-20">
          <div>
            <div className="text-3xl w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-4 text-lg ">
              <ul>
                {sideNavbar.map((item, id) => (
                  <li
                    key={id}
                    className="flex justify-start items-center gap-5 hover:bg-gray-900 rounded-full py-2 pl-2 pr-4 w-fit mt-2"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 ">
                <button className="bg-[#109bf0]  text-lg  font-semibold py-2 px-6 rounded-full w-full ">
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 border border-r-[.5] border-l-[.5] border-gray-800">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <div className="rounded-lg  p-5 bg-slate-500">
            <h1 className="text-xl">New to twitter?</h1>
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  );
}
