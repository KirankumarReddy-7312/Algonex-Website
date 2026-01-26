import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import nodopesWorkshop from '../../assets/nodopes-workshop.jpg';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const EventsPage = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-select filter if passed via navigation state
  useEffect(() => {
    if (location.state?.filter) {
      setActiveFilter(location.state.filter);
      // Optional: scroll to the events section if needed, though window.scrollTo(0,0) is good too
    }
    // Always scroll to top on mount/navigation
    window.scrollTo(0, 0);
  }, [location.state, location.pathname]);

  const upcomingEvents = [
    {
      id: 1,
      title: 'SVCE x Campus Innovators Hackathon 2026',
      date: 'Mar 6 and 7, 2026',
      time: 'Mar 6 - 10:00 AM - Mar 7 - 10:00 AM',
      location: <a href="https://www.bing.com/maps/search?mepi=0%7E%7EEmbedded%7EAddress_Link&ty=18&v=2&sV=1&FORM=MPSRPL&q=Sri+Venkateswara+College+of+Engineering&ss=id.ypid%3AYN4070x6250485152258445069&ppois=13.658157348632812_79.48625183105469_Sri+Venkateswara+College+of+Engineering_YN4070x6250485152258445069%7E&cp=13.658157%7E79.486252&lvl=11&style=r" target="_blank" rel="noopener noreferrer">SVCE, Karakambadi Road, Tirupati Urban, AP - 517507</a>,
      type: 'Hackathon',
      mode: 'Offline',
      participants: 500,
      image: '/hackathon_2026.png',
      description: 'SVCE x Algonex Hackathon 2026 is a 24-hour campus hackathon where students build real-world AI and software solutions.Learn, build, and get hired through innovation, demos, and industry mentoring.',
      status: 'Upcoming',
      spots: 15
    },
  ];

  const pastEvents = [
    {
      id: 5,
      title: 'AI Agents Workshop',
      date: 'Sep 20, 2024',
      location: 'Microsoft Office, Bellandur',
      type: 'Workshop',
      mode: 'Offline',
      participants: 60,
      image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&auto=format&fit=crop',
      description: 'Explored autonomous AI agents and their real-world applications',
      highlights: ['45+ attendees', 'Hands-on labs', 'Industry expert speakers']
    },
    {
      id: 6,
      title: 'Travel Tech Innovation Summit',
      date: 'Aug 15, 2024',
      location: 'Amadeus Office, Bangalore',
      type: 'Summit',
      mode: 'Offline',
      participants: 80,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
      description: 'Technology innovations in travel and hospitality industry',
      highlights: ['80+ professionals', 'Panel discussions', 'Networking sessions']
    },
    {
      id: 7,
      title: 'AWS Cloud Certification Drive',
      date: 'Jul 28, 2024',
      location: 'AWS Office, KR Puram',
      type: 'Certification',
      mode: 'Offline',
      participants: 55,
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop',
      description: 'Intensive AWS certification preparation workshop',
      highlights: ['55 participants', 'Mock exams', '90% pass rate']
    },
    {
      id: 9,
      title: 'Data Science Hackathon',
      date: 'May 25, 2024',
      location: 'Algonex IT Solutions, Bangalore',
      type: 'Hackathon',
      mode: 'Offline',
      participants: 70,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
      description: '24-hour data science problem-solving competition',
      highlights: ['15 teams', 'Industry mentors', 'Prize pool ₹50K']
    },
    {
      id: 10,
      title: 'Tech Career Fair 2024',
      date: 'Apr 18, 2024',
      location: 'Online',
      type: 'Career Fair',
      mode: 'Online',
      participants: 150,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      description: 'Connect with top companies for placement opportunities',
      highlights: ['30+ companies', '150+ candidates', '40 job offers']
    },
    {
      id: 11,
      title: 'NodeOps AI event',
      date: 'Dec 12, 2025',
      location: 'Draper House Startup, Koramangala',
      type: 'Workshop',
      mode: 'Offline',
      participants: 60,
      image: NodeOpsWorkshop,
      description: 'An exclusive startup event focused on growth hacks and product innovation at Draper House.',
      highlights: ['Startup insights', 'Growth hacking', 'Networking']
    },
    {
      id: 12,
      title: 'Idea to Deploy AI Workshop',
      date: 'Dec 06, 2025',
      location: 'Marathahalli, Bangalore',
      type: 'Workshop',
      mode: 'Offline',
      participants: 55,
      image: '/idea-deploy-event.png',
      description: 'Experience the next generation BUILD with our cutting-edge AI WORKSHOP. From Idea to Deployment.',
      highlights: ['Training & Internships', 'Industry Best Practices', 'Placement Assistance']
    },
    {
      id: 13,
      title: 'Career Guidance: Freshers to Industry-Ready Engineers',
      date: 'Dec 24-25, 2025',
      location: 'Marathahalli, Bangalore',
      type: 'Workshop',
      mode: 'Offline',
      participants: 120,
      image: '/career_guidance_event.png',
      description: 'Clarity - Direction - Confidence. A session designed for college students to overcome confusion about skills, courses, and jobs.',
      highlights: ['WHAT to Learn & HOW to Build IT Career', 'Placement & Interview Prep', 'Real-world Application', 'Future Stability Strategies']
    }
  ];

  const eventTypes = ['all', 'Workshop', 'Webinar', 'Bootcamp', 'Masterclass', 'Summit', 'Hackathon', 'Career Fair'];

  const filteredUpcoming = upcomingEvents.filter(event =>
    (activeFilter === 'all' || event.type === activeFilter) &&
    (searchQuery === '' || event.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredPast = pastEvents.filter(event =>
    (activeFilter === 'all' || event.type === activeFilter) &&
    (searchQuery === '' || event.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errors, setErrors] = useState({});
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const modePrices = {
    basic: 200,
    pro: 300,
    premium: 500,
  };


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    mode: "",
    amount: "",
    paymentId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Auto update price when mode changes
    if (name === "mode") {
      updatedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
      amount: name === "mode" ? modePrices[value] : prev.amount
    }));

    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handlePaymentSubmit = async () => {
    const newErrors = {};

    // Field-wise validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.college.trim()) newErrors.college = "College is required";
    if (!formData.mode) newErrors.mode = "Please select a mode";
    if (!formData.paymentId.trim()) newErrors.paymentId = "Payment ID is required";

    // If any errors, set them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Payload for backend
    const payload = {
      eventId: selectedEvent?.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      mode: formData.mode,
      amount: formData.amount,
      paymentId: formData.paymentId,
    };

    try {
      // Ensure apiUrl is used and handles potential double slashes
      const base = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
      const response = await fetch(`${base}/api/events/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful");
        setShowModal(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          college: "",
          mode: "",
          amount: "",
          paymentId: "",
        });
        setErrors({});
      } else {
        // Backend errors
        const formattedErrors = {};
        Object.keys(data).forEach(key => {
          formattedErrors[key] = Array.isArray(data[key]) ? data[key].join(", ") : data[key];
        });
        setErrors(formattedErrors);
      }
    } catch (err) {
      setErrors({ general: "Network error! Try again later." });
    }
  };

  const handleSubscribe = async () => {
    if (!emailSubscription.trim()) return;

    try {
      const base = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
      const response = await fetch(`${base}/api/newsletter/subscribe/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailSubscription }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmailSubscription('');
        // Auto-close success message after 5 seconds
        setTimeout(() => {
          setIsSubscribed(false);
        }, 5000);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to subscribe.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <>
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">

          {/* Scrollable wrapper */}
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">

            {/* Inside padding */}
            <div className="p-6">

              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-6 text-center text-[#00B4D8]">
                Register for {selectedEvent?.title}
              </h2>
              {errors.general && <p className="text-red-500 text-sm mt-2 text-center">{errors.general}</p>}


              {/* 2-column form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border p-3 rounded-lg"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border p-3 rounded-lg"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="w-full border p-3 rounded-lg"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10} // limits input to 10 characters
                    pattern="[0-9]{10}" // optional: ensures only 10 digits
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">College</label>
                  <input
                    type="text"
                    name="college"
                    className="w-full border p-3 rounded-lg"
                    placeholder="College name"
                    value={formData.college}
                    onChange={handleChange}
                  />
                  {errors.college && <p className="text-red-500 text-sm mt-2 text-center">{errors.college}</p>}
                </div>
              </div>

              {/* Mode */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Mode</label>
                <select
                  name="mode"
                  className="w-full border p-3 rounded-lg"
                  value={formData.mode}
                  onChange={handleChange}
                >
                  <option value="">Select Mode</option>
                  <option value="basic">Basic - ₹200</option>
                  <option value="pro">Pro - ₹300</option>
                  <option value="premium">Premium - ₹500</option>
                </select>

              </div>
              {errors.mode && <p className="text-red-500 text-sm mt-1">{errors.mode}</p>}

              {/* QR */}
              <div className="mt-6 text-center">
                <p className="text-gray-700 font-semibold mb-2">Scan UPI QR to Pay</p>

                <div className="flex justify-center">
                  <img
                    src="https://ik.imagekit.io/jfg6wtvbq/QR/qred.jpg"
                    alt="UPI QR"
                    className="w-40 h-auto border rounded-xl shadow-lg bg-white"
                  />
                </div>
              </div>

              {/* Payment ID */}
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700">Payment ID</label>
                <input
                  type="text"
                  name="paymentId"
                  className="w-full border p-3 rounded-lg"
                  placeholder="UPI Transaction ID"
                  value={formData.paymentId}
                  onChange={handleChange}
                />
                {errors.paymentId && <p className="text-red-500 text-sm mt-1">{errors.paymentId}</p>}
              </div>

              {/* Submit */}
              <button
                className="mt-6 w-full bg-[#00B4D8] text-white py-3 rounded-lg font-bold hover:bg-[#0090b1]"
                onClick={handlePaymentSubmit}
              >
                Submit Registration
              </button>

            </div>
          </div>
        </div>
      )}




      <div className="min-h-screen bg-gradient-to-br from-[#CCF6FF] via-[#E0F7FF] to-[#B3E5FF]">
        {/* Hero Banner */}
        <div className="relative w-full h-[500px] md:h-[612px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8] to-[#0077B6] opacity-95"></div>
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&auto=format&fit=crop"
            alt="Events Banner"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center drop-shadow-2xl">
              Events & Workshops
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl leading-relaxed">
              Join our community events, workshops, and networking sessions to accelerate your career growth
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-[#00B4D8] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105">
                  Register Now
                </button>
              </a>

              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#00B4D8] transition-all shadow-2xl">
                View Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-2xl text-center hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-4xl font-bold text-[#00B4D8] mb-2">50+</div>
              <div className="text-gray-600 font-semibold">Events Hosted</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-2xl text-center hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-4xl font-bold text-[#00B4D8] mb-2">3000+</div>
              <div className="text-gray-600 font-semibold">Participants</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-2xl text-center hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-4xl font-bold text-[#00B4D8] mb-2">25+</div>
              <div className="text-gray-600 font-semibold">Partner Venues</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-2xl text-center hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-4xl font-bold text-[#00B4D8] mb-2">4.8/5</div>
              <div className="text-gray-600 font-semibold">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00B4D8] focus:outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {eventTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${activeFilter === type
                      ? 'bg-[#00B4D8] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Upcoming Events</h2>
            <p className="text-gray-600 text-lg">Register now to secure your spot</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredUpcoming.map(event => (
              <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,180,216,0.2)] transition-all duration-500 border border-slate-100 flex flex-col group">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-[#00B4D8] px-5 py-2 rounded-2xl font-black text-xs shadow-xl tracking-widest uppercase">
                    {event.type}
                  </div>
                  <div className="absolute top-6 left-6 bg-[#00B4D8] text-white px-5 py-2 rounded-2xl font-black text-xs shadow-xl tracking-widest uppercase">
                    {event.mode}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-[#00B4D8] transition-colors leading-tight">{event.title}</h3>
                  <p className="text-slate-500 mb-8 line-clamp-2 text-sm font-medium leading-relaxed">{event.description}</p>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 mt-auto">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="p-2 bg-[#F0F9FF] rounded-xl text-[#00B4D8]">
                        <Calendar size={18} />
                      </div>
                      <span className="text-xs font-bold tracking-tight">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="p-2 bg-[#F0F9FF] rounded-xl text-[#00B4D8]">
                        <Clock size={18} />
                      </div>
                      <span className="text-xs font-bold tracking-tight">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 col-span-2">
                      <div className="p-2 bg-[#F0F9FF] rounded-xl text-[#00B4D8]">
                        <MapPin size={18} />
                      </div>
                      <span className="text-xs font-bold truncate tracking-tight">{event.location}</span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-[#00B4D8] hover:bg-[#0077B6] text-white py-4 rounded-2xl font-black transition-all duration-300 shadow-[0_10px_20px_rgba(0,180,216,0.2)] flex items-center justify-center gap-2 active:scale-95"
                    onClick={() => window.open('https://chat.whatsapp.com/Ltvq6MmvFWp8Tlr1U6GSRI', '_blank')}
                  >
                    REGISTER FOR FREE <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="bg-white/60 backdrop-blur-sm py-16 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Past Events</h2>
              <p className="text-gray-600 text-lg">Explore our successful event history</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {filteredPast.map(event => (
                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100 group">
                  <div className="relative h-56 overflow-hidden bg-slate-50">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-slate-800 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {event.type}
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#00B4D8] transition-colors">{event.title}</h3>
                    <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed line-clamp-2">{event.description}</p>

                    <div className="flex flex-col gap-3 mb-6">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                        <Calendar className="text-[#00B4D8]" size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <MapPin className="text-[#00B4D8]" size={14} />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <div className="bg-[#F8FDFF] p-5 rounded-2xl border border-[#E6FAFF]">
                      <div className="font-black text-[#00B4D8] mb-3 text-[10px] uppercase tracking-widest">Highlights</div>
                      <div className="space-y-2">
                        {event.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                            <span className="text-[#00B4D8] px-1.5 py-0.5 bg-[#E6FAFF] rounded text-[8px] font-black">✔</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Partners */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Event Partners</h2>
            <p className="text-gray-600 text-lg">Collaborating with industry leaders</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {['Microsoft', 'ThoughtWorks', 'Amadeus', 'nodopes'].map((partner, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center border-2 border-[#66E5FF]">
                <div className="text-2xl font-bold text-[#00B4D8]">{partner}</div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Never Miss an Event!</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Subscribe to our newsletter to get updates on upcoming workshops, webinars, and networking events
            </p>
            {isSubscribed ? (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 animate-in fade-in zoom-in duration-500">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2">Thank You for Subscribing!</h3>
                <p className="text-white/90">You're on the list. Watch your inbox for exciting updates.</p>
              </div>
            ) : (
              <div className="flex gap-4 justify-center flex-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailSubscription}
                  onChange={(e) => setEmailSubscription(e.target.value)}
                  className="px-6 py-4 rounded-xl text-gray-800 font-semibold w-full md:w-96 focus:outline-none focus:ring-4 focus:ring-white"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-white text-[#00B4D8] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;