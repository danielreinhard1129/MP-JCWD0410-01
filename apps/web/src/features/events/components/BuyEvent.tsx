"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEventDetail from "@/hooks/api/event/useGetEvent";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { ChangeEvent } from "react";
import { createTransactionSchema } from "../schemas/CreateTransactionSchemas";
import useCreateTransaction from "@/hooks/api/transaction/useCreateTransaction";
import { SpinnerCircular } from "spinners-react";

const BuyEvent = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const { data } = useGetEventDetail(eventId);

  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  const maxQuantity =
    data?.quota && data?.booked !== undefined ? data.quota - data.booked : 0;

  const formik = useFormik({
    initialValues: {
      qty: 0,
      paymentMethod: "",
      eventId: data?.id || 0,
    },
    validationSchema: createTransactionSchema(maxQuantity),
    onSubmit: async (values) => {
      // Handle form submission
      await createTransaction(values);
    },
  });

  const handleDecrement = () => {
    if (formik.values.qty > 0) {
      formik.setFieldValue("qty", formik.values.qty - 1);
    }
  };

  const handleIncrement = () => {
    if (maxQuantity > formik.values.qty) {
      formik.setFieldValue("qty", formik.values.qty + 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= maxQuantity) {
      formik.setFieldValue("qty", value);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4 rounded-md border-[1px] p-6 text-sm">
        <div className="flex items-center justify-between">
          <div className="font-semibold">BUY TICKET</div>
          <div className="rounded-md bg-purple-200 px-2 py-1 text-color1">
            On Sale
          </div>
        </div>
        <hr className="border-[1px] border-dashed" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-neutral-400">Price</div>
            {data?.price && (
              <div className="text-lg font-semibold text-[#8752bd]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(data.price)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-right text-neutral-400">Quantity</div>
            <div className="flex justify-end">
              <button
                onClick={handleDecrement}
                disabled={formik.values.qty <= 0}
                className="h-8 w-8 rounded-md bg-neutral-200"
                type="button"
              >
                -
              </button>
              <input
                type="number"
                value={formik.values.qty}
                onChange={handleInputChange}
                className="h-8 w-8 text-center"
              />
              <button
                onClick={handleIncrement}
                className="h-8 w-8 rounded-md bg-neutral-200"
                type="button"
                disabled={maxQuantity <= formik.values.qty}
              >
                +
              </button>
            </div>
            {formik.touched.qty && formik.errors.qty && (
              <div className="text-red-500">{formik.errors.qty}</div>
            )}
          </div>
        </div>

        {maxQuantity > 0 ? (
          <div className="text-red-500">
            {maxQuantity <= formik.values.qty
              ? `Only ${maxQuantity} tickets are available. Please adjust your selection and try again.`
              : null}
          </div>
        ) : (
          <div className="text-red-500">Ticket quota is not available.</div>
        )}

        <div className="flex flex-col gap-2">
          <div className="text-neutral-400">Payment Method</div>
          <Select
            onValueChange={(value) =>
              formik.setFieldValue("paymentMethod", value)
            }
            value={formik.values.paymentMethod}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Method</SelectLabel>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="BRI">BRI</SelectItem>
                <SelectItem value="MANDIRI">Mandiri</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <div className="text-red-500">{formik.errors.paymentMethod}</div>
          )}
        </div>
        <div className="flex justify-end py-4">
          <div className="flex flex-col gap-2">
            <div className="text-right text-neutral-400">Total</div>
            {data?.price && (
              <div className="text-lg font-semibold text-[#8752bd]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(data.price * formik.values.qty)}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex self-end rounded-md bg-color2 px-6 py-3 text-white hover:bg-color3"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex justify-center gap-2">
                <SpinnerCircular color="#ffffff" size={20} />
                Processing...
              </div>
            ) : (
              "Buy Now"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BuyEvent;
