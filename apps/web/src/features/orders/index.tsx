"use client";

import React, { useEffect } from "react";
import OrderCard from "./components/OrderCard";
import useGetTransactions from "@/hooks/api/transaction/useGetTransactions";
import { useSession } from "next-auth/react";

const OrderPage = () => {
  const { data, refetch } = useGetTransactions();
  const session = useSession();

  return (
    <div className="mx-auto my-10 max-w-7xl px-4">
      <div className="space-y-3">
        <div className="text-xl font-semibold">My Orders</div>

        {data?.map((transaction, index: number) => {
          return (
            <OrderCard
              key={index}
              eventId={transaction.event.id}
              thumbnail={transaction.event.thumbnail}
              name={transaction.event.name}
              total={transaction.total}
              transactionId={transaction.id}
              endDate={new Date(transaction.event.endDate)}
              dateNow={new Date()}
              isDisabled={
                transaction.event.reviews[0]?.userId == session.data?.user.id
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
