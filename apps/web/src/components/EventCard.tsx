import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";

const EventCard = () => {
  return (
    <>
      <Link href="/events">
        <div className="rounded-lg border border-gray-200 bg-white text-black shadow">
          <div className="relative h-40 overflow-hidden rounded-t-lg md:h-36">
            <Image
              src="/joyland.png"
              alt="concert"
              layout="fill"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 p-5">
            <div className="text-md font-semibold">
              Joyland Festival Jakarta 2024
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MdDateRange className="text-color2 text-opacity-50" />
              <div className="text-neutral-500">29 - 01 Sep 2024</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaLocationDot className="text-color2 text-opacity-50" />
              <div className="text-neutral-500">The Icon, BSD</div>
            </div>
            <div className="flex justify-end text-lg font-semibold text-color2">
              Rp 100.000
            </div>
            <div className="flex items-center gap-2 border-t-[1px] border-neutral-200 pt-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-[1px] border-neutral-200">
                <Image
                  src="/logoevent.png"
                  alt="concert"
                  layout="fill"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div>Event Organizer</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EventCard;
