import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, Clock, BookOpen } from 'lucide-react';
import { Link } from "react-router-dom";


const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [levelFilter, setLevelFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const scrollRef = useRef(null);
  const categories = [
    'All Courses', 'Trending', 'Frontend', 'Backend', 'Data Engineer', 'Java', 'Python',
    'Gen AI', 'Data Science', 'Cyber Security', 'DevOps', 'Cloud',
    'Machine Learning', 'Power BI'
  ];

  const careerAccelerators = [
    {
      title: 'GEN AI MASTERY',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
      tags: ['LLMs', 'Prompt Engineering'],
      moreCount: 15,
      level: 'Intermediate',
      duration: '3 Months',
      aiTools: '20+ AI Tools',
      modules: '24',
      category: 'Gen AI',
      rating: '4.9',
      students: '12.5K'
    },
    {
      title: 'DATA SCIENCE PRO',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      tags: ['Python', 'Machine Learning'],
      moreCount: 14,
      level: 'Advanced',
      duration: '6 Months',
      aiTools: '15+ AI Tools',
      modules: '48',
      category: 'Data Science',
      rating: '4.8',
      students: '16.2K'
    },
    {
      title: 'MASTERING EXCEL',
      image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&auto=format&fit=crop', // Valid Data/Excel image
      tags: ['Data Viz', 'Dashboards'],
      moreCount: 12,
      level: 'Beginner',
      duration: '4 Weeks',
      aiTools: 'Automation',
      modules: '16',
      category: 'Excel',
      rating: '4.7',
      students: '21.3K'
    },
    {
      title: 'MERN STACK',
      image: 'https://ik.imagekit.io/ipo22webapp/Picture3.png?updatedAt=1759557480087',
      tags: ['MongoDB', 'Express', 'React'],
      moreCount: 18,
      level: 'Intermediate',
      duration: '7 Months',
      aiTools: '12+ AI Tools',
      modules: '64',
      category: 'Frontend',
      rating: '4.8',
      students: '19.8K'
    },
    {
      title: 'MEAN STACK',
      image: 'https://ik.imagekit.io/ipo22webapp/Picture4.png?updatedAt=1759557479904',
      tags: ['MongoDB', 'Angular'],
      moreCount: 16,
      level: 'Intermediate',
      duration: '7 Months',
      aiTools: '12+ AI Tools',
      modules: '62',
      category: 'Frontend',
      rating: '4.7',
      students: '15.9K'
    },
    {
      title: 'DEVOPS ENGINEER',
      image: 'https://ik.imagekit.io/ipo22webapp/Picture5.png?updatedAt=1759557479964',
      tags: ['Docker', 'Kubernetes', 'CI/CD'],
      moreCount: 20,
      level: 'Advanced',
      duration: '8 Months',
      aiTools: '15+ AI Tools',
      modules: '72',
      category: 'DevOps',
      rating: '4.9',
      students: '14.7K'
    },
    {
      title: 'CLOUD ARCHITECT',
      image: 'https://ik.imagekit.io/ipo22webapp/Picture3.png?updatedAt=1759557480087',
      tags: ['AWS', 'Azure', 'GCP'],
      moreCount: 22,
      level: 'Advanced',
      duration: '9 Months',
      aiTools: '15+ AI Tools',
      modules: '78',
      category: 'Cloud',
      rating: '4.8',
      students: '17.5K'
    },
    {
      title: 'AI/ML ENGINEER',
      image: 'https://ik.imagekit.io/jfg6wtvbq/Algonex/ai_tools.png?updatedAt=1762691802536',
      tags: ['TensorFlow', 'PyTorch'],
      moreCount: 25,
      level: 'Advanced',
      duration: '10 Months',
      aiTools: '20+ AI Tools',
      modules: '85',
      category: 'Machine Learning',
      rating: '4.9',
      students: '22.1K'
    },
    {
      title: 'CYBER SECURITY',
      image: 'https://ik.imagekit.io/ipo22webapp/Picture5.png?updatedAt=1759557479964',
      tags: ['Ethical Hacking', 'Penetration'],
      moreCount: 19,
      level: 'Intermediate',
      duration: '8 Months',
      aiTools: '12+ AI Tools',
      modules: '68',
      category: 'Cyber Security',
      rating: '4.7',
      students: '13.8K'
    }
  ];

  // Ensure fallback courses have a path
  const coursesWithPaths = careerAccelerators.map(course => ({
    ...course,
    path: `/explore-course/${course.category.toLowerCase().replace(/ /g, '-')}`
  }));

  const [courses, setCourses] = useState(coursesWithPaths);

  // Still fetch from API to update if available
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const base = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
        const response = await fetch(`${base}/api/courses`);
        const result = await response.json();

        if (result.data && result.data.length > 0) {
          const updatedCourses = result.data.map(course => ({
            ...course,
            path: `/explore-course/${course.category.toLowerCase().replace(/ /g, '-')}`
          }));
          setCourses(updatedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses, using fallback data:", error);
      }
    };

    fetchCourses();
  }, []);

  const allCourses = [...courses];

  const isPausedRef = useRef(false);

  // Auto-scroll for trending section - FASTER SPEED (15ms)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isPausedRef.current) {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1;
          }
        }
      }, 15); // Increased speed
    };

    startScrolling();
    return () => clearInterval(scrollInterval);
  }, []);

  // Filter and sort function
  const getFilteredAndSortedCourses = () => {
    let filtered = [...allCourses];

    // Category filter
    if (selectedCategory !== 'All Courses') {
      if (selectedCategory === 'Trending') {
        filtered = filtered.filter(course => course.trending === true);
      } else {
        filtered = filtered.filter(course =>
          (course.category && course.category === selectedCategory) ||
          course.title.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }
    }

    // Search filter - searches across title, category, tags, and level
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => {
        const titleMatch = course.title.toLowerCase().includes(query);
        const categoryMatch = course.category?.toLowerCase().includes(query);
        const levelMatch = course.level?.toLowerCase().includes(query);
        const tagsMatch = course.tags?.some(tag => tag.toLowerCase().includes(query));

        return titleMatch || categoryMatch || levelMatch || tagsMatch;
      });
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(course =>
        course.level?.toLowerCase() === levelFilter.toLowerCase()
      );
    }

    // Duration filter
    if (durationFilter !== 'all') {
      filtered = filtered.filter(course => {
        const duration = parseInt(course.duration);
        if (durationFilter === 'short') return duration <= 5;
        if (durationFilter === 'medium') return duration > 5 && duration <= 8;
        if (durationFilter === 'long') return duration > 8;
        return true;
      });
    }

    // Sort
    if (sortBy === 'a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'duration-asc') {
      filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (sortBy === 'duration-desc') {
      filtered.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => parseFloat(b.students) - parseFloat(a.students));
    }

    return filtered;
  };

  const filteredCourses = getFilteredAndSortedCourses();
  // Ensure we have some items for scrolling even if nothing is marked 'trending' in data
  const trendingCoursesList = allCourses.filter(course => course.trending);
  const trendingItems = trendingCoursesList.length > 0 ? trendingCoursesList : allCourses.slice(0, 5);
  const duplicatedTrending = [...trendingItems, ...trendingItems, ...trendingItems]; // Triple duplication for smoother infinite scroll

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setLevelFilter('all');
    setDurationFilter('all');
    setSelectedCategory('All Courses');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-r from-[#00667A] to-[#00B4D8] min-h-[50vh] flex items-center pt-8 pb-24 relative">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Level Up <br /> Your Skills
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-xl mb-8 leading-relaxed">
              Explore our professional industry-certified courses and take your career to the next level with hands-on training and expert mentorship.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#explore" className="bg-white text-[#00667A] px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300 min-w-[180px] text-center">
                Explore All
              </a>
              <Link to="/aboutus" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 min-w-[180px] text-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop"
              alt="Professional Learning"
              className="max-w-full h-auto rounded-2xl shadow-2xl border-8 border-white/10 relative z-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-30 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 rounded-xl transition-all outline-none text-gray-700 font-medium"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-6 py-3.5 bg-gray-50 border border-gray-200 focus:border-[#00B4D8] rounded-xl transition-all outline-none font-semibold text-gray-600 appearance-none cursor-pointer"
                >
                  <option value="default">Sort By</option>
                  <option value="popular">Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide no-scrollbar">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 border ${selectedCategory === category
                  ? 'bg-[#00B4D8] border-[#00B4D8] text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div id="explore" className="flex justify-between items-end mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {selectedCategory === 'All Courses' ? 'Explore Courses' : `${selectedCategory} Courses`}
          </h2>
          <p className="text-slate-500 font-medium hidden md:block">
            Showing {filteredCourses.length} courses
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    onError={(e) => {
                      if (course.title.toLowerCase().includes('excel')) {
                        e.target.src = 'https://images.unsplash.com/photo-1599658880436-c61792e70672?w=800&auto=format&fit=crop';
                      } else {
                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop';
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.trending && (
                      <span className="bg-rose-500 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide shadow-sm">
                        Trending
                      </span>
                    )}
                    <span className="bg-white/95 backdrop-blur text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide shadow-sm">
                      {course.level || 'All Levels'}
                    </span>
                  </div>

                  {course.rating && (
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <span className="text-amber-400 text-xs text-[10px]">★</span>
                      <span className="font-bold text-slate-800 text-xs">{course.rating}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-slate-800 mb-3 line-clamp-1">{course.title}</h2>

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                      <Clock size={14} className="text-[#00B4D8]" />
                      <span className="text-xs font-bold tracking-tight">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                      <BookOpen size={14} className="text-[#00B4D8]" />
                      <span className="text-xs font-bold tracking-tight">{course.modules} Modules</span>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Link to="/signin" className="flex-[2]">
                      <button className="w-full py-2.5 bg-[#00B4D8] hover:bg-[#0096B8] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#00B4D8]/20 active:scale-95">
                        Enroll Now
                      </button>
                    </Link>
                    <Link to={course.path || '#'} className="flex-1">
                      <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-slate-600 rounded-xl transition-all border border-gray-200 text-sm font-bold active:scale-95">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No results found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Trending Courses Auto-Scroll Section */}
      <div className="w-full bg-slate-900 py-16 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Top Trending Now</h2>
          <p className="text-slate-400">Accelerate your career with the most in-demand skills in the tech industry today.</p>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
          className="flex gap-6 overflow-x-hidden pb-4"
          style={{ scrollBehavior: 'auto' }} // auto for smooth continuous programmatic scroll
        >
          {duplicatedTrending.map((course, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="h-40 relative">
                <img
                  src={course.image}
                  alt={course.title}
                  onError={(e) => {
                    if (course.title.toLowerCase().includes('excel')) {
                      e.target.src = 'https://images.unsplash.com/photo-1599658880436-c61792e70672?w=800&auto=format&fit=crop';
                    } else {
                      e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white font-bold text-sm tracking-wide">{course.category}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-1">{course.title}</h3>
                <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                  <span>{course.duration}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">★ {course.rating}</span>
                </div>
                <Link to="/signin">
                  <button className="w-full py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-[#00B4D8] transition-colors">
                    Enroll Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;