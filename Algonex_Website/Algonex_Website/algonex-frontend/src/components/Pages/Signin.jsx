import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, GraduationCap, Briefcase,
  ChevronRight, ChevronLeft, CheckCircle2, Award,
  BookOpen, Rocket, ShieldCheck, MapPinned, Linkedin, Building2
} from 'lucide-react';

const courses = [
  "Python + DSA with AI",
  "Java Full Stack with AI",
  "Data Analyst with AI",
  "Data Science with AI",
  "Cyber Security with AI",
  "Automation Testing with AI",
  "Generative AI & LLM",
  "Machine Learning with AI",
  "Power BI with AI",
  "Advanced Excel with AI"
];



const years = [
  "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028"
];


const educationOptions = {
  "B.Tech": [
    "Computer Science (CSE)",
    "CSE - Artificial Intelligence",
    "CSE - Data Science",
    "CSE - Cyber Security",
    "CSE - IoT",
    "Information Technology (IT)",
    "Electronics & Communication (ECE)",
    "Electrical & Electronics (EEE)",
    "Mechanical Engineering",
    "Civil Engineering",
    "Other Engineering"
  ],
  "Degree": [
    "B.Sc (MPCS - Maths, Physics, CS)",
    "B.Sc (MECS - Maths, Electronics, CS)",
    "B.Sc (MSCS - Maths, Stats, CS)",
    "B.Sc (General)",
    "B.Com (Computers)",
    "B.Com (General)",
    "BBA",
    "BCA",
    "Other Degree"
  ],
  "PG": [
    "MCA",
    "MBA",
    "M.Tech (CSE)",
    "M.Tech (VLSI/Embedded)",
    "M.Sc (Computers)",
    "M.Sc (Maths/Stats)",
    "Other PG"
  ]
};

