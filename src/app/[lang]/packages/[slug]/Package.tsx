"use client"
import React from "react"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { SanityDocument } from "next-sanity"

import Section from "@/components/Section"
import Dialog from "@/components/Dialog"
import BookingForm from "@/components/BookingForm"
import { TFormData } from "@/types"
import Breadcrumbs from "../../../../components/Breadcrumbs"

const Package = ({
  packageData,
  formData,
  lang,
}: {
  packageData: {
    _id: string
    title: string
    content?: SanityDocument | string
    subtitle?: string
    description?: string
    mainImage?: SanityImageObject
    price?: string
    slug: { current: string }
  }
  formData?: TFormData
  lang: string
}) => {
  const { _id, title, content, subtitle, description, mainImage, price, slug } =
    packageData

  return (
    <>
      <div className="w-11/12 mx-auto py-1">
        <Breadcrumbs
          items={[
            { label: "Packages", href: `/${lang}/packages` },
            { label: title, href: `/packages/${slug.current}` },
          ]}
        />
      </div>
      {title && content && (
        <Section
          key={_id}
          id={_id}
          title={title}
          subtitle={subtitle}
          description={description}
          content={content}
          image={mainImage}
          asSection={false}
        >
          <footer className="flex items-center border-t-1 border-gray-600 pt-2 mt-2">
            <dl className="flex items-center">
              <dt className="m-0! text-lg font-bold">Price per person</dt>
              <dd className="m-0!">{price}</dd>
            </dl>
            {formData && (
              <Dialog button={{ buttonChildren: "Book now" }}>
                <BookingForm data={formData} orderData={packageData} />
              </Dialog>
            )}
          </footer>
        </Section>
      )}
    </>
  )
}

export default Package
