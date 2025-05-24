import { FaWhatsapp } from "react-icons/fa"

const WhatsAppButton = () => {
  const phoneNumber = "50688748375" // Replace with your actual WhatsApp number
  const message =
    "Hello! I'm interested in learning more about Barra del Colorado."

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-2 right-2 z-50 bg-green-500 text-white p-1 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-2 h-2" />
    </a>
  )
}

export default WhatsAppButton
