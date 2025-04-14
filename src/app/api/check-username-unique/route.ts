// This route is being created so that we can check if the entered username is available or not when the user enters the username in the input filed. (Live Check)

import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// Zod for validation
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  await dbConnect(); // Database connection

  try {
    // http://localhost:3000/api/check-username-unique?username=amith : Here username = amith
    const { searchParams } = new URL(request.url);
    const query = {
      username: searchParams.get("username"),
    };

    // Validate username with ZOD
    const result = UsernameQuerySchema.safeParse(query);
    // console.log(result);

    // If the username entered by the user doesn't match the ZOD schema
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    // If the username entered by the user matches the ZOD schema
    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "This username is already taken!",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "This username is available!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
