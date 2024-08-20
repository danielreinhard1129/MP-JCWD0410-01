"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { RegisterSchema } from "./schemas/RegisterSchema";
import useRegister from "@/hooks/api/auth/useRegister";
import Image from "next/image";

const RegisterPage = () => {
  const { register, isLoading } = useRegister();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "ADMIN" | "CUSTOMER", // Default value for role
      referral: "", // Ganti referralCode menjadi referral
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register({
        ...values,
        role: values.role as "ADMIN" | "CUSTOMER",
      });
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full md:w-2/3 overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="relative h-48 md:h-auto md:w-1/2 overflow-hidden">
          <Image
            src="/images/concert.avif"
            alt="Festival Picture"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-bold">Join Us Today</CardTitle>
            <p className="text-sm text-gray-600">
              Enter your email and password to register.
            </p>
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
                    <p className="text-xs text-red-500">
                      {formik.errors.email}
                    </p>
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
                    <p className="text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded border border-gray-300 p-2"
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="referral">Referral Code (Optional)</Label>
                  <Input
                    name="referral"
                    type="text"
                    placeholder="Referral code (if any)"
                    value={formik.values.referral}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {!!formik.touched.referral && !!formik.errors.referral ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.referral}
                    </p>
                  ) : null}
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-black text-white"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register Now"}
              </Button>
            </form>
          </CardContent>
          <div className="mt-4 flex justify-center text-xs">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
