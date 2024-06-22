import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Mail } from "lucide-react";
import getDate from "@/lib/getDate";
import { Card } from "./ui/card";

interface SidebarProps {
  userData: UserProps;
}

interface UserProps {
  createdAt: Date | string;
  avatar: string;
  Bio: string;
  jobTitle: string;
  profile: ProfileProps;
  id: string | number;
}

interface ProfileProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
const Sidebar = ({ userData }: SidebarProps) => {
  return (
    <>
      <Card className="p-5 h-96">
        {userData === undefined ? (
          <>
            <div className="text-slate-500">User details will appear here!</div>
          </>
        ) : (
          <>
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={userData?.avatar ?? "https://github.com/shadcn.png"}
                alt={userData?.profile.username ?? "@shadcn"}
              />
              <AvatarFallback>{`${userData?.profile.firstName[0] ?? "F"}${
                userData?.profile.lastName[0] ?? "N"
              }`}</AvatarFallback>
            </Avatar>
            <div className="mt-2 text-slate-500">
              <div className="text-slate-500 font-medium">
                {`${userData?.profile.firstName ?? "Firstname"} ${
                  userData?.profile.lastName ?? "Lastname"
                }`}
              </div>
              <div className="text-slate-500 text-sm">
                @{userData?.profile.username ?? "username"}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <span className="font-bold">Job Title:</span>
                    <span>{userData?.jobTitle}</span>
                  </div>

                  <div className="">
                    <div className="font-medium text-lg">About</div>
                    <div className="">{userData?.Bio}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="">
                    Date joined: {getDate(userData?.createdAt)}
                  </div>

                  <div className="flex gap-2 items-center">
                    <Mail />
                    <div className="">{userData?.profile.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default Sidebar;
