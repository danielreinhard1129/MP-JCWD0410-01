import EventCard from "@/components/EventCard";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import React from "react";
import Marquee from "react-fast-marquee";

const TopEvent = () => {
  const { data } = useGetEvents({
    take: 5,
  });
  return (
    <div className="bg-[url('/bg.png')] bg-cover py-10 text-white">
      <div className="mx-auto grid max-w-7xl grid-flow-row items-center gap-8 px-4 text-center md:grid-flow-col">
        <div className="flex flex-col gap-4 text-left">
          <div className="text-xl font-bold sm:text-xl md:text-4xl">
            Top Picks!
          </div>
          <div>
            Discover the most popular events on Tixify that you’re sure to
            enjoy.
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
              <EventCard
                key={index}
                name={event.name}
                thumbnail={event.thumbnail}
                location={event.location}
                start_date={event.start_date}
                end_date={event.end_date}
                price={event.price}
                organizer={event.user.name}
                className="mr-4 text-left"
                width="w-72"
              />
            );
          })}

          {/* <div className="mx-2">
            <EventCard />
          </div>
          <div className="mx-2">
            <EventCard />
          </div>
          <div className="mx-2">
            <EventCard />
          </div>
          <div className="mx-2">
            <EventCard />
          </div> */}
        </Marquee>
      </div>
    </div>
  );
};

export default TopEvent;
