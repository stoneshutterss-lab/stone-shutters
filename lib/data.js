// lib/data.js
import prisma from "@/lib/prisma";

/**
 * Fetch projects by category
 */
export async function getProjectsByCategory(category) {
  try {
    const projects = await prisma.project.findMany({
      where: { category },
      orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    return projects.map((p) => ({
      _id: p.id,
      projectName: p.projectName,
      tagLine: p.tagLine,
      slug: p.slug,
      category: p.category,
      coverImage: p.coverImage,
      galleryImages: p.images.map((img) => img.url),
    }));
  } catch (error) {
    console.error("getProjectsByCategory error:", error);
    return [];
  }
}

/**
 * Fetch single project by category and slug
 */
export async function getProjectBySlug(category, slug) {
  try {
    const project = await prisma.project.findFirst({
      where: {
        category,
        slug,
      },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!project) return null;

    return {
      _id: project.id,
      projectName: project.projectName,
      tagLine: project.tagLine,
      slug: project.slug,
      category: project.category,
      coverImage: project.coverImage,
      galleryImages: project.images.map((img) => img.url),
    };
  } catch (error) {
    console.error("getProjectBySlug error:", error);
    return null;
  }
}

/**
 * Fetch all baby shoot projects
 */
export async function getBabyProjects() {
  try {
    const babyProjects = await prisma.babyProject.findMany({
      orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    return babyProjects.map((p) => ({
      _id: p.id,
      childName: p.childName,
      tagLine: p.tagLine,
      slug: p.slug,
      coverImage: p.coverImage,
      galleryImages: p.images.map((img) => img.url),
    }));
  } catch (error) {
    console.error("getBabyProjects error:", error);
    return [];
  }
}

/**
 * Fetch baby project by slug
 */
export async function getBabyProjectBySlug(slug) {
  try {
    const project = await prisma.babyProject.findFirst({
      where: { slug },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!project) return null;

    return {
      _id: project.id,
      childName: project.childName,
      tagLine: project.tagLine,
      slug: project.slug,
      coverImage: project.coverImage,
      galleryImages: project.images.map((img) => img.url),
    };
  } catch (error) {
    console.error("getBabyProjectBySlug error:", error);
    return null;
  }
}

/**
 * Fetch home gallery images
 */
export async function getHomeGalleryData() {
  try {
    const [projects, babyProjects] = await Promise.all([
      prisma.project.findMany({
        orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
        include: {
          images: {
            orderBy: { order: "asc" },
          },
        },
      }),
      prisma.babyProject.findMany({
        orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
        include: {
          images: {
            orderBy: { order: "asc" },
          },
        },
      }),
    ]);

    return {
      portfolio: projects.map((p) => ({
        _id: p.id,
        projectName: p.projectName,
        category: p.category,
        slug: p.slug,
        galleryImages: p.images.map((img) => img.url),
      })),
      babyShoots: babyProjects.map((p) => ({
        _id: p.id,
        childName: p.childName,
        slug: p.slug,
        galleryImages: p.images.map((img) => img.url),
      })),
    };
  } catch (error) {
    console.error("getHomeGalleryData error:", error);
    return { portfolio: [], babyShoots: [] };
  }
}
