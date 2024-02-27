import getCurrentUser from "@/app/actions/getCurrentUser";
import { prismadb } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prismadb.user.update({
      data: {
        image: image,
        name: name,
      },
      where: {
        id: currentUser.id,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[SETTINGS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
