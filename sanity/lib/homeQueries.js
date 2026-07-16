import { groq } from "next-sanity";

export const homeGalleryQuery = groq`
{
  "portfolio": *[_type=="project"] | order(publishedAt desc){
    _id,
    projectName,
    category,
    "slug": slug.current,
    galleryImages
  },

  "babyShoots": *[_type=="babyProject"] | order(publishedAt desc){
    _id,
    childName,
    "slug": slug.current,
    galleryImages
  }
}
`;