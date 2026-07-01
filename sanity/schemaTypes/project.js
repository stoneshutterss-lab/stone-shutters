// src/sanity/schemaTypes/project.js

import { defineField, defineType } from "sanity";
import CloudinaryUploader from "../components/CloudinaryUploader";

export default defineType({
  name: "project",
  title: "Portfolio Projects",
  type: "document",

  fields: [
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
  name: "tagLine",
  title: "Tag Line",
  type: "string",
  description: "A short subtitle displayed below the project name.",
}),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "projectName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",

      options: {
        list: [
          {
            title: "Wedding",
            value: "wedding",
          },

          {
            title: "Pre Wedding & Post Wedding",
            value: "pre-post-wedding",
          },

          {
            title: "Candid",
            value: "candid",
          },

          {
            title: "Baby Shower",
            value: "baby-shower",
          },

          {
            title: "Puberty",
            value: "puberty",
          },

          {
            title: "Birthday Shoot",
            value: "birthday-shoot",
          },
          {
            title: "Bharatanatyam ",
            value: "bharatanatyam",
          },
        ],

        layout: "dropdown",
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
      title: "projectName",
      subtitle: "category",
      media: "coverImage",
    },

    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});