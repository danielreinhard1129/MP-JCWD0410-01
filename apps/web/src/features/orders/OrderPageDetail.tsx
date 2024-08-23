"use client";
import useGetTransactionDetail from "@/hooks/api/transaction/useGetTransaction";
import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
import { Status } from "@/types/transaction";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { SpinnerCircular } from "spinners-react";

const OrderDetailPage = () => {
  const { id: transactionId } = useParams<{ id: string }>();
  const { data, isPending, refetch } = useGetTransactionDetail(transactionId);
  const { mutateAsync: updateTransaction, isPending: isPendingUpdate } =
    useUpdateTransaction(Number(transactionId));
  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();

  const [paymentProofImage, setPaymentProofImage] = useState<string | null>(
    null,
  );

  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);

  if (isPending) {
    return <h1>...Loading</h1>;
  }

  if (!data) {
    return notFound();
  }

  if (session.data) {
    if (data.userId != session.data.user.id) {
      return notFound();
    }
  }

  const onClickUploadPaymentProof = () => {
    inputRef.current?.click();
  };

  const onChangePaymentProof = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      setPaymentProofImage(URL.createObjectURL(files[0]));
      setPaymentProofFile(files[0]);
    }
  };

  const removeSelectedImage = () => {
    setPaymentProofImage(null);
    setPaymentProofFile(null);

    // Reset the input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onUploadPaymentProof = async () => {
    if (paymentProofFile) {
      await updateTransaction({
        paymentProof: paymentProofFile,
        status: Status.WAITING_FOR_ADMIN_CONFIRMATION, // or any other appropriate status
      });

      refetch();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="my-10 rounded-md bg-purple-100 p-6">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="space-y-2 text-sm">
            <div className="font-semibold">Payment Deadline</div>
            <div>Wednesday, 10 Oct 2022 15:23 WIB</div>
          </div>
          <div className="text-xl">23:58:23</div>
        </div>
      </div>
      <div className="bg- my-10 grid gap-10 sm:grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 space-y-4 rounded-md border-[1px] p-6 md:col-span-2 md:max-h-[430px]">
          <div className="font-semibold">ORDER DETAIL</div>
          <div className="border-y-[1px] py-8">
            <div className="mb-2 font-semibold">{data?.event.name}</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex-row">
              {data?.event.thumbnail && (
                <div className="relative h-48 w-full overflow-hidden rounded-md sm:h-40 md:h-44">
                  <Image
                    src={data?.event.thumbnail}
                    alt="event thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="rounded bg-neutral-100 p-2">
                    <MdDateRange className="text-sm text-color2 text-opacity-60" />
                  </div>
                  {data?.event.startDate && data.event.endDate && (
                    <div className="text-sm text-neutral-500">
                      {format(new Date(data.event.startDate), "yyyy-MM-dd") ===
                      format(new Date(data.event.endDate), "yyyy-MM-dd")
                        ? format(new Date(data.event.startDate), "dd MMM yyyy")
                        : `${format(new Date(data.event.startDate), "dd MMM yyyy")} - ${format(new Date(data.event.endDate), "dd MMM yyyy")}`}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-neutral-100 p-2">
                    <IoTime className="text-sm text-color2 text-opacity-60" />
                  </div>
                  {data?.event.startDate && data?.event.endDate && (
                    <div className="text-sm text-neutral-500">
                      {format(new Date(data.event.startDate), "HH:mm") ===
                      format(new Date(data.event.endDate), "HH:mm")
                        ? format(new Date(data.event.startDate), "HH:mm")
                        : `${format(new Date(data.event.startDate), "HH:mm")} - ${format(new Date(data.event.endDate), "HH:mm")} WIB`}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-neutral-100 p-2">
                    <FaLocationDot className="text-sm text-color2 text-opacity-60" />
                  </div>
                  <div className="text-sm text-neutral-500">
                    {data?.event.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border-[1px]">
                  {data?.qty}
                </div>
                <div>Ticket</div>
              </div>
              {data?.total && (
                <div>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(data.total)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-md border-[1px] p-6">
          <div className="col-span-1 space-y-4">
            <div className="font-semibold">{`${data.paymentMethod} VIRTUAL ACCOUNT`}</div>
            <hr />
            <div className="space-y-2 text-sm">
              <div className="text-neutral-500">Virtual Account Number</div>
              <div className="rounded-md border-[1px] border-dashed p-2">
                098038949012843
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="text-neutral-500">Total Payment</div>
              {data?.total && (
                <div>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(data.total)}
                </div>
              )}
            </div>
            <div className="space-y-2 text-sm">
              <div className="text-neutral-500">Status</div>
              <div className="">{data.status}</div>
            </div>
          </div>

          {/* {data.status === Status.WAIITNG_FOR_PAYMENT && ( */}
          <>
            {paymentProofImage && data.status === Status.WAIITNG_FOR_PAYMENT ? (
              <>
                <div className="relative h-40 w-full">
                  <Image
                    src={paymentProofImage}
                    alt="Event thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={removeSelectedImage}
                  className="text-sm text-red-600"
                >
                  remove
                </button>
                <button
                  onClick={onUploadPaymentProof}
                  disabled={isPendingUpdate}
                  className="rounded-md bg-indigo-500 p-2 text-white"
                >
                  {isPendingUpdate ? (
                    <div className="flex justify-center gap-2">
                      <SpinnerCircular color="#ffffff" size={20} />
                      Processing...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </>
            ) : null}
          </>
          {/* )} */}

          {!paymentProofImage && data.status === "WAIITNG_FOR_PAYMENT" && (
            <button
              onClick={onClickUploadPaymentProof}
              className="rounded-md bg-color2 p-2 text-white"
            >
              Upload Payment Proof
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={onChangePaymentProof}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
