"use client";

import useGetUser from "@/hooks/api/user/useGetUser";

import Image from "next/image";
import React, { FC } from "react";

interface ProfileDetailProps {
  userId: number;
}
const ProfilePage: FC<ProfileDetailProps> = ({ userId }) => {
  const { data } = useGetUser(userId);

  return (
    <div className="mx-auto my-10 max-w-7xl p-4">
      <h1 className="mb-4 text-2xl font-bold">My Profile</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-[200px]">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-[1px]">
            {data?.profilePic && (
              <Image
                src={data.profilePic}
                alt="hbh"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-6 text-sm">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <p className="mt-1 text-gray-900">{data?.name}</p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{data?.email}</p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Referral Code
              </label>
              <p className="mt-1 text-gray-900">{data?.referral}</p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Phone Number
              </label>
              <p className="mt-1 text-gray-900">
                {data?.phoneNumber ? data.phoneNumber : "-"}
              </p>
            </div>
            <div>
              <label className="blockfont-medium text-gray-700">Address</label>
              <p className="mt-1 text-gray-900">
                {data?.address ? data.address : "-"}
              </p>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Points</label>
              <p className="mt-1 text-gray-900">
                {data && data?.userPoints?.length > 0
                  ? data.userPoints[0].points
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
