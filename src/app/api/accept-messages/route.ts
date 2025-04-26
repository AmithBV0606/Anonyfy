import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

// POST request to check if the currently loggedIn user is able to toggle the "Accept Messages" radio button and update the "isAcceptingMessages" status in our database according to the "Accept Messages" radio button.
export async function POST(request: Request) {
  await dbConnect();

  // To get currently logged in users.
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User; // assertion

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated!!",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json(); // This flag Comes from UI

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true } // Due to {new:true}, we'll receive the updated value.
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user status to accept messages!",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully!",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user status to accept messages!", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages!",
      },
      { status: 500 }
    );
  }
}

// This GET request will be called when we need to get the message acceptance status.
export async function GET() {
  await dbConnect();

  // To get currently logged in users.
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated!!",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        // message: "",
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting message acceptance status!", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status!",
      },
      { status: 500 }
    );
  }
}