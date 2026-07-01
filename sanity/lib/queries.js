import { groq } from "next-sanity";

export const categoryImagesQuery = groq`
*[_type == "project" && category == $category] | order(publishedAt desc){
  _id,
  projectName,
  tagLine,
  "slug": slug.current,
  category,
  coverImage,
  galleryImages
}
`;

export const babyProjectsQuery = groq`
*[_type == "babyProject"] | order(publishedAt desc){
  _id,
  childName,
  tagLine,
  "slug": slug.current,
  coverImage
}
`;