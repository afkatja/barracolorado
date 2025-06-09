"use client"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { SanityDocument } from "next-sanity"
import React, { useState } from "react"

import BookingForm from "@/components/BookingForm"
import Breadcrumbs from "@/components/Breadcrumbs"
import Dialog from "@/components/Dialog"
import Section from "@/components/Section"
import { TFormData } from "@/types"

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
    priceSingle?: string
    priceTriple?: string
    slug: { current: string }
  }
  formData?: TFormData
  lang: string
}) => {
  const {
    _id,
    title,
    content,
    subtitle,
    description,
    mainImage,
    priceSingle,
    priceTriple,
    slug,
  } = packageData

  const [isOpen, setIsOpen] = useState(false)

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
          description={description}
          content={content}
          image={mainImage}
          asSection={false}
        >
          <footer className="flex items-center border-t-1 border-gray-600 pt-2 mt-2">
            <dl className="flex items-center">
              <dt className="m-0! text-lg font-bold">Rate per person</dt>
              <dd className="m-0! flex items-center">
                from only <strong className="ml-[3px]">${priceTriple}!</strong>
              </dd>
            </dl>
            {formData && (
              <Dialog
                isOpen={isOpen}
                className="min-h-11/12 md:min-h-2/3 w-11/12 md:w-1/2"
                button={{
                  buttonChildren: "Book now",
                  onButtonClick: () => setIsOpen(true),
                }}
              >
                <BookingForm
                  data={formData}
                  orderData={packageData}
                  onClose={() => setIsOpen(false)}
                />
              </Dialog>
            )}
          </footer>
        </Section>
      )}
    </>
  )
}

export default Package
