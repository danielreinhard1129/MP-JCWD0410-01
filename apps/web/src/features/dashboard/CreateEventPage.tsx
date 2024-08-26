"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateEventSchema } from "./schemas/CreateEventSchema";
import dynamic from "next/dynamic";
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
import useGetCategories from "@/hooks/api/category/useGetCategories";
import Link from "next/link";
import { SpinnerCircular } from "spinners-react";
import { FaPlus } from "react-icons/fa6";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const CreateEventPage = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      discount: 0,
      price: 0,
      quota: 0,
      thumbnail: null,
      location: "",
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      await createEvent({
        ...values,
        categoryId: selectedCategoryId,
      });
    },
  });

  const handleSelectCategory = (value: string) => {
    setSelectedCategoryId(Number(value));
  };

  const { data: item, refetch } = useGetCategories();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };
  const removeSelectedImage = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <main className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Create Event</h2>
          <Link href="/dashboard/event/create-category" className="text-white">
            <Button className="bg-purple-600 hover:bg-color3">
              <FaPlus className="mr-2 text-xl" />
              Create Category
            </Button>
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            name="name"
            label="Name"
            type="text"
            placeholder="Event Name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.name && !!formik.errors.name}
            error={formik.errors.name}
          />
          <div className="space-y-1">
            <Label>Location</Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("location", value)}
              value={formik.values.location} // Make the Select controlled
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  <SelectItem value="bali">Bali</SelectItem>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="bogor">Bogor</SelectItem>
                  <SelectItem value="jakarta">Jakarta</SelectItem>
                  <SelectItem value="medan">Medan</SelectItem>
                  <SelectItem value="palembang">Palembang</SelectItem>
                  <SelectItem value="surabaya">Surabaya</SelectItem>
                  <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* <FormInput
            name="location"
            label="Location"
            type="text"
            placeholder="Event Location"
            value={formik.values.location}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.location && !!formik.errors.location}
            error={formik.errors.location}
          /> */}
          <div className="space-y-1">
            <Label>Category</Label>
            <Select onValueChange={handleSelectCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {item?.map((category, index: number) => {
                    return (
                      <SelectItem key={index} value={String(category.id)}>
                        {category.title.charAt(0).toUpperCase() +
                          category.title.slice(1).toLowerCase()}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="startDate">Start Date</Label>
              <DateTimePicker
                onDateTimeChange={(date) =>
                  formik.setFieldValue("startDate", date)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="endDate">End Date</Label>
              <DateTimePicker
                onDateTimeChange={(date) =>
                  formik.setFieldValue("endDate", date)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FormInput
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.price && !!formik.errors.price}
              error={formik.errors.price}
            />
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
              name="discount"
              label="Discount"
              type="number"
              value={formik.values.discount}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.discount && !!formik.errors.discount}
              error={formik.errors.discount}
            />
          </div>
          <RichTextEditor
            label="Description"
            onChange={(html: string) =>
              formik.setFieldValue("description", html)
            }
            // onBlur={formik.handleBlur}
            isError={Boolean(formik.errors.description)}
            value={formik.values.description}
          />
          {selectedImage ? (
            <>
              <div className="relative h-32 w-60">
                <Image src={selectedImage} alt="Event thumbnail" fill />
              </div>
              <button onClick={removeSelectedImage}>remove</button>
            </>
          ) : null}
          <div className="flex flex-col space-y-1.5 text-sm">
            <label className="font-semibold">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              ref={thumbnailRef}
              onChange={onChangeThumbnail}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mb-8 bg-color3 hover:bg-color2"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex justify-center gap-2">
                  <SpinnerCircular color="#ffffff" size={20} />
                  Processing...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateEventPage;
