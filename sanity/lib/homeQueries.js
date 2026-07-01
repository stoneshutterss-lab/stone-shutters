import { groq } from "next-sanity";

export const homeGalleryQuery = groq`
{
  "portfolio": *[_type == "project"]{
    _id,
    projectName,
    category,
    "slug": slug.current,
    galleryImages
  },

  "babyShoots": *[_type == "babyProject"]{
    _id,
    childName,
    "slug": slug.current,
    galleryImages
  }
}
`;