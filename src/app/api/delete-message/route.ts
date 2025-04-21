import { getServerSession, User } from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export default async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> }
) {
  const { messageId } = await params;

  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated!!",
      },
      { status: 401 }
    );
  }

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message:
            "Message you're trying to delete doesn't exists or it's already been deleted!!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message has been deleted successfully!!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "An unexpected error occured while deleting the message!",
      error
    );
    return Response.json(
      {
        success: false,
        message: "An unexpected error occured while deleting the message!",
      },
      { status: 500 }
    );
  }
}