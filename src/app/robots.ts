import { MetadataRoute } from "next"
import { IS_STAGING } from "@/lib/config"

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL

  if (IS_STAGING) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    }
  }

  if (base) {
    return {
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
    }
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
  }
}
