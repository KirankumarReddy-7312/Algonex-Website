import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 text-[#00B4D8]" style={{ fontFamily: "'Comfortaa', cursive" }}>Algonex IT Solutions</h4>
              <p className="text-gray-400 mb-4">
                Empowering careers through innovative education and community events
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-[#66E5FF]">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-[#66E5FF] transition-colors">Home</Link></li>
                <li><Link to="/events" className="hover:text-[#66E5FF] transition-colors">Events</Link></li>
                <li><Link to="/aboutus" className="hover:text-[#66E5FF] transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-[#66E5FF] transition-colors">Contact</Link></li>
                <div className='flex justify-center md:justify-start gap-5 pt-2'>
                  <li>
                    <a
                      href="https://wa.me/919959789424"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 hover:text-[#25D366] transition-colors"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/algonex-it-solutions/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 hover:text-[#0A66C2] transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </li>
                </div>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-[#66E5FF]">Event Types</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/events" state={{ filter: 'Workshop' }} className="hover:text-[#66E5FF] transition-colors">Workshops</Link></li>
                <li><Link to="/events" state={{ filter: 'Webinar' }} className="hover:text-[#66E5FF] transition-colors">Webinars</Link></li>
                <li><Link to="/events" state={{ filter: 'Bootcamp' }} className="hover:text-[#66E5FF] transition-colors">Bootcamps</Link></li>
                <li><Link to="/events" state={{ filter: 'Career Fair' }} className="hover:text-[#66E5FF] transition-colors">Career Fairs</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-[#66E5FF]">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Bangalore, Karnataka</li>
                <li>solutions@algonex.co.in</li>
                <li>+91 9959789424, +91 7995739967</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>© 2025 Algonex IT Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
