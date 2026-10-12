// app/api/admin/projects/route.js
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

    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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
      projectName,
      tagLine,
      slug,
      category,
      coverImage,
      coverPublicId,
      publishedAt,
      images = [],
    } = body;

    if (!projectName || !slug || !category || !coverImage) {
      return NextResponse.json(
        { error: "Project name, slug, category, and cover image are required" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({
      where: { slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 400 }
      );
    }

    // Count existing for default order
    const count = await prisma.project.count();

    const project = await prisma.project.create({
      data: {
        projectName,
        tagLine: tagLine || null,
        slug,
        category,
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

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}

// Bulk reorder projects (Drag and drop)
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

    // Batch update order
    await prisma.$transaction(
      items.map((item, index) =>
        prisma.project.update({
          where: { id: item.id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder projects error:", error);
    return NextResponse.json(
      { error: "Failed to update project order" },
      { status: 500 }
    );
  }
}
