import { Metadata } from "next";

import { Page } from "@/types";

export async function generatePageMetadata(
  page: Page | null,
): Promise<Metadata> {
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
}
