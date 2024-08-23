import useGetTransactions from "@/hooks/api/transaction/useGetTransactions";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface OrderCardProps {
  thumbnail: string;
  name: string;
  total: number;
  transactionId: number;
}

const OrderCard: FC<OrderCardProps> = ({
  thumbnail,
  name,
  total,
  transactionId,
}) => {
  return (
    <>
      <div className="grid grid-cols-3 items-center justify-between rounded-md border-[1px] p-5 text-sm md:grid-cols-6">
        <div className="relative hidden h-16 w-28 overflow-hidden rounded-md md:inline-block">
          <Image
            src={thumbnail}
            alt="event thumbnail"
            fill
            className="object-cover"
          />
        </div>
        <div className="col-span-2 md:col-span-3">{name}</div>
        <div className="hidden md:inline-block">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(total)}
        </div>
        <Link href={`/orders/${transactionId}`} className="flex justify-center">
          <IoIosArrowForward size={20} />
        </Link>
      </div>
    </>
  );
};

export default OrderCard;
