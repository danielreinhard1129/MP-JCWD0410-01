"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { CreateReviewSchema } from "../schemas/createReviewSchema";
import useCreateReview from "@/hooks/api/review/useCreateReview";
import useGetTransactionDetail from "@/hooks/api/transaction/useGetTransaction";
import { useSession } from "next-auth/react";

interface OrderCardProps {
  thumbnail: string;
  name: string;
  total: number;
  transactionId: number;
  endDate: Date;
  dateNow: Date;
  eventId: number;
  isDisabled: boolean;
}

const OrderCard: FC<OrderCardProps> = ({
  thumbnail,
  name,
  total,
  endDate,
  dateNow,
  transactionId,
  eventId,
  isDisabled,
}) => {
  const session = useSession();
  const { mutateAsync: createReview, isPending } = useCreateReview();
  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
      eventId,
    },
    validationSchema: CreateReviewSchema,
    onSubmit: async (values) => {
      await createReview(values);
    },
  });

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
        <div className="col-span-2 line-clamp-2 md:col-span-3">{name}</div>
        <div className="hidden md:inline-block">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(total)}
        </div>

        <div className="flex items-center justify-between gap-4">
          {new Date(endDate).getTime() < new Date(dateNow).getTime() ? (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isDisabled}
                    className="w-36"
                  >
                    Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px]">
                  <DialogHeader>
                    <DialogTitle>Review</DialogTitle>
                    <DialogDescription>
                      Share your experience with the event organizer. Your
                      feedback helps others make informed decisions. Once youre
                      satisfied with your review, click submit to save.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Review</Label>
                        {/* <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  /> */}
                        <Textarea
                          placeholder="Type your review here."
                          name="comment"
                          value={formik.values.comment}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {!!formik.touched.comment && !!formik.errors.comment ? (
                          <p className="text-xs text-red-500">
                            {formik.errors.comment}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="username">Rating</Label>
                        <Rating
                          style={{ maxWidth: 180 }}
                          value={formik.values.rating}
                          onChange={(value: any) =>
                            formik.setFieldValue("rating", value)
                          }
                        />
                        {!!formik.touched.rating && !!formik.errors.rating ? (
                          <p className="text-xs text-red-500">
                            {formik.errors.rating}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit Review</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Link
                href={`/orders/${transactionId}`}
                className="flex justify-center"
              >
                <IoIosArrowForward size={20} />
              </Link>
            </>
          ) : (
            <Link
              href={`/orders/${transactionId}`}
              className="flex w-full justify-end"
            >
              <IoIosArrowForward size={20} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderCard;
