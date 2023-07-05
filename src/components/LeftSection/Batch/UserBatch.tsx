"use client";
import { useCurrentUser } from "@/hooks/user";
import React from "react";
import Image from "next/dist/client/image";

const UserBatch: React.FC = () => {
  const { user } = useCurrentUser();

  return (
    <>
      {user && (
        <>
          <div className="flex fixed bottom-0 gap-2 rounded-full items-center mb-4 transition-all cursor-pointer  hover:bg-slate-900 pr-3 pl-1 py-1">
            {user && user.profileImageURL && (
              <Image
                src={user?.profileImageURL}
                alt="none"
                className="rounded-full"
                height={50}
                width={50}
              />
            )}
            <div className="hidden sm:block">
              <h4 className="text-sm">
                {user?.firstName} {user?.lastName}
              </h4>
              <h6 className="text-xs">{user?.email}</h6>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserBatch;
