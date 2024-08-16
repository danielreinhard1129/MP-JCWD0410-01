"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

const EventDetailPage = () => {
  const [isOpenDescription, setIsOpenDescription] = useState(true);
  const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // const handleIncrement = () => {
  //   setQuantity((prev) => prev + 1);
  // };

  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     setQuantity((prev) => prev - 1);
  //   }
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (value >= 1) {
  //     setQuantity(value);
  //   }
  // };

  const toggleDescription = () => {
    setIsOpenDescription(true);
    setIsOpenTicket(false);
  };

  const toggleTicket = () => {
    setIsOpenTicket(true);
    setIsOpenDescription(false);
  };

  return (
    <div className="bg-[#fbfbfb]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-10">
          <div className="relative col-span-1 h-52 overflow-hidden rounded-lg md:col-span-2 md:h-96">
            <Image
              src="/concert.png"
              alt="concert"
              layout="fill"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col justify-between gap-3 rounded-lg p-4 md:shadow-md">
              <div className="text-lg font-semibold">
                Joyland Festival Jakarta 2024
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-neutral-100 p-2">
                    <MdDateRange className="text-sm text-color2 text-opacity-60" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm opacity-50">Date</div>
                    <div className="text-sm">22 Nov - 24 Nov 2024</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-neutral-100 p-2">
                    <IoTime className="text-sm text-color2 text-opacity-60" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm opacity-50">Time</div>
                    <div className="text-sm">10:00 - 22:00</div>
                  </div>
                </div>{" "}
                <div className="flex items-center gap-2 pb-3">
                  <div className="rounded bg-neutral-100 p-2">
                    <FaLocationDot className="text-sm text-color2 text-opacity-60" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm opacity-50">Location</div>
                    <div className="text-sm">JNM Bloc, Yogyakarta</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t-[1px] border-dashed border-neutral-200 pt-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-[1px] border-neutral-200">
                    <Image
                      src="/logoevent.png"
                      alt="concert"
                      layout="fill"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm opacity-50">Hosted by</div>
                    <div className="text-sm">XI Creative - The Promotor</div>
                  </div>
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
                className="hover:bg-color3 w-full rounded-md bg-color2 p-2 text-white"
              >
                Buy Ticket
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
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

            {isOpenDescription && (
              <div className="text-sm">
                MotoGP is a premier motorcycle racing championship that features
                highly skilled riders from around the world competing on
                purpose-built racing motorcycles. It is considered the pinnacle
                of motorcycle road racing and attracts a large global audience.
                The championship consists of a series of races held on various
                circuits worldwide, where riders showcase their speed, agility,
                and racing prowess. MotoGP motorcycles are technologically
                advanced, reaching high speeds and showcasing cutting-edge
                engineering. The championship is known for its intense
                competition, thrilling overtakes, and a showcase of rider skill
                and bravery.
              </div>
            )}
            {isOpenTicket && (
              <div className="space-y-4 rounded-md border-[1px] p-6 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">PRESALE DAY 1</div>
                  <div className="rounded-md bg-purple-200 px-2 py-1 text-color1">
                    On Sale
                  </div>
                </div>
                <hr className="border-[1px] border-dashed" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="text-neutral-400">Price</div>
                    <div className="font-semibold text-color2">Rp 75.000</div>
                  </div>
                  <div className="flex flex-col">
                    {/* <div className="flex">
                      <Button
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={handleInputChange}
                      />
                      <Button onClick={handleIncrement}>+</Button>
                    </div> */}
                    <Button className="hover:bg-color3 rounded-md bg-color2 px-6 py-2 text-white">
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
          className="hover:bg-color3 w-full rounded-md bg-color2 p-2 text-white"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
