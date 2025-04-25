"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInSchema } from "@/schemas/signInSchema";
import { Loader2, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // console.log(data);
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    // console.log(result);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setIsSubmitting(false);
        toast("Incorrect username or password");
      } else {
        setIsSubmitting(false);
        toast(result.error);
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 flex flex-col">
      {/* New Navbar/Header : */}
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-gray-100" />

          <span className="text-2xl font-bold">Anonyfy</span>
        </Link>
      </div>

      <Separator className="bg-gray-800 px-0" />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl">
            {/* Welcome Heading : */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Sign In to Anonyfy</h1>
              <p className="text-gray-400 mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Actual Form : */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email field : */}
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Email or Username</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email or username"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password field : */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Password</FormLabel>

                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-2 cursor-pointer py-4"
                  variant={"secondary"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            {/* Already a member? */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-gray-100 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* New Footer : */}
      <footer className="py-6 text-center text-gray-300 text-md">
        <p>© {new Date().getFullYear()} Anonyfy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default page;