"use client";

import EventCard from "@/components/EventCard";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const TopEvent = () => {
  const { data } = useGetEvents({
    take: 5,
    sortBy: "booked",
  });
  return (
    <div
      className="bg-[url('/images/bg.png')] bg-cover py-10 text-white"
      // style={{ background: "url: '/bg.png'" }}
    >
      <div className="mx-auto grid max-w-7xl grid-flow-row items-center gap-8 px-4 text-center md:grid-flow-col">
        <div className="flex flex-col gap-4 text-left">
          <div className="text-xl font-bold sm:text-xl md:text-4xl">
            Top Picks!
          </div>
          <div>
            Discover the most popular events on Tixify <br /> that you’re sure
            to enjoy.
          </div>
        </div>
        <Marquee
          speed={50}
          direction="left"
          pauseOnHover={true}
          gradient={false}
          loop={2}
          className="col-span-1 md:col-span-3"
        >
          {data?.data.map((event, index: number) => {
            return (
              <Link href={`/events/${event.id}`} key={index}>
                <EventCard
                  key={index}
                  name={event.name}
                  thumbnail={event.thumbnail}
                  location={event.location}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  price={event.price}
                  organizer={event.user.name}
                  profilePic={event.user.profilePic}
                  className="mr-4 line-clamp-1 w-72 text-left"
                  profileOrganizer={`/organizer/${event.user.id}`}
                />
              </Link>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};

export default TopEvent;
