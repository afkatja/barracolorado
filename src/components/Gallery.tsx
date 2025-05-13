"use client"
import { Element } from "react-scroll"
import Image from "next/image"
import Link from "next/link"

const Gallery = () => (
  <Element name="gallery" className="main fullscreen">
    <section
      id="gallery"
      className="style3 bg-gray-700 text-gray-50 p-8 flex-1"
    >
      <div className="content text-center">
        <header>
          <h2 className="text-3xl mb-4">Gallery</h2>
          <p className="mb-8">
            Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore
            condimentum. Fusce blandit ultrices sapien, in accumsan orci rhoncus
            eu. Sed sodales venenatis arcu, id varius justo euismod in.
            Curabitur egestas consectetur magna vitae.
          </p>
        </header>
        <div className="gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { src: "01.jpg", title: "The Anonymous Red" },
            { src: "02.jpg", title: "Airchitecture II" },
            { src: "03.jpg", title: "Air Lounge" },
            { src: "04.jpg", title: "Carry on" },
            { src: "05.jpg", title: "The sparkling shell" },
            { src: "06.jpg", title: "Bent IX" },
          ].map((image, index) => (
            <article
              key={index}
              className={index % 2 === 0 ? "from-left" : "from-right"}
            >
              <Link href={`images/fulls/${image.src}`} className="image fit">
                <Image
                  src={`images/thumbs/${image.src}`}
                  title={image.title}
                  alt=""
                  className="w-full h-auto"
                  width={100}
                  height={100}
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Element>
)

export default Gallery
