"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { RegisterSchema } from "./schemas/RegisterSchema";
import useRegister from "@/hooks/api/auth/useRegister";

const RegisterPage = () => {
  const { register, isLoading } = useRegister();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "ADMIN" | "CUSTOMER", // Default value untuk role
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      // Cast the role to "ADMIN" | "CUSTOMER"
      await register({
        ...values,
        role: values.role as "ADMIN" | "CUSTOMER", // Perubahan tipe dari string ke tipe yang diharapkan
      });
    },
  });

  return (
    <main className="flex justify-center pt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.name && !!formik.errors.name ? (
                  <p className="text-x5 text-red-500">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {!!formik.touched.email && !!formik.errors.email ? (
                  <p className="text-x5 text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <select
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-300 rounded p-2"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <Button className="mt-6 w-full bg-blue-500" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;
