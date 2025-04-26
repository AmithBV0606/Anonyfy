"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export default function MessageCard({
  message,
  onMessageDelete,
}: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast(response.data.message);
      // @ts-ignore
      onMessageDelete(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(axiosError.response?.data.message ?? "Failed to delete message");
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-600 p-8 rounded-xl border border-gray-700 text-gray-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="ml-12 cursor-pointer">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  question and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="text-sm">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}