import { groq } from "next-sanity";

export const homeGalleryQuery = groq`
{
  "portfolio": *[_type == "project"]{
    galleryImages
  },

  "babyShoots": *[_type == "babyProject"]{
    galleryImages
  }
}
`;