"use client";
import useGetReviews from "@/hooks/api/review/useGetReviews";
import useGetUser from "@/hooks/api/user/useGetUser";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import { FC, useMemo } from "react";

interface OrganizerProfilePageProps {
  userId: number;
}

const OrganizerProfilePage: FC<OrganizerProfilePageProps> = ({ userId }) => {
  const { data } = useGetUser(userId);
  const { data: items } = useGetReviews({ take: 4, userId });
  // Calculate the average rating
  const averageRating = useMemo(() => {
    if (items?.data.length) {
      const totalRating = items.data.reduce(
        (sum, item) => sum + item.rating,
        0,
      );
      return totalRating / items.data.length;
    }
    return 0;
  }, [items]);

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-[1px] sm:h-32 sm:w-32">
            {data?.profilePic && (
              <Image
                src={data?.profilePic}
                alt={`${data?.name} logo`}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold sm:text-3xl">{data?.name}</h1>
            <Rating style={{ maxWidth: 120 }} value={averageRating} readOnly />
          </div>
        </div>

        <div className="space-y-2">
          {items?.data.map((item) => {
            return (
              <>
                <div className="space-y-2 rounded-md border-[1px] p-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border-[1px]">
                      {item.user.profilePic && (
                        <Image
                          src={item.user.profilePic}
                          alt="profile picture"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="font-semibold">{item.user.name}</div>
                  </div>
                  <div className="flex gap-2">
                    <Rating
                      style={{ maxWidth: 90 }}
                      value={item.rating}
                      readOnly
                    />
                    <div className="text-neutral-500">
                      Event: {item.event.name}
                    </div>
                  </div>

                  <div>{item.comment}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      ;
    </>
  );
};

export default OrganizerProfilePage;
