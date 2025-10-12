import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/919810800223?text=Hi%2C%20I%20am%20interested%20in%20Online%20University%20courses%2C%20I%20checked%20the%20same%20on%20UpSchol.%20Please%20help%20me%20with%20the%20admission%20process"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
