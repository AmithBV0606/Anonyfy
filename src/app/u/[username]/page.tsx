"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Loader2, Shield } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import AllMessages from "@/All-Messages.json";
import { QuestionProps } from "@/types/Questions";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function Page() {
  const { username } = useParams<{ username: string }>();

  // Loading state for submitting the message
  const [isLoading, setIsLoading] = useState(false);

  // For loading top 3 questions
  const [suggestedQuestions, setSuggestedQuestions] = useState<QuestionProps[]>(
    [
      {
        id: 1,
        question: "What’s a hobby you’ve recently started?",
      },
      {
        id: 2,
        question:
          "If you could have dinner with any historical figure, who would it be?",
      },
      {
        id: 3,
        question: "What’s a simple thing that makes you happy?",
      },
    ]
  );

  // Zod implementation
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  // To disable the "send" button when the user haven't entered the content yet.
  const messageContent = form.watch("content");

  // To set the text in the Textarea whenever the suggested question is clicked
  const handleMessageClick = (suggestedQuestion: string) => {
    form.setValue("content", suggestedQuestion);
  };

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
        form.reset();
        toast(response.data.message);
      }
    } catch (error) {
      form.reset();
      const axiosError = error as AxiosError<ApiResponse>;
      toast(
        axiosError.response?.data.message ||
          `Error while sending the message to ${username}!!`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch the suggested messages
  const fetchSuggestedMessages = async () => {
    const newFilteredQuestion: QuestionProps[] = [];

    for (let index = 0; index < 3; index++) {
      const randomNum = Math.floor(Math.random() * 30);
      // find : returns an object
      // filter returns an array(Mistake I made)
      const FilteredQuestions = AllMessages.find((message) => {
        return message.id === randomNum;
      });

      if (FilteredQuestions) {
        newFilteredQuestion.push(FilteredQuestions);
      }
    }

    setSuggestedQuestions(newFilteredQuestion);
  };

  return (
    // "container mx-auto my-8 p-6 bg-white rounded max-w-4xl"
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 flex flex-col">
      {/* New Navbar/Header : */}
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-gray-100" />

          <span className="text-2xl font-bold">Anonyfy</span>
        </Link>
      </div>

      {/* Separator */}
      <Separator className="bg-gray-800 px-0" />

      {/* Main Heading */}
      <h1 className="text-2xl md:text-3xl font-extrabold my-12 text-center text-gray-300">
        <span className="underline">{username.toLocaleUpperCase()}&apos;s</span>{" "}
        Public Profile
      </h1>

      {/* Form component */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl mx-3 md:mx-auto">
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
                      <FormLabel className="font-bold mb-2">
                        Send Anonymous Message to @{username}
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Write your anonymous message here"
                          className="resize-none placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-start">
                  {isLoading ? (
                    <Button disabled className="cursor-pointer">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading || !messageContent}
                      className="cursor-pointer"
                      variant={"secondary"}
                    >
                      Send It
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Message suggestion block */}
      <div className="w-full max-w-5xl flex-1 flex flex-col md:border md:border-gray-700 md:rounded-xl my-8 shadow-xl p-6 md:mx-auto">
        {/* Button to suggest/generate new messages */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Button
              variant={"outline"}
              className="my-4 cursor-pointer bg-black px-4 py-2"
              onClick={fetchSuggestedMessages}
            >
              Suggest Messages
            </Button>

            <p className="font-semibold mb-4">
              Click on any message below to select it!
            </p>
          </div>
        </div>

        {/* List of messages */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-300">Messages</h3>
          </CardHeader>

          <CardContent className="flex flex-col space-y-4">
            {suggestedQuestions.map((suggestedQuestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="mb-2 font-medium bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 cursor-pointer hover:text-gray-200"
                onClick={() => handleMessageClick(suggestedQuestion.question)}
              >
                <p className="overflow-auto">{suggestedQuestion.question}</p>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <div className="mb-2">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button className="cursor-pointer mb-6" variant={"secondary"}>
            Create Your Account
          </Button>
        </Link>
      </div>

      {/* Footer : */}
      <footer className="py-6 text-center text-gray-500 text-md">
        <p>© {new Date().getFullYear()} Anonyfy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Page;