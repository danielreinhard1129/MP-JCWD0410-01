"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import { CreateVoucherSchema } from "./schemas/CreateVoucherSchema";
import DateTimePicker from "@/components/DatePicker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useState, useEffect } from "react";

const CreateVoucherPage = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();
  const [selectedEventId, setSelectedEventId] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      quota: 0,
      nominal: 0,
      expDate: undefined,
      eventId: 0,
    },
    validationSchema: CreateVoucherSchema,
    onSubmit: async (values) => {
      await createVoucher({ ...values, eventId: selectedEventId });
    },
  });

  const handleSelectEvent = (value: string) => {
    setSelectedEventId(Number(value));
  };

  // Mendapatkan semua event tanpa filter
  const { data: events } = useGetEvents({});

  // Jika diperlukan, tambahkan log untuk memeriksa data event yang diterima
  useEffect(() => {
    console.log(events); // Debugging
  }, [events]);

  const eventList = events?.data || [];  // Pastikan struktur API benar

  return (
    <main className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl">
        <div className="pb-8 text-2xl font-semibold">Create Voucher</div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            name="name"
            label="Voucher Name"
            type="text"
            placeholder="Voucher Name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.name && !!formik.errors.name}
            error={formik.errors.name}
          />
          <FormInput
            name="code"
            label="Voucher Code"
            type="text"
            placeholder="Voucher Code"
            value={formik.values.code}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.code && !!formik.errors.code}
            error={formik.errors.code}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              name="quota"
              label="Quota"
              type="number"
              value={formik.values.quota}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.quota && !!formik.errors.quota}
              error={formik.errors.quota}
            />
            <FormInput
              name="nominal"
              label="Nominal Value"
              type="number"
              value={formik.values.nominal}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.nominal && !!formik.errors.nominal}
              error={formik.errors.nominal}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="expDate">Expiration Date</Label>
            <DateTimePicker
              onDateTimeChange={(date) =>
                formik.setFieldValue("expDate", date)
              }
            />
          </div>
          <Select onValueChange={handleSelectEvent}>
            <SelectTrigger>
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Event</SelectLabel>
                {eventList.map((event: any) => (
                  <SelectItem key={event.id} value={String(event.id)}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mb-8 bg-color3 hover:bg-color2"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateVoucherPage;
