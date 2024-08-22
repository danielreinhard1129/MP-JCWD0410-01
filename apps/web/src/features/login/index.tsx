"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { LoginSchema } from "./schemas/LoginSchema";
import useLogin from "@/hooks/api/auth/useLogin";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react

const LoginPage = () => {
  const { mutateAsync: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
          <Image
            src="/concert.avif"
            alt="Festival Picture"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <CardHeader className="mb-6">
            <CardTitle className="text-xl md:text-2xl font-bold">Sign In</CardTitle>
            <p className="text-sm text-gray-600">
              Enter your email and password to Sign In.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Your email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="name@mail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
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
                    placeholder="********"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" id="terms" className="mr-2" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="#" className="text-blue-500">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <Link href="/forgot-password">
                    <p className="text-sm text-blue-500 mt-2 md:mt-0">
                      Forgot Password?
                    </p>
                  </Link>
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-black text-white"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "SIGN IN"}
              </Button>

              <div className="mt-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  <input type="checkbox" id="newsletter" className="mr-2" />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Subscribe me to the newsletter
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  className="w-full border border-gray-300 bg-white text-gray-600"
                  onClick={() => signIn('google')} // Trigger Google Sign-In
                >
                  SIGN IN WITH GOOGLE
                </Button>
              </div>

              <div className="mt-4">
                <Button
                  className="w-full border border-gray-300 bg-white text-gray-600"
                  onClick={() => signIn('twitter')} // Trigger Twitter Sign-In
                >
                  SIGN IN WITH TWITTER
                </Button>
              </div>

              <div className="mt-4 flex justify-center text-xs">
                <p>
                  Not registered?{" "}
                  <Link href="/register" className="text-blue-500">
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
