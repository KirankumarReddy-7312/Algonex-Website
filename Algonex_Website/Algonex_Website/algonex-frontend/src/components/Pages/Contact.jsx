import React, { useState } from 'react';

const apiUrl = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/submit-form/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        // Handle the case where the backend returns field errors
        const errorMsg = Object.entries(result)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join('\n');
        alert(errorMsg || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CCF6FF] via-[#E0F7FF] to-white">
      {/* Header Section */}
      <div className="relative h-[300px] md:h-[450px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] z-10"></div>
        <div className="relative z-20 max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Get In Touch
          </h1>
          <p className="text-base md:text-2xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions or interested in our programs? Our team is here to help you navigate your journey with Algonex.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">


        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-[#66E5FF]">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-[#00667A]" style={{ fontFamily: 'Product Sans, sans-serif' }}>
                Send us a Message
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#66E5FF] rounded-xl focus:outline-none focus:border-[#00B4D8] transition-all"
                  placeholder="Saikiran"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#66E5FF] rounded-xl focus:outline-none focus:border-[#00B4D8] transition-all"
                  placeholder="saikiran@gmail.com"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#66E5FF] rounded-xl focus:outline-none focus:border-[#00B4D8] transition-all"
                  placeholder="+91 9876543210"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#66E5FF] rounded-xl focus:outline-none focus:border-[#00B4D8] transition-all"
                  placeholder="Course inquiry, Technical support, etc."
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-[#66E5FF] rounded-xl focus:outline-none focus:border-[#00B4D8] transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#00B4D8] text-white py-4 rounded-full font-semibold hover:bg-[#0BADCD] transition-all shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Send Message
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Google Maps Embed */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#66E5FF]">
              <div className="bg-[#00B4D8] text-white px-6 py-4">
                <h3 className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: 'Product Sans, sans-serif' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Find Us Here
                </h3>
              </div>
              <div className="relative h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8421234567893!2d77.6970000!3d12.9716000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwNDEnNDkuMiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Algonex IT Solutions Location"
                ></iframe>
              </div>
              <div className="p-6 bg-gray-50">
                <p className="text-gray-700 font-medium mb-2" style={{ fontFamily: 'Product Sans, sans-serif' }}><span style={{ fontFamily: "'Comfortaa', cursive" }}>Algonex</span> IT Solutions</p>
                <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Marthahalli, Bangalore, Karnataka 560037</p>
                <a
                  href="https://maps.google.com/?q=Marthahalli+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-[#00B4D8] hover:text-[#0BADCD] font-medium"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Get Directions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-2xl p-8 border border-[#66E5FF] shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#CCF6FF] p-3 rounded-lg">
                  <svg className="w-6 h-6 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#00667A]" style={{ fontFamily: 'Product Sans, sans-serif' }}>Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Monday - Friday</span>
                  <span className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Saturday</span>
                  <span className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Sunday</span>
                  <span className="font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>8:00 AM - 8:00 PM</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#66E5FF]">
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  📧 We typically respond within 24 hours during business days. For urgent inquiries, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16 mt-16">
          {/* Contact Cards */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#66E5FF]">
            <div className="bg-[#CCF6FF] w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#00667A]" style={{ fontFamily: 'Product Sans, sans-serif' }}>Email Us</h3>
            <p className="text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Send us an email anytime</p>
            <a href="mailto:solutions@algonex.co.in" className="text-[#00B4D8] hover:text-[#0BADCD] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              solutions@algonex.co.in
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#66E5FF]">
            <div className="bg-[#CCF6FF] w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#00667A]" style={{ fontFamily: 'Product Sans, sans-serif' }}>Call Us</h3>
            <p className="text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Mon - Sat, 9AM - 6PM IST</p>
            <a href="tel:+919959789424" className="text-[#00B4D8] hover:text-[#0BADCD] font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +91 9959789424 <br />+91 7995739967
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#66E5FF]">
            <div className="bg-[#CCF6FF] w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#00667A]" style={{ fontFamily: 'Product Sans, sans-serif' }}>Visit Us</h3>
            <p className="text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Come visit our office</p>
            <p className="text-gray-700 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}><span style={{ fontFamily: "'Comfortaa', cursive" }}>Algonex</span> IT Solutions, Marthahalli<br />Bangalore, 560037</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;