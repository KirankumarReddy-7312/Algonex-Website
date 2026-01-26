import React, { useState } from 'react';
import RegistrationModal from '../Common/RegistrationModal';

const JavaCourse = () => {
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

  const modules = [
    {
      title: "MODULE 1 : Core Java Fundamentals",
      topics: [
        "Language basics: variables, types, and operators",
        "Control flow: loops, conditionals, and switch",
        "Arrays and String manipulation in depth",
        "Methods, parameters, and return types",
        "JVM architecture: JDK, JRE, and Bytecode basics"
      ]
    },
    {
      title: "MODULE 2 : OOP & Advanced Java",
      topics: [
        "Classes & objects: encapsulation, inheritance, polymorphism",
        "Abstraction: interfaces and abstract classes",
        "Exception handling: try-catch-finally and custom exceptions",
        "Collections Framework: List, Set, Map, and Queue",
        "Generics and Java Streams (ES8+ equivalents)"
      ]
    },
    {
      title: "MODULE 3 : Backend with Spring Boot",
      topics: [
        "Spring Boot architecture and auto-configuration",
        "Building REST APIs with Spring Web",
        "Database integration with Spring Data JPA/Hibernate",
        "Security foundations with Spring Security",
        "Testing with JUnit and Mockito"
      ]
    },
    {
      title: "MODULE 4 : Modern Java Tools",
      topics: [
        "Maven and Gradle build automation",
        "Version control with Git & GitHub",
        "Containerization with Docker basics",
        "Deployment to cloud platforms (AWS/Azure)",
        "Microservices architecture overview"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I start the online classes?",
      answer: "Get immediate access after enrollment. Begin with Core Java, set up your IDE, and follow the project-based roadmap."
    },
    {
      question: "Where can I find Java references?",
      answer: "Each module links to official Oracle docs, Spring guides, and provides sample code in our private repo."
    },
    {
      question: "What are the graduation requirements?",
      answer: "Complete all 4 modules, build two backend projects (REST API and Full Stack app), and pass the final review."
    },
    {
      question: "Which IDE will we use?",
      answer: "We recommend IntelliJ IDEA (Community or Ultimate) but also provide setup guides for Eclipse and VS Code."
    }
  ];

  const interviewQuestions = [
    {
      title: "JVM Memory Management",
      description: "Explain Heap vs Stack memory, Garbage Collection algorithms, and how to optimize Java performance."
    },
    {
      title: "Interface vs Abstract Class",
      description: "Analyze the design choices, functional differences, and modern use cases in Java 8+ interfaces."
    },
    {
      title: "Spring Boot Auto-configuration",
      description: "Describe how Spring Boot detects dependencies and configures the application context automatically."
    },
    {
      title: "Multithreading & Concurrency",
      description: "Outline the Thread lifecycle, synchronization, volatile keyword, and the Executor framework."
    }
  ];

  return (
    <div className="flex-1 relative">
      <div className="bg-gradient-to-r from-[#00667A] to-[#00B4D8] min-h-[60vh] flex items-center pt-8 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-0">
          <div className="md:w-1/2 text-white mb-10 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Java <br /> Development
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-xl mb-8 leading-relaxed">
              Power the enterprise. Master robust Java architectures, Spring Boot ecosystems, and scalable cloud backends to build heavy-duty software solutions.
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
              src="/java-hero-new.png"
              alt="Java Development"
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
                  Learn to design scalable enterprise systems with modern Java, build microservices with Spring Boot,
                  manage persistent data securely, and deploy resilient backends aligned to global software standards.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-black">Course Objectives</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Master core Java syntax, memory management, and advanced features like Streams.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Build secure, high-performance REST APIs using Spring Boot and Spring Data JPA.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Implement robust data modeling with Hibernate and manage SQL databases efficiently.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Automate builds with Maven/Gradle and deploy containerized services with Docker.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Deep dive into OOP principles and design patterns for clean, maintainable code.
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                Become job-ready for Java backend roles by delivering real enterprise-grade projects and mastering the modern ecosystem.
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
              <p className="text-gray-600 text-sm">Coming soon! Stories from developers who scaled their careers with Java.</p>
            </div>
          )}
        </div>
      </div>
      <RegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        courseName="Java Development"
        syllabusName="Java Enterprise Syllabus"
      />
    </div>
  );
};

export default JavaCourse;
