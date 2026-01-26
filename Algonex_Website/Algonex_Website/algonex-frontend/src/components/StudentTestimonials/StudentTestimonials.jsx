import React from 'react';
import { Linkedin, Quote } from 'lucide-react';

/* 
  INSTRUCTIONS FOR USER:
  1. Upload your original images into the 'assets' folder in this directory.
  2. Rename your images to match the filenames in the array below (e.g., student1.jpg, student2.jpg).
  3. The website will automatically pick up and style these images.
*/

const StudentTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Kirankumar Reddy',
      role: 'KMMIPS MCA student',
      program: 'Full Stack Development',
      text: 'The training at Algonex IT Solutions provided me with deep insights into modern tech stacks. Being an MCA student, the practical approach to problem-solving and the industry-ready curriculum have significantly boosted my confidence.',
      imageName: 'kirankumar_reddy.jpg',
      objectPosition: 'top',
      linkedinUrl: 'https://www.linkedin.com/in/l-kirankumar-reddy/'
    },
    {
      id: 2,
      name: 'Karlapoodi Harshith',
      role: 'N.B.K.R, Final-year B.Tech',
      program: 'Artificial Intelligence & Data Science',
      text: 'Grateful to have attended DevRel Meetup #8 at Microsoft, Bengaluru! It was an incredible gathering of developers, tech enthusiasts, and community leaders. The sessions were insightful, covering real-world developer experiences and tools. Loved the energy and innovation.',
      imageName: 'harshith.png',
      objectPosition: 'top',
      linkedinUrl: 'https://www.linkedin.com/in/harshith-karlapoodi/'
    },
    {
      id: 3,
      name: 'Bhavitha Ch',
      role: 'N.B.K.R. Final-year B.Tech Student',
      program: 'Artificial Intelligence & Data Science',
      text: 'Attending the DevRel Meetup in Bengaluru was an incredibly enriching experience that left me both inspired and grateful. Being surrounded by passionate developer advocates reminded me just how powerful collaboration and knowledge-sharing can be.',
      imageName: 'bhavitha.png',
      linkedinUrl: 'https://www.linkedin.com/in/bhavitha-ch/'
    },
    {
      id: 4,
      name: 'Shaik Mizyouna',
      role: 'MJRIST, Final-year B.Tech',
      program: 'Computer Science Student',
      text: 'I had the opportunity to attend an online workshop organized by Algonex focused on Resume creation and website development. The session enhanced my understanding of industry practices and real-world use cases. Thanks to Algonex IT Solutions for this dynamic learning environment.',
      imageName: 'mizyouna.png',
      objectPosition: 'top',
      linkedinUrl: 'https://www.linkedin.com/in/mizyouna-musture-6164432b1/'
    },
    {
      id: 5,
      name: 'Saranya Bellamkonda',
      role: 'NBKR, 3rd year student',
      program: 'Artificial Intelligence & Data Science',
      text: 'Exciting Milestone Achieved! I am thrilled to share that I have successfully completed my Python Industrial Internship at Algonex IT Solutions in Bengaluru. I had the opportunity to work on real-time projects as a Python Developer and gained hands-on experience with modern tech stacks.',
      imageName: 'saranya.jpg',
      objectPosition: 'top',
      linkedinUrl: 'https://www.linkedin.com/in/saranya-bellamkonda/'
    },
    {
      id: 6,
      name: 'Jayanthi Santenna',
      role: 'SVCE, Final-year B.Tech',
      program: 'Artificial Intelligence & Data Science',
      text: "I'm happy to share that I'm starting an internship at Algonex IT Solutions! As an AI & ML undergraduate, my goal is to apply machine learning and data-driven methods to solve real-world problems that impact lives through intelligent systems.",
      imageName: 'jayanthi.jpg',
      objectPosition: 'top',
      linkedinUrl: 'https://www.linkedin.com/in/jayanthi-santenna/'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#E6FAFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00667A] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            What Our Students Say
          </h2>
          <div className="w-24 h-1 bg-[#00B4D8] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real success stories from Algonex IT Solutions explorers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#E6FAFF] rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="flex justify-between items-start mb-6">
                <Quote className="text-[#00B4D8] opacity-20 w-12 h-12" />
                {testimonial.linkedinUrl && (
                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-[#0077B5] text-white rounded-lg hover:bg-[#005E93] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 relative z-20"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 fill-current" />
                  </a>
                )}
              </div>

              <div className="flex-grow">
                <p className="text-gray-700 leading-relaxed italic mb-8 relative z-10">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00B4D8] rounded-full blur-[2px] opacity-40"></div>
                  {/* Using relative path to the public assets folder */}
                  <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden shadow-md relative z-10 bg-gray-100 flex items-center justify-center">
                    <img
                      src={`/assets/testimonials/${testimonial.imageName}`}
                      alt={testimonial.name}
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name) + '&background=00B4D8&color=fff';
                      }}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: testimonial.objectPosition || 'center' }}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-[#00B4D8] font-bold text-sm uppercase text-left">
                    {testimonial.program}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 text-left">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
