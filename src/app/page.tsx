"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import SkeletonCard from "@/components/cards/skeletonCard";
import UserCard from "@/components/cards/userCard";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

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
  const skeletonData: string[] = ["", "", "", "", "", "", "", "", ""];
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
    <main className="">
      <Navbar />
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5">
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
    </main>
  );
}
