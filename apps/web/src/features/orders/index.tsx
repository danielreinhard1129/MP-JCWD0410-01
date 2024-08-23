"use client";

import React from "react";
import OrderCard from "./components/OrderCard";
import useGetTransactions from "@/hooks/api/transaction/useGetTransactions";

const OrderPage = () => {
  const { data } = useGetTransactions();
  console.log(data);

  return (
    <div className="mx-auto my-10 max-w-7xl px-4">
      <div className="space-y-3">
        <div className="text-xl font-semibold">My Orders</div>
        {data?.map((transaction, index: number) => {
          return (
            <OrderCard
              key={index}
              thumbnail={transaction.event.thumbnail}
              name={transaction.event.name}
              total={transaction.total}
              transactionId={transaction.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
