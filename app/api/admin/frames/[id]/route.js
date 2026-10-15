// app/api/admin/frames/[id]/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token && verifySessionToken(token);
}

export async function GET(request, { params }) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const frame = await prisma.frame.findUnique({
      where: { id },
    });

    if (!frame) {
      return NextResponse.json({ error: "Frame not found" }, { status: 404 });
    }

    return NextResponse.json({ frame });
  } catch (error) {
    console.error("Get frame error:", error);
    return NextResponse.json(
      { error: "Failed to fetch frame" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, desc, image, imagePublicId } = body;

    const currentFrame = await prisma.frame.findUnique({
      where: { id },
    });

    if (!currentFrame) {
      return NextResponse.json({ error: "Frame not found" }, { status: 404 });
    }

    // If image changed and had an old publicId, purge previous image
    if (
      currentFrame.imagePublicId &&
      imagePublicId &&
      currentFrame.imagePublicId !== imagePublicId
    ) {
      deleteFromCloudinary(currentFrame.imagePublicId);
    }

    const updated = await prisma.frame.update({
      where: { id },
      data: {
        title: title ? title.trim() : currentFrame.title,
        desc: desc ? desc.trim() : currentFrame.desc,
        image: image || currentFrame.image,
        imagePublicId:
          imagePublicId !== undefined
            ? imagePublicId
            : currentFrame.imagePublicId,
      },
    });

    return NextResponse.json({ frame: updated });
  } catch (error) {
    console.error("Update frame error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update frame" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const frame = await prisma.frame.findUnique({
      where: { id },
    });

    if (!frame) {
      return NextResponse.json({ error: "Frame not found" }, { status: 404 });
    }

    // Purge image from Cloudinary if applicable
    if (frame.imagePublicId) {
      deleteFromCloudinary(frame.imagePublicId);
    }

    await prisma.frame.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete frame error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete frame" },
      { status: 500 }
    );
  }
}
