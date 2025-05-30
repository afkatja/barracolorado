"use client"
import React from "react"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { SanityDocument } from "next-sanity"

import Section from "@/components/Section"
import Dialog from "@/components/Dialog"
import BookingForm from "@/components/BookingForm"
import { TFormData } from "@/types"

const Package = ({
  packageData,
  formData,
}: {
  packageData: {
    _id: string
    title: string
    content?: SanityDocument | string
    subtitle?: string
    description?: string
    mainImage?: SanityImageObject
  }
  formData?: TFormData
}) => {
  const { _id, title, content, subtitle, description, mainImage } = packageData

  return (
    <>
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
          {formData && (
            <Dialog button={{ buttonChildren: "Book now" }}>
              <BookingForm data={formData} />
            </Dialog>
          )}
        </Section>
      )}
    </>
  )
}

export default Package
