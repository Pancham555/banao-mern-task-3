"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import SkeletonCard from "@/components/cards/skeletonCard";
import UserCard from "@/components/cards/userCard";

import Sidebar from "@/components/sidebar";

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

export default function Home() {
  // axios.defaults.withCredentials = true;
  const [displayData, setDisplayData] = useState<DataProps[]>([]);
  const skeletonData: string[] = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [userData, setUserData] = useState<DataProps>();
  const [dataFetchFailed, setDataFetchFailed] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const data = await axios.get(process.env.NEXT_PUBLIC_DATA_URL);

      setDisplayData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setDataFetchFailed(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (dataFetchFailed) {
    return (
      <main className="flex justify-center items-center min-h-screen w-full">
        <div className="text-3xl">Sorry! No data Found :(</div>
      </main>
    );
  }
  return (
    <main className="p-5">
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? skeletonData.map((_, i) => {
              return (
                <div key={i}>
                  <SkeletonCard />
                </div>
              );
            })
          : displayData.map((data, index) => {
              return (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => {
                    setUserData(data);
                    setOpenSheet(true);
                  }}
                >
                  <UserCard {...data} />
                </div>
              );
            })}
      </div>

      <Sidebar
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        // @ts-ignore
        userData={userData}
      />
      {/* <Sheet open={openSheet} onOpenChange={setOpenSheet}>
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
            <SheetDescription>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-5">
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
          </SheetHeader>
        </SheetContent>
      </Sheet> */}
    </main>
  );
}
