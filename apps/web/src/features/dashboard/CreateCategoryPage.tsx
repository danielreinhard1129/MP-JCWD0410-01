"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import useCreateCategory from "@/hooks/api/category/useCreateCategories";
import { useFormik } from "formik";
import { CreateCategorySchema } from "./schemas/CreateCategorySchema";

const CreateCategoryPage = () => {
  const { mutateAsync: createCategory, isPending } = useCreateCategory();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: CreateCategorySchema,
    onSubmit: async (values) => {
      await createCategory(values);
    },
  });

  console.log(formik.errors);

  return (
    <main className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-2xl font-semibold">Create Category</div>
        <form
          onSubmit={formik.handleSubmit}
          className="my-6 flex justify-between gap-4"
        >
          <FormInput
            //name harus sama dengan initial values
            name="title"
            label="Category"
            type="text"
            placeholder="Category Name"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.title && !!formik.errors.title}
            error={formik.errors.title}
            classname="w-5/6"
          />

          <Button
            className="fle flex w-1/6 self-end bg-color3 hover:bg-color2"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CreateCategoryPage;
