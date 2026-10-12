// app/api/admin/baby-projects/[id]/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deleteFromCloudinary, batchDeleteFromCloudinary } from "@/lib/cloudinary";

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
    const babyProject = await prisma.babyProject.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!babyProject) {
      return NextResponse.json({ error: "Baby project not found" }, { status: 404 });
    }

    return NextResponse.json({ babyProject });
  } catch (error) {
    console.error("Get baby project error:", error);
    return NextResponse.json(
      { error: "Failed to fetch baby project" },
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
    const {
      childName,
      tagLine,
      slug,
      coverImage,
      coverPublicId,
      publishedAt,
      images = [],
      deletedImagePublicIds = [],
    } = body;

    const currentProject = await prisma.babyProject.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!currentProject) {
      return NextResponse.json({ error: "Baby project not found" }, { status: 404 });
    }

    // Clean old cover if changed
    if (
      currentProject.coverPublicId &&
      coverPublicId &&
      currentProject.coverPublicId !== coverPublicId
    ) {
      deleteFromCloudinary(currentProject.coverPublicId);
    }

    // Purge removed images
    if (deletedImagePublicIds && deletedImagePublicIds.length > 0) {
      await batchDeleteFromCloudinary(deletedImagePublicIds);
    }

    // Update baby project & reorder images
    const updated = await prisma.$transaction(async (tx) => {
      await tx.babyProjectImage.deleteMany({
        where: { babyProjectId: id },
      });

      return tx.babyProject.update({
        where: { id },
        data: {
          childName,
          tagLine: tagLine || null,
          slug,
          coverImage,
          coverPublicId: coverPublicId || null,
          publishedAt: publishedAt ? new Date(publishedAt) : currentProject.publishedAt,
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
    });

    return NextResponse.json({ babyProject: updated });
  } catch (error) {
    console.error("Update baby project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update baby project" },
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

    const babyProject = await prisma.babyProject.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!babyProject) {
      return NextResponse.json({ error: "Baby project not found" }, { status: 404 });
    }

    // 1. Collect Cloudinary assets to delete
    const assetsToDestroy = [];
    if (babyProject.coverPublicId) assetsToDestroy.push(babyProject.coverPublicId);
    else if (babyProject.coverImage) assetsToDestroy.push(babyProject.coverImage);

    for (const img of babyProject.images) {
      if (img.publicId) assetsToDestroy.push(img.publicId);
      else if (img.url) assetsToDestroy.push(img.url);
    }

    // 2. Free Cloudinary free tier storage
    await batchDeleteFromCloudinary(assetsToDestroy);

    // 3. Delete from database
    await prisma.babyProject.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      cleanedAssetsCount: assetsToDestroy.length,
    });
  } catch (error) {
    console.error("Delete baby project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete baby project" },
      { status: 500 }
    );
  }
}
