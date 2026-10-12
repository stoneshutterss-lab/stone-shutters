// app/api/admin/projects/[id]/route.js
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
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Get project error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
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
      projectName,
      tagLine,
      slug,
      category,
      coverImage,
      coverPublicId,
      publishedAt,
      images = [],
      deletedImagePublicIds = [], // Explicitly deleted images to purge from Cloudinary
    } = body;

    const currentProject = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!currentProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // If cover image changed, delete previous cover from Cloudinary if requested
    if (
      currentProject.coverPublicId &&
      coverPublicId &&
      currentProject.coverPublicId !== coverPublicId
    ) {
      deleteFromCloudinary(currentProject.coverPublicId);
    }

    // Purge removed images from Cloudinary to free free-tier storage
    if (deletedImagePublicIds && deletedImagePublicIds.length > 0) {
      await batchDeleteFromCloudinary(deletedImagePublicIds);
    }

    // Transaction: update project + replace/reorder images
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing image records
      await tx.projectImage.deleteMany({
        where: { projectId: id },
      });

      // Update project and insert images in new order
      return tx.project.update({
        where: { id },
        data: {
          projectName,
          tagLine: tagLine || null,
          slug,
          category,
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

    return NextResponse.json({ project: updated });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update project" },
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

    const project = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 1. Gather all Cloudinary assets to clean up
    const assetsToDestroy = [];
    if (project.coverPublicId) assetsToDestroy.push(project.coverPublicId);
    else if (project.coverImage) assetsToDestroy.push(project.coverImage);

    for (const img of project.images) {
      if (img.publicId) assetsToDestroy.push(img.publicId);
      else if (img.url) assetsToDestroy.push(img.url);
    }

    // 2. Delete from Cloudinary in background/parallel to reclaim free tier storage
    await batchDeleteFromCloudinary(assetsToDestroy);

    // 3. Delete from database (cascades to projectImage records)
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      cleanedAssetsCount: assetsToDestroy.length,
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
