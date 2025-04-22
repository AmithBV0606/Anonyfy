"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function page() {
  // For storing all the messages users received
  const [messages, setMessages] = useState<Message[]>([]);

  // Loading state for fetching messages
  const [isLoading, setIsLoading] = useState(false);

  // Loading state for toggling switch
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  // ______________________________________________________________________________________

  // For updating the UI optimistically
  const handleDeleteMessage = (messageId: string) => {
    const newMessages = messages.filter((message) => messageId !== message._id);
    setMessages(newMessages);
  };

  // ______________________________________________________________________________________

  // To get the session
  const { data: session } = useSession();

  // ______________________________________________________________________________________

  // ZOD validation for toggling radio button.
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  // This method will watch specified inputs and return their values.
  const acceptMessages = watch("acceptMessages");

  // ______________________________________________________________________________________

  // This functions calls an API to get the "isAcceptingMessages" status.
  const fetchAcceptMessgae = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(
        axiosError.response?.data.message ||
          "Failed to fetch the message acceptance status!!"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // ______________________________________________________________________________________

  // This functions calls an API to fetch all the messages.
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);

      try {
        const response = await axios.get<ApiResponse>("/api/get-messgaes");
        setMessages(response.data.messages || []);

        if (refresh) {
          toast("Showing latest messages!!");
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast(
          axiosError.response?.data.message || "Failed to fetch messages!!"
        );
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  // ______________________________________________________________________________________

  // This functions calls an API to change the status of "isAcceptingMessages".
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(
        axiosError.response?.data.message ||
          "Failed to change the message acceptance status!!"
      );
    }
  };

  // ______________________________________________________________________________________

  // Copy to clip-board
  const { username } = session?.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast("Profile URL has been copied to clipboard!!");
  };

  // ______________________________________________________________________________________

  // To call all the functions which will fetch messages and their "isAcceptingMessages" status
  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessgae();
  }, [session, setValue, fetchAcceptMessgae, fetchMessages]);

  // ______________________________________________________________________________________

  if (!session || !session.user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-3xl font-bold">Please login...</p>
      </div>
    );
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Profile Link</h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={JSON.stringify(message._id)}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}