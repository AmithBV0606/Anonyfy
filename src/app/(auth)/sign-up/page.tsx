"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function Page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState(""); // To show the message to the user when user enters the username in the input field.
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); // loader for live check
  const [isSubmitting, setIsSubmitting] = useState(false); // loader for after pressing submit button

  // Debouncing : "useDebounceCallback" hook implements the debouncing not on the input field but for the "username" state. Means, when we type something in the input field, the value is stored inside a state after the specified delay time.
  const debounced = useDebounceCallback(setUsername, 500);

  const router = useRouter();

  // Zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // API Call for live checking of username
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(""); // Because it might carry the value from the past calls

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          console.log(response.data.message);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  // Submit handler || API Call for sign-up process
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/sign-up`, data);
      toast(response.data.message);
      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 flex flex-col">
      {/* Header/Navbar */}
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-gray-100" />

          <span className="text-xl font-bold">Anonyfy</span>
        </Link>
      </div>

      <Separator className="bg-gray-800" />

      {/* Form component : */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">
                Create Your Anonyfy Account
              </h1>
              <p className="text-gray-400 mt-2">
                Start receiving anonymous messages from your audience
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Username field : */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Username</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="JhonDoe"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                          }}
                        />
                      </FormControl>

                      {isCheckingUsername && (
                        <Loader2 className="animate-spin" />
                      )}

                      <p
                        className={`text-sm ${usernameMessage === "This username is available!" ? "text-green-600" : "text-red-600"}`}
                      >
                        {usernameMessage}
                      </p>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email field : */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Email</FormLabel>

                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jhondoe@gmail.com"
                          {...field}
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
                  disabled={isSubmitting}
                  className="w-full mt-2 cursor-pointer py-4"
                  variant={"secondary"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>

            {/* Already a member? */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-gray-100 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Anonyfy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Page;