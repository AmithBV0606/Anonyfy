"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { username } = useParams<{ username: string }>();

  const router = useRouter();

  // Zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/verify-code`, {
        username,
        code: data.code,
      });

      if (response) {
        setIsSubmitting(false);
        toast(response.data.message);
        router.replace("/sign-in");
      }
    } catch (error) {
      console.error("Error in verifying the code", error);
      const axiosError = error as AxiosError<ApiResponse>;
      setIsSubmitting(false);
      const errorMessage = axiosError.response?.data.message;
      toast(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 flex flex-col">
      {/* Header/Navbar */}
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-gray-100" />

          <span className="text-2xl font-bold">Anonyfy</span>
        </Link>
      </div>

      {/* Separator */}
      <Separator className="bg-gray-800 px-0" />

      {/* Form component : */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl">
            {/* Main Heading : */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Verify your Account</h1>

              <p className="text-gray-400 mt-2">
                Enter the OTP Sent to Your Email Address.
              </p>
            </div>

            {/* Actual Form : */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Verification code field : */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Verification Code</FormLabel>

                      <FormControl>
                        <Input placeholder="Enter the Code" {...field} />
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
                    "Verify"
                  )}
                </Button>
              </form>
            </Form>
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