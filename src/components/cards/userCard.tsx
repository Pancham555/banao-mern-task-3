import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface DataProps {
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

const UserCard = (data: DataProps) => {
  return (
    <Card className="p-2 w-full">
      <CardContent className="flex gap-2 items-start">
        <Avatar className="w-14 h-14 my-2">
          <AvatarImage
            src={data.avatar ?? "https://github.com/shadcn.png"}
            alt={data.profile.username ?? "@shadcn"}
          />
          <AvatarFallback>{`${data.profile.firstName[0]}${data.profile.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-2 mt-2">
            <CardTitle>{`${data.profile.firstName} ${data.profile.lastName}`}</CardTitle>
            <div className="">{data.jobTitle}</div>
          </div>
          <div className="">
            <div className="">{data.Bio.slice(0, 8)}...</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
