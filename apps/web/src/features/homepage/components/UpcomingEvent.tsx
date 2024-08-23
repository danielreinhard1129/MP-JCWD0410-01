import EventCard from "@/components/EventCard";
import EventCardSkeleton from "@/components/EventCardSkeleton";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const UpcomingEvent = () => {
  const { data, isPending } = useGetEvents({
    take: 4,
  });

  return (
    <div className="bg-[#fbfbfb]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:gap-8">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-color1 sm:text-xl md:text-2xl">
            Upcoming Events
          </div>

          <Link
            href="/events"
            className="flex items-center justify-between gap-2 text-color2"
          >
            v<div>Find more events</div>
            <div>
              <IoIosArrowForward />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {isPending && (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          )}
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
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
