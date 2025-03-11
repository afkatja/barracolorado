import Link from "next/link"

const Intro = () => (
  <section
    id="intro"
    className="main style1 dark fullscreen bg-gray-900 text-white flex justify-center items-center p-8"
  >
    <div className="content text-center">
      <header>
        <h2 className="text-4xl mb-4">Hey.</h2>
      </header>
      <p className="mb-4">
        Welcome to <strong>Big Picture</strong> a responsive site template
        designed by{" "}
        <a
          href="https://html5up.net"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          HTML5 UP
        </a>
        <br />
        and released for free under the{" "}
        <a
          href="https://html5up.net/license"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Creative Commons Attribution license
        </a>
        .
      </p>
      <footer>
        <Link
          href="#one"
          className="button style2 down bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          More
        </Link>
      </footer>
    </div>
  </section>
)

export default Intro
