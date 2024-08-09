import EventCard from "@/components/EventCard";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { IoIosArrowForward } from "react-icons/io";

const UpcomingEvent = () => {
  return (
    <div className="bg-[#fbfbfb]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-20 sm:gap-8">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-color1 sm:text-xl md:text-2xl">
            Upcoming Events
          </div>

          <Link
            href="/events"
            className="flex items-center justify-between gap-2 text-color2"
          >
            <div>Find more events</div>
            <div>
              <IoIosArrowForward />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
