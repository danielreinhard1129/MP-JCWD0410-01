"use client";

import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";
import useGetEventDetail from "@/hooks/api/event/useGetEvent";
import { format } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import BuyEvent from "./components/BuyEvent";
import Link from "next/link";

const EventDetailPage = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const { data } = useGetEventDetail(eventId);

  const [isOpenDescription, setIsOpenDescription] = useState(true);
  const [isOpenTicket, setIsOpenTicket] = useState(false);

  const toggleDescription = () => {
    setIsOpenDescription(true);
    setIsOpenTicket(false);
  };

  const toggleTicket = () => {
    setIsOpenTicket(true);
    setIsOpenDescription(false);

    const ticketSection = document.getElementById("ticket");
    if (ticketSection) {
      window.scrollTo({
        top: ticketSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl space-y-2 px-4 py-10">
        <Badge className="bg-purple-400 text-sm">{data?.category.title}</Badge>
        <div className="text-2xl font-semibold">{data?.name}</div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-10">
          <div className="relative col-span-1 h-52 overflow-hidden rounded-lg md:col-span-2 md:h-full">
            {data?.thumbnail && (
              <Image
                src={data.thumbnail}
                alt="Thumbnail"
                fill
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col justify-between gap-3 rounded-lg p-4 md:shadow-md">
              <div className="text-lg font-semibold">Event Detail</div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-neutral-100 p-2">
                    <MdDateRange className="text-sm text-color2 text-opacity-60" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm opacity-50">Date</div>
                    {data?.startDate && data?.endDate && (
                      <div className="text-sm">
                        {format(new Date(data.startDate), "yyyy-MM-dd") ===
                        format(new Date(data.endDate), "yyyy-MM-dd")
                          ? format(new Date(data.startDate), "dd MMM yyyy")
                          : `${format(new Date(data.startDate), "dd MMM yyyy")} - ${format(new Date(data.endDate), "dd MMM yyyy")}`}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-neutral-100 p-2">
                    <IoTime className="text-sm text-color2 text-opacity-60" />
                  </div>
                  <div className="flex flex-col text-sm">
                    <div className="opacity-50">Time</div>
                    {data?.startDate && data?.endDate && (
                      <div className="text-sm">
                        {format(new Date(data.startDate), "HH:mm") ===
                        format(new Date(data.endDate), "HH:mm")
                          ? format(new Date(data.startDate), "HH:mm")
                          : `${format(new Date(data.startDate), "HH:mm")} - ${format(new Date(data.endDate), "HH:mm")} WIB`}
                      </div>
                    )}
                  </div>
                </div>{" "}
                <div className="flex items-center gap-2 pb-3">
                  <div className="rounded bg-neutral-100 p-2">
                    <FaLocationDot className="text-sm text-color2 text-opacity-60" />
                  </div>

                  {data?.location && (
                    <div className="flex flex-col text-sm">
                      <div className="opacity-50">Location</div>
                      <div>
                        {data.location.charAt(0).toUpperCase() +
                          data.location.slice(1).toLowerCase()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 border-t-[1px] border-dashed border-neutral-200 pt-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-[1px] border-neutral-200">
                    {data?.user.profilePic && (
                      <Image
                        src={data.user.profilePic}
                        alt="Profile picture"
                        layout="fill"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <Link href={`/organizer/${data?.user.id}`}>
                    <div className="flex flex-col">
                      <div className="text-sm opacity-50">Hosted by</div>
                      <div className="text-sm">{data?.user.name}</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`p-2 ${
                isOpenTicket
                  ? "hidden"
                  : "hidden rounded-md p-4 shadow-md md:inline-block"
              }`}
            >
              <button
                onClick={toggleTicket}
                className="w-full rounded-md bg-color2 p-2 text-white hover:bg-color3"
              >
                Buy Ticket
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3" id="ticket">
          <div className="col-span-2 flex flex-col">
            <div className="my-8 grid grid-cols-2 border-b-[2px] text-center">
              <button
                onClick={toggleDescription}
                className={`p-2 ${
                  isOpenDescription ? "border-b-4 border-color2" : ""
                }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={toggleTicket}
                className={`p-2 ${
                  isOpenTicket ? "border-b-4 border-color2" : ""
                }`}
              >
                TICKET
              </button>
            </div>

            {isOpenDescription && data?.description && (
              <Markdown description={data.description} />
            )}
            {isOpenTicket && <BuyEvent />}
          </div>
        </div>
      </div>
      <div
        className={`p-2 ${
          isOpenTicket
            ? "hidden"
            : "fixed bottom-0 z-40 w-full border-t-[1px] bg-white p-4 shadow-md md:hidden"
        }`}
      >
        <button
          onClick={toggleTicket}
          className="w-full rounded-md bg-color2 p-2 text-white hover:bg-color3"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
