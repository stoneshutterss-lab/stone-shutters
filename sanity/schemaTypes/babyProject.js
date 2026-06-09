import { defineField, defineType } from "sanity";
import CloudinaryUploader from "../components/CloudinaryUploader";

export default defineType({
  name: "babyProject",
  title: "Baby Shoot Projects",
  type: "document",

  fields: [
    defineField({
      name: "childName",
      title: "Child Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "childName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",

      of: [
        {
          type: "string",
        },
      ],

      components: {
        input: CloudinaryUploader,
      },

      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Please upload at least one image"),
    }),

    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "childName",
      media: "coverImage",
    },
  },
});