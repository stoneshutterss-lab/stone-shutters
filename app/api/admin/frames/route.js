// app/api/admin/frames/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Auth helper
async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token && verifySessionToken(token);
}

export async function GET() {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const frames = await prisma.frame.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ frames });
  } catch (error) {
    console.error("Fetch admin frames error:", error);
    return NextResponse.json(
      { error: "Failed to fetch frames" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, desc, image, imagePublicId } = body;

    if (!title || !desc || !image) {
      return NextResponse.json(
        { error: "Frame title, description, and an image are required" },
        { status: 400 }
      );
    }

    const count = await prisma.frame.count();

    const frame = await prisma.frame.create({
      data: {
        title: title.trim(),
        desc: desc.trim(),
        image,
        imagePublicId: imagePublicId || null,
        order: count,
      },
    });

    return NextResponse.json({ frame }, { status: 201 });
  } catch (error) {
    console.error("Create frame error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create frame" },
      { status: 500 }
    );
  }
}

// Bulk reorder frames (Drag and drop)
export async function PUT(request) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items array" }, { status: 400 });
    }

    await prisma.$transaction(
      items.map((item, index) =>
        prisma.frame.update({
          where: { id: item.id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder frames error:", error);
    return NextResponse.json(
      { error: "Failed to update frame order" },
      { status: 500 }
    );
  }
}
