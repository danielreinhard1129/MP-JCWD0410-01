import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";

interface EventCardProps {
  name: string;
  thumbnail: string;
  location: string;
  start_date: string;
  end_date: string;
  price: number;
  organizer: string;
  className?: string;
  width?: string;
}

const EventCard: FC<EventCardProps> = ({
  name,
  thumbnail,
  location,
  start_date,
  end_date,
  price,
  organizer,
  className,
  width,
}) => {
  console.log(start_date);
  console.log(end_date);

  return (
    <>
      <div className={`rounded-lg bg-white text-black shadow ${className}`}>
        <div
          className={`relative h-40 overflow-hidden rounded-t-lg md:h-36 ${width}`}
        >
          <Image
            src={thumbnail}
            alt="concert"
            fill
            className="absolute inset-0 object-cover"
          />
        </div>
        <div className="space-y-2 p-5">
          <div className="text-md font-semibold">{name}</div>
          <div className="flex items-center gap-2">
            <div className="rounded bg-neutral-100 p-2">
              <MdDateRange className="text-sm text-color2 text-opacity-60" />
            </div>
            <div className="text-sm text-neutral-500">
              {`${format(new Date(start_date), "dd MMM yyyy")} - ${format(new Date(end_date), "dd MMM yyyy")}`}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="rounded bg-neutral-100 p-2">
              <FaLocationDot className="text-sm text-color2 text-opacity-60" />
            </div>
            <div className="text-neutral-500">
              {" "}
              {location.charAt(0).toUpperCase() +
                location.slice(1).toLowerCase()}
            </div>
          </div>
          <div className="flex justify-end text-lg font-semibold text-color2">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price)}
          </div>
          <div className="flex items-center gap-2 border-t-[1px] border-dashed border-neutral-200 pt-3 text-sm">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-[1px] border-neutral-200">
              <Image
                src="/logoevent.png"
                alt="concert"
                fill
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div>{organizer}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
