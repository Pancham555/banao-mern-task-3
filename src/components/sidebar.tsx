import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Mail } from "lucide-react";
import getDate from "@/lib/getDate";

interface SidebarProps {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
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
const Sidebar = ({ openSheet, setOpenSheet, userData }: SidebarProps) => {
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent>
        <SheetHeader>
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={userData?.avatar ?? "https://github.com/shadcn.png"}
              alt={userData?.profile.username ?? "@shadcn"}
            />
            <AvatarFallback>{`${userData?.profile.firstName[0]}${userData?.profile.lastName[0]}`}</AvatarFallback>
          </Avatar>
          <SheetTitle>
            {`${userData?.profile.firstName} ${userData?.profile.lastName}`}
          </SheetTitle>
          <div className="text-slate-500 text-sm">
            @{userData?.profile.username}
          </div>
        </SheetHeader>
        <SheetDescription>
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
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