const Signin = () => {
  const [step, setStep] = useState(0); // 0: Selection, 1: Personal, 2: Education/Pro, 3: Goals
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    education_level: '', // Added for hierarchical selection
    branch: '',
    location: '',
    company: '',
    designation: '',
    course_interested: '',
    employment_status: '', // 'fresher' or 'experienced'
    years_of_experience: '',
    passed_out_year: '',
    linkedin_profile: '',
    referral_source: '',
    availability: '',
    resume_link: '',
    current_year: '',
    looking_for_internship: 'yes',
    agreed_to_terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit number';
      }
    } else if (currentStep === 2) {
      if (formData.employment_status === 'fresher') {
        if (!formData.college.trim()) newErrors.college = 'College name is required';
        if (!formData.branch) newErrors.branch = 'Please select your branch';
        if (!formData.passed_out_year) newErrors.passed_out_year = 'Please select graduation year';
      } else {
        if (!formData.company.trim()) newErrors.company = 'Current organization is required';
        if (!formData.designation.trim()) newErrors.designation = 'Current role is required';
        if (!formData.years_of_experience) newErrors.years_of_experience = 'Please specify experience';
        if (!formData.linkedin_profile.trim()) {
          newErrors.linkedin_profile = 'LinkedIn profile is required';
        }
      }
    } else if (currentStep === 3) {
      if (!formData.course_interested) newErrors.course_interested = 'Please select a course';
      if (!formData.referral_source) newErrors.referral_source = 'How did you hear about us?';
      if (!formData.agreed_to_terms) newErrors.agreed_to_terms = 'Please accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 0) {
      if (!formData.employment_status) {
        setErrors({ employment_status: 'Please select your profile' });
        return;
      }
      setStep(1);
    } else if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

    try {
      const submissionData = {
        ...formData,
        // If experienced, send "N/A" for fresher fields to satisfy backend
        college: formData.college || 'N/A',
        branch: formData.branch || 'N/A',
        passed_out_year: formData.passed_out_year || '2024', // Default valid year

        // If fresher, send "N/A" for experienced fields
        company: formData.company || 'N/A',
        designation: formData.designation || 'N/A',
        years_of_experience: formData.years_of_experience || '0-1', // Default valid code
        linkedin_profile: formData.linkedin_profile || 'https://linkedin.com/in/na',
      };

      const response = await fetch(`${apiUrl}/api/signin/signin/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          resetForm();
          setStep(0);
        }, 5000);
      } else {
        const result = await response.json();
        console.error("Backend Error:", result); // Debug log
        setErrors(result);
        alert(`Registration Failed: ${JSON.stringify(result)}`); // Temporary alert for visibility
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', phone: '', college: '', branch: '', location: '',
      course_interested: '', employment_status: '',
      company: '', designation: '', years_of_experience: '',
      passed_out_year: '', linkedin_profile: '', referral_source: '',
      availability: '', resume_link: '', current_year: '',
      looking_for_internship: 'yes', agreed_to_terms: false
    });
    setErrors({});
    window.scrollTo(0, 0);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {[0, 1, 2, 3].map((num) => (
        <React.Fragment key={num}>
          <div className="relative flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${step >= num ? 'bg-[#00B4D8] border-[#00B4D8] text-white shadow-lg' : 'bg-white border-gray-200 text-gray-400'
              }`}>
              {step > num ? <CheckCircle2 className="w-6 h-6" /> : num + 1}
            </div>
            <span className={`absolute -bottom-8 text-xs font-black uppercase tracking-widest whitespace-nowrap ${step >= num ? 'text-[#00B4D8]' : 'text-gray-400'}`}>
              {num === 0 ? 'Profile' : num === 1 ? 'Personal' : num === 2 ? 'Details' : 'Finish'}
            </span>
          </div>
          {num < 3 && (
            <div className={`w-12 md:w-20 h-1.5 mx-2 rounded-full transition-all duration-500 ${step > num ? 'bg-[#00B4D8]' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0FBFF] py-12 px-4 font-sans selection:bg-[#00B4D8] selection:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter">Scale Your Career</h1>
          <p className="text-xl text-gray-600 font-medium">Join Algonex and master the tools that power the top tech companies.</p>
        </div>

        <StepIndicator />

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-blue-50/50 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-gradient-to-br from-[#00B4D8] via-[#00B4D8] to-[#0077B6] p-10 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-2 tracking-tight">
                {step === 0 ? "Identify Yourself" : step === 1 ? "Essential Details" : step === 2 ? "Your Background" : "Final Step"}
              </h2>
              <p className="text-blue-50 font-bold opacity-80 uppercase tracking-widest text-sm">Step {step + 1} of 4</p>
            </div>
            {/* Abstract Background Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
          </div>

          <div className="p-8 md:p-14">
            {submitSuccess ? (
              <div className="text-center py-24 animate-in fade-in zoom-in duration-700">
                <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-4">You're All Set!</h3>
                <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">Our career experts will contact you within 24 hours to guide you through the next steps.</p>
                <button onClick={() => setStep(0)} className="px-10 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all">Register New Profile</button>
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
                {step === 0 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <button
                        type="button"
                        onClick={() => { setFormData({ ...formData, employment_status: 'fresher' }); setStep(1); }}
                        className={`group p-10 rounded-[2.5rem] border-4 transition-all text-left flex flex-col gap-8 ${formData.employment_status === 'fresher' ? 'border-[#00B4D8] bg-[#00B4D8]/5 shadow-2xl shadow-blue-100 scale-[1.02]' : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                          }`}
                      >
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-300 ${formData.employment_status === 'fresher' ? 'bg-[#00B4D8] text-white rotate-6' : 'bg-white text-gray-400 group-hover:text-[#00B4D8] group-hover:rotate-3'
                          }`}>
                          <GraduationCap size={48} />
                        </div>
                        <div>
                          <h4 className="font-black text-3xl text-gray-900 mb-3">I am a Fresher</h4>
                          <p className="text-gray-500 font-bold leading-relaxed text-lg">Looking to kickstart my tech career and build strong foundations.</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setFormData({ ...formData, employment_status: 'experienced' }); setStep(1); }}
                        className={`group p-10 rounded-[2.5rem] border-4 transition-all text-left flex flex-col gap-8 ${formData.employment_status === 'experienced' ? 'border-[#00B4D8] bg-[#00B4D8]/5 shadow-2xl shadow-blue-100 scale-[1.02]' : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                          }`}
                      >
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-300 ${formData.employment_status === 'experienced' ? 'bg-[#00B4D8] text-white -rotate-6' : 'bg-white text-gray-400 group-hover:text-[#00B4D8] group-hover:-rotate-3'
                          }`}>
                          <Briefcase size={48} />
                        </div>
                        <div>
                          <h4 className="font-black text-3xl text-gray-900 mb-3">I have Experience</h4>
                          <p className="text-gray-500 font-bold leading-relaxed text-lg">Looking to upskill, transition, or master advanced tech stacks.</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid md:grid-cols-2 gap-10 animate-in slide-in-from-right-8 duration-500">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <Award className="text-[#00B4D8]" /> Account Basics
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Saikiran" className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.name ? 'border-red-400 shadow-lg shadow-red-50' : 'border-transparent focus:border-[#00B4D8] focus:shadow-xl focus:shadow-blue-50'}`} />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.email ? 'border-red-400 shadow-lg shadow-red-50' : 'border-transparent focus:border-[#00B4D8] focus:shadow-xl focus:shadow-blue-50'}`} />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 98765 43210" className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.phone ? 'border-red-400 shadow-lg shadow-red-50' : 'border-transparent focus:border-[#00B4D8] focus:shadow-xl focus:shadow-blue-50'}`} />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Current City</label>
                      <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input name="location" value={formData.location} onChange={handleChange} placeholder="Where are you now?" className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-[#00B4D8] transition-all outline-none font-bold" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in slide-in-from-right-8 duration-500 space-y-10">
                    <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                      <BookOpen className="text-[#00B4D8]" /> {formData.employment_status === 'fresher' ? 'Academic Details' : 'Portfolio & Experience'}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10">
                      {formData.employment_status === 'fresher' ? (
                        <>

                          <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">College/University</label>
                            <div className="relative">
                              <MapPinned className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input name="college" value={formData.college} onChange={handleChange} placeholder="Your institute name" className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.college ? 'border-red-400 shadow-lg shadow-red-50' : 'border-transparent focus:border-[#00B4D8] focus:shadow-xl focus:shadow-blue-50'}`} />
                            </div>
                            {errors.college && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.college}</p>}
                          </div>

                          {/* Education Level Dropdown */}
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Education Level</label>
                            <select
                              name="education_level"
                              value={formData.education_level}
                              onChange={(e) => {
                                handleChange(e);
                                setFormData(prev => ({ ...prev, branch: '' })); // Reset branch on level change
                              }}
                              className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold border-transparent focus:border-[#00B4D8]`}
                            >
                              <option value="">Select Level</option>
                              {Object.keys(educationOptions).map(level => (
                                <option key={level} value={level}>{level}</option>
                              ))}
                            </select>
                          </div>

                          {/* Branch/Group Dropdown (Dependent) */}
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Branch / Group</label>
                            <select
                              name="branch"
                              value={formData.branch}
                              onChange={handleChange}
                              className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.branch ? 'border-red-400' : 'border-transparent focus:border-[#00B4D8]'}`}
                              disabled={!formData.education_level}
                            >
                              <option value="">{formData.education_level ? `Select ${formData.education_level === 'Degree' ? 'Group' : 'Branch'}` : 'Select Level First'}</option>
                              {formData.education_level && educationOptions[formData.education_level].map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                            {errors.branch && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.branch}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Graduation Year</label>
                            <select name="passed_out_year" value={formData.passed_out_year} onChange={handleChange} className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.passed_out_year ? 'border-red-400' : 'border-transparent focus:border-[#00B4D8]'}`}>
                              <option value="">Select Year</option>
                              {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            {errors.passed_out_year && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.passed_out_year}</p>}
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Latest Resume / Portfolio (Link)</label>
                            <input name="resume_link" value={formData.resume_link} onChange={handleChange} placeholder="Google Drive or URL" className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-[#00B4D8] transition-all outline-none font-bold" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Current Company</label>
                            <div className="relative">
                              <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Acme Corp" className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.company ? 'border-red-400 shadow-lg shadow-red-50' : 'border-transparent focus:border-[#00B4D8] focus:shadow-xl focus:shadow-blue-50'}`} />
                            </div>
                            {errors.company && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.company}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Designation</label>
                            <input name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Software Engineer" className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.designation ? 'border-red-400 shadow-lg shadow-red-50' : 'border-transparent focus:border-[#00B4D8] focus:shadow-xl focus:shadow-blue-50'}`} />
                            {errors.designation && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.designation}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Years of Experience</label>
                            <select name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.years_of_experience ? 'border-red-400' : 'border-transparent focus:border-[#00B4D8]'}`}>
                              <option value="">Select Depth</option>
                              {[
                                { val: '0-1', label: '0-1 Years' },
                                { val: '1-3', label: '1-3 Years' },
                                { val: '3-5', label: '3-5 Years' },
                                { val: '5-8', label: '5-8 Years' },
                                { val: '8+', label: '8+ Years' }
                              ].map(opt => <option key={opt.val} value={opt.val}>{opt.label}</option>)}
                            </select>
                            {errors.years_of_experience && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.years_of_experience}</p>}
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">LinkedIn Profile</label>
                            <div className="relative">
                              <Linkedin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input name="linkedin_profile" value={formData.linkedin_profile} onChange={handleChange} placeholder="linkedin.com/in/yourname" className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.linkedin_profile ? 'border-red-400 shadow-lg shadow-red-50' : 'border-transparent focus:border-[#00B4D8] focus:shadow-xl focus:shadow-blue-50'}`} />
                            </div>
                            {errors.linkedin_profile && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.linkedin_profile}</p>}
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Latest Resume / Portfolio (Link)</label>
                            <input name="resume_link" value={formData.resume_link} onChange={handleChange} placeholder="Google Drive or URL" className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-[#00B4D8] transition-all outline-none font-bold" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-in slide-in-from-right-8 duration-500 space-y-12">
                    <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                      <Rocket className="text-[#00B4D8]" /> Choose Your Path
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Interested Curriculum</label>
                        <select name="course_interested" value={formData.course_interested} onChange={handleChange} className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.course_interested ? 'border-red-400' : 'border-transparent focus:border-[#00B4D8]'}`}>
                          <option value="">Select a Program</option>
                          {courses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.course_interested && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.course_interested}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">How did you hear about us?</label>
                        <select name="referral_source" value={formData.referral_source} onChange={handleChange} className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-3xl focus:bg-white transition-all outline-none font-bold ${errors.referral_source ? 'border-red-400' : 'border-transparent focus:border-[#00B4D8]'}`}>
                          <option value="">Select Source</option>
                          {['Instagram/Ads', 'LinkedIn/Ads', 'Friend/Referral', 'Campus Event', 'Google Search', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.referral_source && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{errors.referral_source}</p>}
                      </div>

                      <div className="md:col-span-2 p-8 bg-blue-50/50 rounded-[2rem] border-2 border-blue-100 flex items-start gap-5 group cursor-pointer" onClick={() => handleChange({ target: { name: 'agreed_to_terms', type: 'checkbox', checked: !formData.agreed_to_terms } })}>
                        <div className={`mt-1 w-8 h-8 rounded-xl border-4 flex-shrink-0 flex items-center justify-center transition-all ${formData.agreed_to_terms ? 'bg-[#00B4D8] border-[#00B4D8]' : 'bg-white border-gray-200 group-hover:border-[#00B4D8]'}`}>
                          {formData.agreed_to_terms && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-700 leading-relaxed uppercase tracking-widest">Mastery Agreement</p>
                          <p className="text-gray-500 font-bold">I agree to join the Algonex community and receive career updates via WhatsApp/Email.</p>
                          {errors.agreed_to_terms && <p className="text-red-500 text-xs mt-1 font-black underline">{errors.agreed_to_terms}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-10 border-t-2 border-gray-50">
                  {step > 0 ? (
                    <button type="button" onClick={prevStep} className="flex items-center gap-3 text-gray-400 font-bold hover:text-gray-900 transition-all px-6 py-3 rounded-xl hover:bg-gray-100 uppercase tracking-widest text-sm">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button type="button" onClick={nextStep} className="px-12 py-5 bg-[#00B4D8] text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-200 hover:shadow-2xl hover:bg-[#0096B8] transition-all flex items-center gap-3 transform hover:-translate-y-1 active:scale-95 text-lg">
                      Next Step <ChevronRight className="w-6 h-6" />
                    </button>
                  ) : (
                    <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="px-14 py-5 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-200 hover:shadow-2xl transition-all flex items-center gap-3 transform hover:-translate-y-1 disabled:opacity-50 text-xl">
                      {isSubmitting ? "Finalizing..." : "Register Now"}
                      {!isSubmitting && <ShieldCheck className="w-7 h-7" />}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 text-center space-y-6">
          <div className="flex items-center justify-center gap-8 opacity-40 grayscale font-black text-xs uppercase tracking-[0.3em]">
            <span>Industry Validated</span>
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span>Global Standards</span>
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span>Alumni Network</span>
          </div>
          <p className="text-gray-400 font-bold">Need help? <a href="mailto:solutions@algonex.co.in" className="text-[#00B4D8] hover:underline">solutions@algonex.co.in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;