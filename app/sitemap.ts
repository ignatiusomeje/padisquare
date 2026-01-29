import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://padisquare-theta.vercel.app/`,
      lastModified: new Date(),
    },
  ];
}
