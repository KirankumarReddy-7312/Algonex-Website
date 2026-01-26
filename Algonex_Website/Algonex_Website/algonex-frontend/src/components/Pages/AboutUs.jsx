import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, submitted
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    institution: ''
  });
  const navigate = useNavigate();

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const base = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
      const response = await fetch(`${base}/api/demo/book/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('submitted');
      } else {
        const errData = await response.json();
        alert(JSON.stringify(errData));
        setFormStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to book demo. Please try again.");
      setFormStatus('idle');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const stats = [
    { number: '2000+', label: 'Students Trained', icon: '👨‍🎓' },
    { number: '92%', label: 'Placement Rate', icon: '💼' },
    { number: '150+', label: 'Hiring Partners', icon: '🤝' },
    { number: '30+', label: 'Expert Trainers', icon: '👨‍🏫' }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from curriculum design to student support.'
    },
    {
      title: 'Innovation',
      description: 'Continuously updating our courses with latest industry trends and technologies.'
    },
    {
      title: 'Integrity',
      description: 'Building trust through transparent practices and honest communication.'
    },
    {
      title: 'Empowerment',
      description: 'Empowering individuals to achieve their career goals and dreams.'
    },
    {
      title: 'Learning',
      description: 'Fostering a culture of continuous learning and skill development.'
    },
    {
      title: 'Community',
      description: 'Building a supportive community of learners and professionals.'
    }
  ];

  const roadmap = [
    {
      year: 'July 2023',
      title: 'Foundation',
      description: 'Algonex IT Solutions was founded in Bangalore with a vision to bridge the gap between academic education and industry requirements.',
      achievements: ['Established Bangalore center', 'Launched first batch of 30 students', 'Introduced 3 core programs'],
      color: 'from-[#00B4D8] to-[#0096B8]'
    },
    {
      year: 'Q4 2023',
      title: 'Early Growth',
      description: 'Rapid expansion with strong industry partnerships and positive student outcomes.',
      achievements: ['Trained 200+ students', 'Partnership with 20+ companies', 'Achieved 85% placement rate'],
      color: 'from-[#0096B8] to-[#0077B6]'
    },
    {
      year: 'Q1 2024',
      title: 'Program Expansion',
      description: 'Expanded course offerings to meet diverse industry demands.',
      achievements: ['Launched 8 new specialized courses', 'Introduced weekend batches', 'Started corporate training programs'],
      color: 'from-[#0077B6] to-[#005C8E]'
    },
    {
      year: 'Q2 2024',
      title: 'Digital Innovation',
      description: 'Enhanced learning experience with advanced online platform and AI-powered tools.',
      achievements: ['Launched online learning platform', 'Introduced AI-powered career guidance', 'Reached 800+ students'],
      color: 'from-[#66E5FF] to-[#00B4D8]'
    },
    {
      year: 'Q3 2024',
      title: 'Scale & Quality',
      description: 'Focused on maintaining quality while scaling operations across multiple domains.',
      achievements: ['Trained 1500+ students', 'Expanded to 80+ hiring partners', 'Achieved 90% placement rate'],
      color: 'from-[#4dcff0] to-[#00B4D8]'
    },
    {
      year: 'Q4 2024',
      title: 'Excellence Milestone',
      description: 'Achieved significant milestones in student success and industry recognition.',
      achievements: ['2000+ students trained', '92% placement rate', '150+ hiring partners'],
      color: 'from-[#00B4D8] to-[#0077B6]'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Continuing to innovate and expand our impact in career education.',
      achievements: ['Multi-city expansion plans', 'Advanced AI-powered learning', 'International partnerships'],
      color: 'from-[#0096B8] to-[#005C8E]'
    }
  ];

  const team = [
    {
      name: 'Ganesh Pasala',
      role: 'Founder & CEO',
      description: 'Passionate about bridging the gap between education and industry needs',
      linkedin: 'https://www.linkedin.com/in/ganesh-pasala',
      image: '/ganesh-pasala.png'
    },
    {
      name: 'Naveen',
      role: 'Head of Curriculum',
      description: 'Designs industry-relevant courses and keeps content updated with latest trends',
      linkedin: '#'
    },
    {
      name: 'Prajwal',
      role: 'Placement Director',
      description: 'Connects students with career opportunities and guides interview preparation',
      linkedin: '#'
    },
    {
      name: 'Sudarshan',
      role: 'Training Head',
      description: 'Ensures quality training delivery and mentors students throughout their journey',
      linkedin: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CCF6FF] via-[#E0F7FF] to-[#B3E5FF]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#00B4D8] via-[#0096B8] to-[#0077B6] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
            About <span style={{ fontFamily: "'Comfortaa', cursive" }}>Algonex</span> IT Solutions
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Empowering careers through industry-aligned training and comprehensive placement support since July 2023
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#journey" className="bg-white text-[#00B4D8] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Our Journey
            </a>
            <a href="#team" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#00B4D8] transition-all">
              Meet Our Team
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-2xl text-center hover:shadow-3xl transition-all transform hover:scale-105">
              <div className="text-4xl font-bold text-[#00B4D8] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission, Vision, Values Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('mission')}
              className={`flex-1 py-5 px-6 font-bold text-lg transition-all ${activeTab === 'mission'
                ? 'bg-[#00B4D8] text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`flex-1 py-5 px-6 font-bold text-lg transition-all ${activeTab === 'vision'
                ? 'bg-[#00B4D8] text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              Our Vision
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex-1 py-5 px-6 font-bold text-lg transition-all ${activeTab === 'story'
                ? 'bg-[#00B4D8] text-white shadow-lg'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              Our Story
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'mission' && (
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To bridge the gap between academic education and industry requirements by providing practical,
                  hands-on training that prepares students for successful careers in technology and business.
                  We are committed to making quality education accessible, affordable, and relevant to everyone
                  who aspires to excel in their chosen field.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-[#E6FAFF] p-6 rounded-xl border-2 border-[#66E5FF]">
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Quality Education</h4>
                    <p className="text-sm text-gray-600">Industry-relevant curriculum designed by experts</p>
                  </div>
                  <div className="bg-[#E6FAFF] p-6 rounded-xl border-2 border-[#66E5FF]">
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Career Success</h4>
                    <p className="text-sm text-gray-600">Comprehensive placement assistance and career support</p>
                  </div>
                  <div className="bg-[#E6FAFF] p-6 rounded-xl border-2 border-[#66E5FF]">
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Innovation</h4>
                    <p className="text-sm text-gray-600">Latest technologies and teaching methodologies</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To become India's most trusted career transformation platform, empowering professionals
                  to achieve their dreams through world-class training and comprehensive support. We envision
                  a future where every aspiring professional has access to quality education, mentorship, and
                  career opportunities.
                </p>
                <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white p-8 rounded-2xl mt-6 shadow-xl">
                  <h4 className="text-2xl font-bold mb-6">Our 2030 Vision</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">•</span>
                      <span className="text-lg">Train 50,000+ students annually across multiple domains</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">•</span>
                      <span className="text-lg">Expand to 20+ cities across India</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">•</span>
                      <span className="text-lg">Partner with 500+ companies for placement opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">•</span>
                      <span className="text-lg">Launch international programs and certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Story
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Algonex IT Solutions was founded in July 2023 in Bangalore with a clear mission: to bridge the gap
                  between academic education and industry requirements. Our founders, experienced professionals from
                  leading tech companies, recognized that talented graduates were struggling to find jobs due to
                  lack of practical skills and industry exposure.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Starting with just 30 students, we focused on hands-on training, real-world projects, and
                  personalized mentorship. Within our first six months, we achieved an 85% placement rate,
                  validating our approach and methodology.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Today, having trained over 2,000 students with a 92% placement rate, Algonex IT Solutions stands
                  as a testament to quality education and dedicated support. We continue to innovate and adapt
                  to the ever-changing technology landscape.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white/80 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-[#66E5FF] hover:shadow-2xl transition-all hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Roadmap - Connected Path */}
      <div id="journey" className="py-20 bg-gradient-to-br from-[#E0F7FF] to-[#CCF6FF] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg">
              From inception to excellence - tracking our growth milestones
            </p>
          </div>

          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00B4D8] via-[#66E5FF] to-[#0077B6] transform md:-translate-x-1/2 rounded-full"></div>

            {roadmap.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative mb-12 md:mb-16"
                >
                  <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8`}>
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-[#66E5FF] hover:shadow-3xl transition-all hover:scale-105">
                        <div className={`inline-block bg-gradient-to-r ${milestone.color} text-white px-4 py-2 rounded-xl text-sm font-bold mb-4 shadow-lg`}>
                          {milestone.year}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {milestone.description}
                        </p>
                        <div className="bg-[#E6FAFF] p-4 rounded-xl border-2 border-[#66E5FF]">
                          <div className="font-semibold text-[#00B4D8] mb-2">Key Achievements:</div>
                          <div className="space-y-2">
                            {milestone.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#00B4D8] font-bold flex-shrink-0">•</span>
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center Node */}
                    <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-[#00B4D8] flex items-center justify-center shadow-2xl z-10">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${milestone.color}`}></div>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block w-5/12"></div>
                  </div>

                  {/* Connector to next milestone */}
                  {index < roadmap.length - 1 && (
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-16 w-1 h-12 md:h-16 bg-gradient-to-b from-[#66E5FF] to-[#00B4D8] rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Future marker */}
          <div className="text-center mt-12">
            <div className="inline-block bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl">
              The Journey Continues...
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div id="team" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Meet Our Leadership
          </h2>
          <p className="text-gray-600 text-lg">
            Experienced leaders committed to your success
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-[#66E5FF] hover:shadow-3xl transition-all hover:scale-105"
            >
              <div className="h-80 overflow-hidden relative">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-[#00B4D8] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {member.description}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#00B4D8] hover:text-[#0077B6] font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Connect
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span style={{ fontFamily: "'Comfortaa', cursive" }}>Algonex</span> IT Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            What sets us apart in career education
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#66E5FF] hover:shadow-2xl transition-all hover:scale-105">
            <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">
              Industry-Relevant Curriculum
            </h3>
            <p className="text-gray-600">
              Courses designed with industry experts ensuring you learn the most in-demand skills and technologies.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#66E5FF] hover:shadow-2xl transition-all hover:scale-105">
            <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">
              Expert Mentorship
            </h3>
            <p className="text-gray-600">
              Learn from experienced professionals from top companies who understand real-world challenges.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#66E5FF] hover:shadow-2xl transition-all hover:scale-105">
            <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">
              Comprehensive Placement Support
            </h3>
            <p className="text-gray-600">
              Dedicated placement team, resume building, interview preparation, and connections with 150+ hiring partners.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#66E5FF] hover:shadow-2xl transition-all hover:scale-105">
            <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">
              Hands-On Projects
            </h3>
            <p className="text-gray-600">
              Work on real-world projects to build a strong portfolio and demonstrate your skills to employers.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#66E5FF] hover:shadow-2xl transition-all hover:scale-105">
            <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">
              Lifetime Community Access
            </h3>
            <p className="text-gray-600">
              Join our alumni network of 2000+ professionals for continuous learning and networking opportunities.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#66E5FF] hover:shadow-2xl transition-all hover:scale-105">
            <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">
              Flexible Learning Options
            </h3>
            <p className="text-gray-600">
              Choose from online, offline, or hybrid modes. Learn at your own pace with lifetime course access.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Join 2000+ successful professionals who started their journey with Algonex IT Solutions
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/allcourses')}
              className="bg-white text-[#00B4D8] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Courses
            </button>
            <button
              onClick={() => setShowDemoForm(true)}
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#00B4D8] transition-all"
            >
              Book Free Demo
            </button>
          </div>
        </div>
      </div>

      {/* Demo Booking Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => {
                setShowDemoForm(false);
                setFormStatus('idle');
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {formStatus !== 'submitted' ? (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Book a Free Demo
                </h3>
                <p className="text-gray-500 mb-8">Share your details and our experts will get in touch with you shortly.</p>

                <form onSubmit={handleDemoSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">College/Working at</label>
                    <input
                      required
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="Enter your institution or company"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                    />
                  </div>
                  <button
                    disabled={formStatus === 'submitting'}
                    type="submit"
                    className="w-full bg-[#00B4D8] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0096B4] transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 mt-4"
                  >
                    {formStatus === 'submitting' ? 'Booking...' : 'Book Now'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500 w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Thank you!
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Your demo request has been received. Our team will contact you soon.
                </p>
                <button
                  onClick={() => {
                    setShowDemoForm(false);
                    setFormStatus('idle');
                    navigate('/allcourses');
                  }}
                  className="w-full bg-[#00B4D8] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0096B4] transition-all shadow-lg"
                >
                  Explore Courses
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;