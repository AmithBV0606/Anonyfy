import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    // Is user accepting the message?
    const isAccepting = user.isAcceptingMessages;

    if (!isAccepting) {
      return Response.json(
        {
          success: false,
          message:
            "Currently the user, you're trying to send message is not accepting the messages!!",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "An unexpected error occured while sending the message!",
      error
    );
    return Response.json(
      {
        success: false,
        message: "An unexpected error occured while sending the message!",
      },
      { status: 500 }
    );
  }
}