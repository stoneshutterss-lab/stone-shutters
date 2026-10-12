// app/api/admin/baby-projects/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import prisma from "@/lib/prisma";

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

    const babyProjects = await prisma.babyProject.findMany({
      orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ babyProjects });
  } catch (error) {
    console.error("Fetch baby projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch baby projects" },
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
    const {
      childName,
      tagLine,
      slug,
      coverImage,
      coverPublicId,
      publishedAt,
      images = [],
    } = body;

    if (!childName || !slug || !coverImage) {
      return NextResponse.json(
        { error: "Child name, slug, and cover image are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.babyProject.findUnique({
      where: { slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A baby project with this slug already exists" },
        { status: 400 }
      );
    }

    const count = await prisma.babyProject.count();

    const babyProject = await prisma.babyProject.create({
      data: {
        childName,
        tagLine: tagLine || null,
        slug,
        coverImage,
        coverPublicId: coverPublicId || null,
        order: count,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        images: {
          create: images.map((img, idx) => ({
            url: typeof img === "string" ? img : img.url,
            publicId: typeof img === "string" ? null : img.publicId || null,
            order: idx,
          })),
        },
      },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ babyProject }, { status: 201 });
  } catch (error) {
    console.error("Create baby project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create baby project" },
      { status: 500 }
    );
  }
}

// Bulk reorder baby projects (Drag and drop)
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
        prisma.babyProject.update({
          where: { id: item.id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder baby projects error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
