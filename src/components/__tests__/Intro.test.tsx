import { render, screen } from "@testing-library/react"

import Intro from "../Intro"

// Mock the urlFor function
jest.mock("@/sanity/lib/image", () => ({
  urlFor: jest.fn().mockReturnValue({
    url: () => "mocked-image-url",
  }),
}))

// Mock react-scroll
jest.mock("react-scroll", () => ({
  Link: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: any
  }) => <a {...props}>{children}</a>,
}))

const mockProps = {
  title: "Test Title",
  subtitle: "Test Subtitle",
  description: "Test Description",
  backgroundImage: {
    asset: {
      _ref: "test-ref",
    },
  },
  sectionId: "intro",
  nextSection: "test-section",
}

describe("Intro", () => {
  it("renders all content correctly", () => {
    render(<Intro {...mockProps} />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByText("More")).toBeInTheDocument()
  })

  it("applies correct background image", () => {
    render(<Intro {...mockProps} />)

    const section = screen.getByTestId("intro-section")
    const style = section.style
    expect(style.backgroundImage).toBe("url(mocked-image-url)")
  })

  it("renders with correct section ID", () => {
    render(<Intro {...mockProps} />)

    expect(screen.getByTestId("intro-section")).toHaveAttribute("id", "intro")
  })

  it("applies correct classes", () => {
    render(<Intro {...mockProps} />)

    const section = screen.getByTestId("intro-section")
    expect(section).toHaveClass("dark", "style1", "bg-gray-900")
  })
})
