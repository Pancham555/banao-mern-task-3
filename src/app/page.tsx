"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import SkeletonCard from "@/components/cards/skeletonCard";
import UserCard from "@/components/cards/userCard";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardTitle } from "@/components/ui/card";
import DrawerForSmallScreens from "@/components/drawerForSmallScreens";
import { Skeleton } from "@/components/ui/skeleton";

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
  const skeletonData: string[] = ["", "", "", "", "", ""];
  const [loading, setLoading] = useState<boolean>(true);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
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
        <div className="text-3xl text-slate-500">Sorry! No data Found :(</div>
      </main>
    );
  }
  return (
    <main className="">
      <Navbar />
      <div className="flex p-5 gap-5">
        <div className="lg:w-[35%] w-full">
          <Card className="mb-2">
            <DrawerForSmallScreens
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
              // @ts-ignore
              userData={userData}
            />

            <CardTitle className="text-slate-500 p-2 font-medium">
              {loading ? <Skeleton className="h-6 w-14" /> : "Users"}
            </CardTitle>
          </Card>

          <div className="lg:hidden flex gap-5 flex-col border-t pt-5">
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
                        setOpenDrawer(true);
                      }}
                    >
                      <UserCard {...data} />
                    </div>
                  );
                })}
          </div>
          <Card className="hidden lg:block">
            <ScrollArea className="flex flex-col gap-5 h-96">
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
                        className="cursor-pointer m-2"
                        key={index}
                        onClick={() => setUserData(data)}
                      >
                        <UserCard {...data} />
                      </div>
                    );
                  })}
            </ScrollArea>
          </Card>
        </div>
        <div className="lg:w-[65%] lg:block hidden">
          <Card className="mb-2">
            <CardTitle className="text-slate-500 p-2 font-medium">
              {loading ? <Skeleton className="h-6 w-14" /> : "User details"}
            </CardTitle>
          </Card>
          <div className="">
            <Sidebar
              loading={loading}
              // @ts-ignore
              userData={userData}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
