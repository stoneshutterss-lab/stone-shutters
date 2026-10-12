// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    console.log("Seeding initial portfolio projects...");

    await prisma.project.create({
      data: {
        projectName: "Rahul & Pooja",
        tagLine: "A Royal Heritage Wedding Celebration",
        slug: "rahul-and-pooja",
        category: "wedding",
        coverImage: "/category-pages/wedding-hero.png",
        order: 0,
        images: {
          create: [
            { url: "/category-pages/wedding-hero.png", order: 0 },
            { url: "/category-pages/wedding-content.png", order: 1 },
          ],
        },
      },
    });

    await prisma.project.create({
      data: {
        projectName: "Karthik & Sneha",
        tagLine: "Romantic Sunset Pre-Wedding Moments",
        slug: "karthik-and-sneha",
        category: "pre-post-wedding",
        coverImage: "/category-pages/pre-post-wedding-hero.png",
        order: 1,
        images: {
          create: [
            { url: "/category-pages/pre-post-wedding-hero.png", order: 0 },
            { url: "/category-pages/pre-post-wedding-content.png", order: 1 },
          ],
        },
      },
    });

    await prisma.project.create({
      data: {
        projectName: "Arun & Deepa",
        tagLine: "Unscripted Joy & Raw Emotions",
        slug: "arun-and-deepa",
        category: "candid",
        coverImage: "/category-pages/candid-hero.png",
        order: 2,
        images: {
          create: [
            { url: "/category-pages/candid-hero.png", order: 0 },
            { url: "/category-pages/candid-content.png", order: 1 },
          ],
        },
      },
    });

    await prisma.project.create({
      data: {
        projectName: "Sruthi's Arangetram",
        tagLine: "A Celebration of Classical Elegance & Devotion",
        slug: "sruthis-arangetram",
        category: "bharatanatyam",
        coverImage: "/category-pages/bharatanatyam-hero.png",
        order: 3,
        images: {
          create: [
            { url: "/category-pages/bharatanatyam-hero.png", order: 0 },
            { url: "/category-pages/bharatanatyam-content.png", order: 1 },
          ],
        },
      },
    });

    console.log("Seeded portfolio projects!");
  }

  const babyCount = await prisma.babyProject.count();
  if (babyCount === 0) {
    console.log("Seeding baby shoot projects...");

    await prisma.babyProject.create({
      data: {
        childName: "Baby Aaradhya",
        tagLine: "First Little Smiles & Golden Memories",
        slug: "baby-aaradhya",
        coverImage: "/category-pages/baby-shower-hero.png",
        order: 0,
        images: {
          create: [
            { url: "/category-pages/baby-shower-hero.png", order: 0 },
            { url: "/category-pages/baby-shower-content.png", order: 1 },
          ],
        },
      },
    });

    console.log("Seeded baby shoot projects!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
