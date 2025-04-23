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
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

function page() {
  const { username } = useParams<{ username: string }>();

  // Loading state for submitting the message
  const [isLoading, setIsLoading] = useState(false);

  // Zod implementation
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  // Function to call API which will save the message in the database
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    // console.log(data);

    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: data.content,
      });

      if (response) {
        setIsLoading(false);
        toast(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(
        axiosError.response?.data.message ||
          `Error while sending the message to ${username}!!`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-2xl md:text-4xl font-extrabold mb-12 text-center">
        <span className="underline">{username.toLocaleUpperCase()}'s</span>{" "}
        Public Profile
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Send Anonymous Message to @{username}
                </FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-start">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default page;