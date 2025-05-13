import { render, screen } from "@testing-library/react"
import ScrollAnimation from "../ScrollAnimation"
import "@testing-library/jest-dom"

describe("ScrollAnimation", () => {
  it("renders children correctly", () => {
    render(
      <ScrollAnimation>
        <div data-testid="test-child">Test Content</div>
      </ScrollAnimation>
    )

    expect(screen.getByTestId("test-child")).toBeInTheDocument()
    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("applies correct animation class based on direction", () => {
    const { rerender } = render(
      <ScrollAnimation direction="left">
        <div>Test Content</div>
      </ScrollAnimation>
    )

    expect(screen.getByText("Test Content").parentElement).toHaveClass(
      "animate-slideleft"
    )

    rerender(
      <ScrollAnimation direction="right">
        <div>Test Content</div>
      </ScrollAnimation>
    )

    expect(screen.getByText("Test Content").parentElement).toHaveClass(
      "animate-slideright"
    )
  })

  it("applies custom className", () => {
    render(
      <ScrollAnimation className="custom-class">
        <div>Test Content</div>
      </ScrollAnimation>
    )

    expect(screen.getByText("Test Content").parentElement).toHaveClass(
      "custom-class"
    )
  })

  // it("applies custom style", async () => {
  //   const customStyle = { backgroundColor: "red" }
  //   render(
  //     <ScrollAnimation style={customStyle} dataTestId="test-scroll-animation">
  //       <div>Test Content</div>
  //     </ScrollAnimation>
  //   )

  //   const element = await screen.findByTestId("test-scroll-animation")
  //   console.log(element)

  //   expect(element).toHaveStyle({ backgroundColor: "red" })
  // })
})
