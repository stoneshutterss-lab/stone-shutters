import { groq } from "next-sanity";

export const categoryImagesQuery = groq`
*[_type == "project" && category == $category]{
  _id,
  projectName,
  category,
  galleryImages
}
`;

export const babyProjectsQuery = `
*[_type == "babyProject"] | order(publishedAt desc){
  _id,
  childName,
  "slug": slug.current,
  coverImage
}
`;