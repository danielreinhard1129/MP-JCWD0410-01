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
      await register({
        ...values,
        role: values.role as "ADMIN" | "CUSTOMER", // Perubahan tipe dari string ke tipe yang diharapkan
      });
    },
  });

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-2/3">
        <div 
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/festival.png')" }} // Pastikan path ini benar
        />
        <div className="w-1/2 p-8">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-bold">Join Us Today</CardTitle>
            <p className="text-sm text-gray-600">Enter your email and password to register.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4">
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
                    <p className="text-xs text-red-500">{formik.errors.name}</p>
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
                    <p className="text-xs text-red-500">{formik.errors.email}</p>
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
                  {!!formik.touched.password && !!formik.errors.password ? (
                    <p className="text-xs text-red-500">{formik.errors.password}</p>
                  ) : null}
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
              <Button className="mt-6 w-full bg-black text-white" disabled={isLoading}>
                {isLoading ? "Loading..." : "Register Now"}
              </Button>
            </form>
          </CardContent>
          <div className="mt-4 flex justify-center text-xs">
            <p>Already have an account? <a href="/login" className="text-blue-500">Sign in</a></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
