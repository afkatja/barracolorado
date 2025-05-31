import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import React from "react";

import { generatePageMetadata } from "@/lib/metadata";

import { sanityFetch } from "../../../../sanity/lib/client";
import { PACKAGE_QUERY, PAGE_QUERY } from "../../../../sanity/lib/queries";
import { PageParams, TFormData } from "../../../../types";

import PackageComponent from "./Package";

type PackageType = {
  _id: string;
  _type: string;
  slug: { current: string };
  title: string;
  subtitle?: string;
  description?: string;
  content?: SanityDocument | string;
  mainImage: SanityImageObject;
  dialog?: TFormData;
};

type PageProps = {
  params: PageParams;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const page = await sanityFetch<PackageType>({
    query: PAGE_QUERY,
    params: { slug, locale: lang },
  });

  return generatePageMetadata(page);
}

const Package = async ({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) => {
  const { lang, slug } = await params;
  const packageData = await sanityFetch<PackageType>({
    query: PACKAGE_QUERY,
    params: { language: lang, slug },
  });

  return (
    <PackageComponent
      formData={packageData.dialog}
      packageData={packageData}
      lang={lang}
    />
  );
};

export default Package;
