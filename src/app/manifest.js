import { SITE_DESCRIPTION, SITE_NAME } from "@/shared/config/site";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: "Codzilla",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00AAFF",
    categories: ["education", "kids", "technology"],
    lang: "ru",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

