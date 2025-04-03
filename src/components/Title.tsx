import React from "react"

interface ITitle {
  Heading?: React.ElementType<{ className?: string }>
  title: React.ReactNode
  titleClassName?: string
}

const Title = ({ title, titleClassName, Heading = "h2" }: ITitle) => {
  return <Heading className={titleClassName}>{title}</Heading>
}

export default Title
