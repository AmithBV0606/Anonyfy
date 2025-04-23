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
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import AllMessages from "@/All-Messages.json";
import { QuestionProps } from "@/types/Questions";

function page() {
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
    let newFilteredQuestion: QuestionProps[] = [];

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
              <Button disabled className="cursor-pointer">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent} className="cursor-pointer">
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      {/* Button to suggest/generate new messages */}
      <div className="my-8 space-y-4">
        <div className="space-y-2">
          <Button
            variant={"default"}
            className="my-4 cursor-pointer"
            onClick={fetchSuggestedMessages}
          >
            Suggest Messages
          </Button>

          <p className="font-semibold">
            Click on any message below to select it!
          </p>
        </div>
      </div>

      {/* List of messages */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Messages</h3>
        </CardHeader>

        <CardContent className="flex flex-col space-y-4">
          {suggestedQuestions.map((suggestedQuestion, index) => (
            <Button key={index} variant="outline" className="mb-2 font-semibold cursor-pointer">
              {suggestedQuestion.question}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default page;