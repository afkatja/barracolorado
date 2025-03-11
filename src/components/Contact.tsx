const Contact = () => (
  <section
    id="contact"
    className="main style3 secondary bg-gray-800 text-white p-8"
  >
    <div className="content text-center">
      <header>
        <h2 className="text-3xl mb-4">Say Hello.</h2>
        <p className="mb-8">
          Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore
          condimentum.
        </p>
      </header>
      <div className="box">
        <form method="post" action="#">
          <div className="fields grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="field half">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 rounded"
              />
            </div>
            <div className="field half">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 rounded"
              />
            </div>
            <div className="field col-span-2">
              <textarea
                name="message"
                placeholder="Message"
                rows={6}
                className="w-full p-2 rounded"
              ></textarea>
            </div>
          </div>
          <ul className="actions special flex justify-center">
            <li>
              <input
                type="submit"
                value="Send Message"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  </section>
)

export default Contact
