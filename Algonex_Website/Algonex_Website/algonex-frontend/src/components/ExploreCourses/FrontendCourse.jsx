import React, { useState } from 'react';
import RegistrationModal from '../Common/RegistrationModal';

const FrontendCourse = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // People Group Icon Component
  const PeopleGroupIcon = ({ className = "w-12 h-12" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 12.75c1.63 0 3.07.39 4.24.9c1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73c1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm2.78 1.58c-.85-.37-1.79-.58-2.78-.58c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V18H24v-1.57c0-.81-.48-1.53-1.22-1.85zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zM4 8c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm16 0c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3z" />
    </svg>
  );

  // Module Accordion Component
  const ModuleAccordion = ({ title, topics, index, isExpanded, onToggle }) => (
    <div className="border border-gray-200 rounded-md mb-3">
      <button
        className="w-full bg-blue-50 px-4 py-3 text-left flex justify-between items-center hover:bg-blue-100 transition-colors"
        onClick={() => onToggle(index)}
      >
        <h4 className="text-sm font-medium text-black">{title}</h4>
        <span className="text-gray-500 text-lg">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 bg-white">
          <ul className="space-y-2 mt-3">
            {topics.map((topic, topicIndex) => (
              <li key={topicIndex} className="text-gray-700 text-sm flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // FAQ Accordion Component
  const FAQAccordion = ({ question, answer, index, isExpanded, onToggle }) => (
    <div className="border border-gray-200 rounded-md mb-3">
      <button
        className="w-full bg-blue-50 px-4 py-3 text-left flex justify-between items-center hover:bg-blue-100 transition-colors"
        onClick={() => onToggle(index)}
      >
        <p className="text-sm text-gray-700">{question}</p>
        <span className="text-gray-500 text-lg">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 bg-white">
          <p className="text-gray-700 text-sm mt-3 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );

  // Module data
  const modules = [
    {
      title: "MODULE 1 : Web Foundations (HTML5 & CSS3)",
      topics: [
        "Semantic HTML5 tags and modern layouts",
        "CSS3 styling: Flexbox, Grid, and responsive design",
        "Animations, transitions, and transformations",
        "Forms, validation, and user accessibility",
        "CSS Preprocessors like SASS/SCSS overview"
      ]
    },
    {
      title: "MODULE 2 : JavaScript (ES6+)",
      topics: [
        "Core JS concepts: closures, callbacks, promises",
        "Async/Await and Fetch API for data management",
        "DOM manipulation and event handling patterns",
        "OOP in JS, classes, and inheritance",
        "Unit testing basics with Jest/Mocha"
      ]
    },
    {
      title: "MODULE 3 : React.js Mastery",
      topics: [
        "Components, Props, and State management basics",
        "React Hooks: useState, useEffect, useContext",
        "Dynamic routing with React Router",
        "Global state management (Redux Toolkit/Context API)",
        "React Query for server-state and performance"
      ]
    },
    {
      title: "MODULE 4 : Modern Tools & Deployment",
      topics: [
        "Vite, NPM, and project structure optimization",
        "Version control with Git & GitHub workflows",
        "Deployment to Vercel/Netlify with CI/CD",
        "Chrome DevTools and performance profiling",
        "Portfolio building and personal branding"
      ]
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I get started with the online classes?",
      answer: "Immediate access after enrollment. Start with Web Foundations, download the starter project, and join our weekly live sessions for Q&A."
    },
    {
      question: "Where should I search for new frontend references?",
      answer: "Each module links to MDN docs, React official docs, and provides starter templates in our private GitHub organization."
    },
    {
      question: "What are the main checkpoint requirements for finishing?",
      answer: "Complete all 4 modules, deliver 3 projects (static site, JS app, React dashboard), and pass the final technical interview."
    },
    {
      question: "Which libraries will we learn?",
      answer: "Focus on React.js with TailwindCSS, Framer Motion for animations, Redux Toolkit for state, and React Router for navigation."
    }
  ];

  // Interview Questions data
  const interviewQuestions = [
    {
      title: "React reconciliation vs shadow DOM",
      description: "Explain how React's diffing algorithm works to optimize updates versus regular DOM manipulation strategies."
    },
    {
      title: "Closures and Hoisting in JS",
      description: "Analyze how memory and execution context work in JavaScript to enable lexical scoping and variable access."
    },
    {
      title: "Flexbox vs Grid vs Subgrid",
      description: "Compare layout models, use cases for 1D vs 2D alignment, and modern subgrid support for nested layouts."
    },
    {
      title: "Performance optimization (LCP/FID)",
      description: "Outline strategies for improving Core Web Vitals using code splitting, lazy loading, and asset optimization."
    }
  ];

  return (
    <div className="flex-1 relative">
      <div className="bg-gradient-to-r from-[#00667A] to-[#00B4D8] min-h-[60vh] flex items-center pt-8 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-0">
          <div className="md:w-1/2 text-white mb-10 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Frontend <br /> Development
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-xl mb-8 leading-relaxed">
              Design the web of tomorrow. Master modern React, CSS architecture, and high-performance JavaScript to build stunning user experiences for world-class products.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-white text-[#00667A] px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Learning
              </button>

            </div>
          </div>
          <div className="md:w-1/2 flex justify-end relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <img
              src="/frontend-hero-new.png"
              alt="Frontend Development"
              className="max-w-full h-auto rounded-2xl shadow-2xl border-8 border-white/10 relative z-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

                  {/* Stats Cards */}
      <div className="absolute top-[65vh] left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          <div className="flex justify-center gap-0 px-4 relative z-10">
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg border-r border-gray-200">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                Certificate<br />of completion
              </span>
            </div>
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg border-r border-gray-200">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                140<br />downloadable resources
              </span>
            </div>
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg border-r border-gray-200">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                107<br />coding exercises
              </span>
            </div>
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                20+ Projects<br />
                <span className="text-[10px]">Resume & Interview ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>


<div className="bg-[#CCF6FF] pt-48 pb-12">
        <div className="flex justify-center gap-8 mb-8 px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'questions', label: "Interview Question's" },
            { id: 'testimonial', label: 'Testimonial' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`text-sm font-medium pb-2 ${activeTab === tab.id
                ? 'text-black border-b-2 border-black'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mx-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-black">Course Overview</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Learn to design stunning web interfaces with modern React, handle global state efficiently,
                  orchestrate animations, and ship high-performance frontend products aligned to industry benchmarks and user needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-black">Course Objectives</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Build responsive, semantic, and accessible layouts using modern CSS (Flexbox, Grid).
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Master React.js including hooks, routing, and global state management with Redux.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Integrate APIs, manage server-state, and optimize frontend caching for speed.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Implement CI/CD workflows and deploy production-ready code with Vercel/Netlify.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Prepare for technical interviews with dedicated sessions on JS internals and patterns.
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                Become job-ready for frontend roles by delivering 3 real-world portfolio projects and mastering the modern tech stack.
              </p>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-black">Course Curriculum</h2>
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <ModuleAccordion
                    key={index}
                    title={module.title}
                    topics={module.topics}
                    index={index}
                    isExpanded={expandedModule === index}
                    onToggle={(idx) => setExpandedModule(expandedModule === idx ? null : idx)}
                  />
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-black">Common Interview Questions</h3>
                <div className="space-y-3">
                  {interviewQuestions.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-md">
                      <div className="bg-blue-50 px-4 py-3">
                        <h4 className="text-sm font-medium text-black">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-black">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <FAQAccordion
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      index={index}
                      isExpanded={expandedFaq === index}
                      onToggle={(idx) => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-black">Interview Questions</h2>
              <div className="space-y-4">
                {interviewQuestions.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-6 bg-gray-50">
                    <h4 className="text-lg font-semibold text-black mb-2">{item.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonial' && (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold mb-4 text-black">Student Testimonials</h2>
              <p className="text-gray-600 text-sm">Coming soon! Real stories from frontend engineers and developers.</p>
            </div>
          )}
        </div>
      </div>
      <RegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        courseName="Frontend Development"
        syllabusName="Frontend Mastery Syllabus"
      />
    </div>
  );
};

export default FrontendCourse;
