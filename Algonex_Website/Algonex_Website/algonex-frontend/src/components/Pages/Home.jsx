import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Clock, BookOpen, MapPin, ArrowRight, ExternalLink, Cpu, Layers, Calendar, Users } from 'lucide-react';
import workshop1 from '../../assets/workshop1.jpg';
import workshop2 from '../../assets/workshop2.jpg';
import workshop3 from '../../assets/workshop3.jpg';
import NodeOpsWorkshop from '../../assets/nodopes-workshop.jpg';
import WorkshopBookingForm from '../Forms/WorkshopBookingForm';
import RegistrationModal from '../Common/RegistrationModal';
import CareerProspects from './CareerProspects';
import LearnFromExperts from './LearnFromExperts';
import FAQ from './FAQ';
import StudentTestimonials from '../StudentTestimonials/StudentTestimonials';


const carouselImages = [
  '/home_hero_bg.png',
  '/banner/new_hands_on_training.png',
  'https://ik.imagekit.io/jfg6wtvbq/Algonex/Banner/banner-2.png?updatedAt=1762692121892',
  'https://ik.imagekit.io/jfg6wtvbq/Algonex/Banner/banner-3.png?updatedAt=1762692122210'
];

const categories = [
  'Trending', 'Frontend', 'Backend', 'Data Science', 'Data Engineer', 'Java', 'Python', 'Excel',
  'Gen AI', 'Cyber Security', 'DevOps', 'Cloud',
  'Machine Learning', 'Power BI', 'Testing', 'Github'
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [isWorkshopFormOpen, setIsWorkshopFormOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  // Enriched data to match the new card design requirements
  const allCourses = [
    {
      title: 'Gen AI & LLM Mastery',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
      level: 'Advanced',
      duration: '3 Months',
      internship: '2 Months',
      tools: '15+ AI Tools',
      projects: '12',
      tags: ['Prompt Eng.', 'RAG', 'LLMs'],
      category: 'Gen AI',
      new: true
    },
    {
      title: 'Full Stack Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      level: 'A-Z Program',
      duration: '6 Months',
      internship: '3 Months',
      tools: '20+ Tools',
      projects: '18',
      tags: ['Python', 'ML', 'Deep Learning'],
      category: 'Data Science',
      new: true
    },
    {
      title: 'MERN Stack Development',
      image: 'https://ik.imagekit.io/ipo22webapp/Picture3.png?updatedAt=1759557480087',
      level: 'Full Stack',
      duration: '5 Months',
      internship: '3 Months',
      tools: '10+ Tools',
      projects: '15',
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'Frontend',
      new: false
    },
    {
      title: 'Cloud & DevOps Architect',
      image: 'https://ik.imagekit.io/ipo22webapp/Picture5.png?updatedAt=1759557479964',
      level: 'Expert',
      duration: '6 Months',
      internship: '2 Months',
      tools: 'AWS/Azure',
      projects: '10',
      tags: ['Docker', 'K8s', 'CI/CD'],
      category: 'DevOps',
      new: true
    },
    {
      title: 'Java Full Stack',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
      level: 'Intermediate',
      duration: '5 Months',
      internship: '2 Months',
      tools: 'Spring Boot',
      projects: '14',
      tags: ['Java', 'Microservices'],
      category: 'Java',
      new: false
    },
    {
      title: 'Power BI & Data Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      level: 'Beginner',
      duration: '2 Months',
      internship: '1 Month',
      tools: 'Power BI',
      projects: '8',
      tags: ['DAX', 'Visualization'],
      category: 'Power BI',
      new: false
    }
  ];

  const filteredCourses = selectedCategory === 'Trending'
    ? allCourses
    : allCourses.filter(course => course.category === selectedCategory || selectedCategory === 'Trending');

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
  };

  const courseSliderSettings = {
    dots: true,
    infinite: filteredCourses.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F9FF]">
      {/* Hero Carousel */}
      <div className="container mx-auto py-6 px-4">
        <Slider {...settings}>
          {carouselImages.map((url, index) => {
            const isNewBanner = url === '/home_hero_bg.png';
            const isWorkshopBanner = url === '/banner/new_hands_on_training.png';

            if (isNewBanner || isWorkshopBanner) {
              return (
                <div key={index} className="px-2 outline-none">
                  {/* Image Container */}
                  <div className="relative h-[45vh] md:h-[60vh] w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
                    <img
                      src={url}
                      alt={`Algonex Banner ${index + 1}`}
                      className="w-full h-full object-contain bg-white"
                    />
                    {/* Buttons Overlay - Bottom Left */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full flex justify-center md:justify-start">
                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => navigate('/signin')}
                          className="bg-[#00B4D8] hover:bg-[#0077B6] text-white px-8 py-3.5 rounded-2xl font-black text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,180,216,0.3)] flex items-center gap-2 active:scale-95"
                        >
                          Register Now <ArrowRight size={20} />
                        </button>
                        <a
                          href="#courses-section"
                          className="bg-white/90 backdrop-blur-md text-[#00B4D8] border-2 border-[#00B4D8]/20 px-8 py-3.5 rounded-2xl font-black text-lg transition-all duration-300 hover:bg-white flex items-center gap-2 shadow-xl active:scale-95"
                        >
                          View Courses
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Existing layout for other slides
            return (
              <div key={index} className="px-2 outline-none">
                <div className="relative h-[45vh] md:h-[60vh] w-full rounded-3xl overflow-hidden bg-slate-900 group shadow-2xl">
                  <img
                    src={url}
                    alt={`Algonex Banner ${index + 1}`}
                    className={`w-full h-full transition-transform duration-1000 group-hover:scale-[1.05] object-contain bg-white`}
                  />

                  {/* Original Overlay for other banners */}
                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end">
                    {!isWorkshopBanner && (
                      <div className="max-w-xl mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Master the Arts of <span className="text-[#00B4D8]">Artificial Intelligence</span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-300">
                          Join the elite 1% and lead the future of technology with our expert-led programs.
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-4 relative z-20">
                      <button
                        onClick={() => setIsEnrollModalOpen(true)}
                        className="bg-[#00B4D8] hover:bg-[#0096B4] text-white px-8 py-3.5 rounded-2xl font-bold transition transform hover:-translate-y-1 shadow-lg shadow-[#00B4D8]/20 flex items-center gap-2"
                      >
                        Enroll Now <ArrowRight size={18} />
                      </button>
                      <a
                        href="#workshops"
                        className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-3.5 rounded-2xl font-bold transition hover:bg-white/20 flex items-center gap-2"
                      >
                        View Workshops
                      </a>
                    </div>
                  </div>

                  {isWorkshopBanner && (
                    <div className="absolute top-8 right-8 px-5 py-2.5 bg-[#00B4D8] text-white text-sm font-black rounded-xl shadow-xl animate-pulse tracking-wider">
                      UPCOMING WORKSHOP
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>



      {/* Modern Card Section matching the visual reference */}
      <div id="courses-section" className="py-16 bg-[#F0F9FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Ready to Reimagine Your Career?
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Kickstart your career with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Internship Card */}
            <div className="relative bg-cover bg-center rounded-2xl overflow-hidden h-[340px] shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ backgroundImage: 'url("https://ik.imagekit.io/ipo22webapp/Picture3.png?updatedAt=1759557480087")' }}>
              <div className="absolute top-4 right-4 bg-[#00B4D8] text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg tracking-widest uppercase">NEW</div>
              <div className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight">Internship</h1>
                  <div className="p-2 bg-[#F0F9FF] rounded-lg">
                    <ExternalLink className="text-[#00B4D8]" size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#66E5FF] text-black text-xs font-semibold rounded-md">Developer</span>
                    <span className="px-2.5 py-1 bg-[#66E5FF] text-black text-xs font-semibold rounded-md">Data Science & AI</span>
                    <span className="text-xs font-bold text-gray-500 self-center">+12</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Duration" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/59690c968648007a2420eabecf38f3fed802c334.png?updatedAt=1759588564115" />
                      2 Months
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Duration" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/59690c968648007a2420eabecf38f3fed802c334.png?updatedAt=1759588564115" />
                      6 Months
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="AI Tools" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/aa811ecebf620f0d8790c489d7fa4019bbe44911.png?updatedAt=1759588563739" />
                      10+ AI Tools
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Enrolled" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/b04dbda97308e590577f869e17e07cbee0ed620d.png?updatedAt=1759588563953" />
                      56
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fullstack Card */}
            <div className="relative bg-cover bg-center rounded-2xl overflow-hidden h-[340px] shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ backgroundImage: 'url("https://ik.imagekit.io/ipo22webapp/Picture4.png?updatedAt=1759557479904")' }}>
              <div className="absolute top-4 right-4 bg-[#00B4D8] text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg tracking-widest uppercase">NEW</div>
              <div className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight">Fullstack</h1>
                  <div className="p-2 bg-[#F0F9FF] rounded-lg">
                    <ExternalLink className="text-[#00B4D8]" size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#66E5FF] text-black text-xs font-semibold rounded-md">Python Fullstack</span>
                    <span className="px-2.5 py-1 bg-[#66E5FF] text-black text-xs font-semibold rounded-md">Data Courses with AI</span>
                    <span className="text-xs font-bold text-gray-500 self-center">+5</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Duration" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/59690c968648007a2420eabecf38f3fed802c334.png?updatedAt=1759588564115" />
                      4 Months Training
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Duration" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/59690c968648007a2420eabecf38f3fed802c334.png?updatedAt=1759588564115" />
                      2 Months Internship
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="AI Tools" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/aa811ecebf620f0d8790c489d7fa4019bbe44911.png?updatedAt=1759588563739" />
                      15+ AI Tools
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Freelance Card */}
            <div className="relative bg-cover bg-center rounded-2xl overflow-hidden h-[340px] shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ backgroundImage: 'url("https://ik.imagekit.io/ipo22webapp/Picture5.png?updatedAt=1759557479964")' }}>
              <div className="absolute top-4 right-4 bg-[#00B4D8] text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg tracking-widest uppercase">NEW</div>
              <div className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight">Freelance</h1>
                  <div className="p-2 bg-[#F0F9FF] rounded-lg">
                    <ExternalLink className="text-[#00B4D8]" size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#66E5FF] text-black text-xs font-semibold rounded-md">Stipend Provided</span>
                    <span className="px-2.5 py-1 bg-[#66E5FF] text-black text-xs font-semibold rounded-md">Fullstack Developer</span>
                    <span className="text-xs font-bold text-gray-500 self-center">+3</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Icon" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/dd633407c004d0747c47c11815a35f98692126fc.png?updatedAt=1759588354353" />
                      Paying for every Project
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Duration" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/59690c968648007a2420eabecf38f3fed802c334.png?updatedAt=1759588564115" />
                      Flexible Timing
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-transparent border border-[#66E5FF] text-black text-[10px] font-semibold rounded-md">
                      <img alt="Enrolled" className="w-3.5 h-3.5" src="https://ik.imagekit.io/ipo22webapp/b04dbda97308e590577f869e17e07cbee0ed620d.png?updatedAt=1759588563953" />
                      12
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 mb-16">
            <Link to="/allcourses">
              <button className="bg-[#00B4D8] text-white px-10 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#0096B4] transition-all duration-300 transform hover:scale-105">
                All Career Accelerators
              </button>
            </Link>
          </div>


        </div>
      </div>

      {/* Why Choose Algonex Section */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>Why Choose <span style={{ fontFamily: "'Comfortaa', cursive" }}>Algonex</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://ik.imagekit.io/ipo22webapp/2cd43e0ca079a01f4b9629bbafe92a56299a4a1f.jpg?updatedAt=1759587051791"
                alt="Solving Problems Matter"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-white text-3xl md:text-5xl font-bold leading-tight block">
                  Solving<br /> Problems<br /> Matter
                </span>
              </div>
            </div>
            <div className="relative h-32 md:h-48 rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://ik.imagekit.io/ipo22webapp/d135d30df2a0df0759bac0d9fb5020d984111047.jpg?updatedAt=1759587110164"
                alt="Algonex Culture"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative h-48 md:h-72 rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://ik.imagekit.io/ipo22webapp/ebb357bc544220fa94b25d4f63fdf7f920b10ccc.jpg?updatedAt=1759587259094"
                alt="Students working"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://ik.imagekit.io/ipo22webapp/b8f8f0002f65d23c6110e87aa3e08f288a3c4d8f.jpg?updatedAt=1759587259315"
                alt="Smarter with Gen AI"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-white text-3xl md:text-4xl font-bold leading-tight block">
                  Smarter <br />With <br />Gen AI
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative h-64 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://ik.imagekit.io/ipo22webapp/7c7342c9eb086b7fba6a4607ce317bb026d07de6.jpg?updatedAt=1759587259013"
                alt="Real Industry Real Connections"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-white text-3xl md:text-4xl font-bold leading-tight block">
                  Real Industry<br /> Real Connections
                </span>
              </div>
            </div>
            <div className="relative h-24 md:h-36 rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://ik.imagekit.io/ipo22webapp/d8c92713d1f16c2a4bc3fe93fb4f9c6d2717425c.jpg?updatedAt=1759587259155"
                alt="Team work"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* NEW Workshops Gallery Section */}
      <div id="workshops" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4">Hands-On learning</h2>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Our Impactful Workshops</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We don't just teach theory. We build products, solve real problems, and create industry-ready talent through intensive, hands-on workshop sessions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Workshop 1 - With Image */}
            <div className="group relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg">
              <img
                src={workshop1}
                alt="Workshop Session 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Workshop Session 1</h3>
                <p className="text-white/80">Hands-on session with industry experts.</p>
              </div>
            </div>

            {/* Workshop 2 - With Image */}
            <div className="group relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg">
              <img
                src={workshop2}
                alt="Workshop Session 2"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Workshop Session 2</h3>
                <p className="text-white/80">Interactive group learning environment.</p>
              </div>
            </div>

            {/* Workshop 3 - With Image */}
            <div className="group relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg">
              <img
                src={workshop3}
                alt="Workshop Session 3"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Workshop Session 3</h3>
                <p className="text-white/80">Community building and networking events.</p>
              </div>
            </div>

            {/* NodeOps Event */}
            <div className="group relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg">
              <img
                src={NodeOpsWorkshop}
                alt="NodeOps Event"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">NodeOps event</h3>
                <p className="text-white/80">Accelerating startups at Draper House.</p>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <button
              onClick={() => setIsWorkshopFormOpen(true)}
              className="bg-[#00B4D8] text-white px-10 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Request a Workshop for Your College
            </button>
          </div>
        </div>
      </div>

      <CareerProspects />
      <LearnFromExperts />
      <StudentTestimonials />
      <FAQ />
      <WorkshopBookingForm isOpen={isWorkshopFormOpen} onClose={() => setIsWorkshopFormOpen(false)} />
      <RegistrationModal isOpen={isEnrollModalOpen} onClose={() => setIsEnrollModalOpen(false)} />
    </div>
  );
};

export default Home;
