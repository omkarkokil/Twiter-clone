"use client";
import { useCurrentUser } from "@/hooks/user";
import Link from "next/link";
import React, { FC, useMemo } from "react";
import { BiHash, BiSolidHomeCircle } from "react-icons/bi";
import {
  BsBell,
  BsBookmark,
  BsFillPersonFill,
  BsTwitter,
} from "react-icons/bs";
import { HiMail } from "react-icons/hi";

interface TwitterSideBarButton {
  title: String;
  icon: React.ReactNode;
  links: String;
}

const Nav: FC = () => {
  const { user } = useCurrentUser();

  const sideNavbar: TwitterSideBarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiSolidHomeCircle />,
        links: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        links: "/",
      },
      {
        title: "Notification",
        icon: <BsBell />,
        links: "/",
      },
      {
        title: "Messages",
        icon: <HiMail />,
        links: "/",
      },

      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        links: "/",
      },

      {
        title: "Profile",
        icon: <BsFillPersonFill />,
        links: `/${user?.id}`,
      },
    ],
    [user?.id]
  );
  return (
    <>
      <div className="mt-4 text-lg ">
        <ul>
          {sideNavbar.map((item, id) => (
            <li key={id}>
              <Link
                href={`${item.links}`}
                className="flex justify-start items-center gap-5 hover:bg-gray-900 rounded-full py-2 pl-2 pr-4 w-fit mt-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="hidden sm:inline">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-5 ">
          <button className="hidden sm:block bg-[#109bf0]  text-lg  font-semibold py-2 px-6 rounded-full w-full ">
            Tweet
          </button>
          <button className="block sm:hidden bg-[#109bf0]  text-lg  font-semibold p-3  rounded-full  ">
            <BsTwitter />
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
