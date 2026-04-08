
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Briefcase, Clock, Filter, ArrowRight, FileText, Monitor, Award, ChevronDown, Check, Plus, Edit, Lock, X, Save, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareerUpdates = () => {
    const [selectedType, setSelectedType] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);
    const locDropdownRef = useRef(null);

    // Dynamic Data States
    const [apiJobs, setApiJobs] = useState([]);
    const [staticJobs] = useState([]);

    // Admin/Modal States
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [showJobModal, setShowJobModal] = useState(false);
    const [editingJob, setEditingJob] = useState(null); // null means adding new
    const [jobFormErrors, setJobFormErrors] = useState({});

    const [jobFormData, setJobFormData] = useState({
        company: '', role: '', location: '', deadline: '',
        tags: '', type: 'Full-Time', batch_year: '', logo_url: '', apply_link: '',
        experience: 'Fresher', salary_range: ''
    });

    const API_BASE = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

    // Fetch Jobs
    const fetchJobs = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/career/jobs/`);
            if (res.ok) {
                const data = await res.json();
                setApiJobs(data);
            }
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        }
    }, [API_BASE]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Combine Jobs
    const allOpportunities = [...apiJobs, ...staticJobs];

    // Close location dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (locDropdownRef.current && !locDropdownRef.current.contains(event.target)) {
                setIsLocDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // --- Admin Logic ---
    const handleAdminClick = () => {
        if (isAdminMode) {
            setEditingJob(null);
            resetJobForm();
            setShowJobModal(true);
        } else {
            setShowPasswordModal(true);
            setEditingJob(null);
        }
    };

    const handleEditClick = (job) => {
        // Only allow editing API jobs (real dynamic ones), static ones are hardcoded
        if (typeof job.id === 'string' && job.id.startsWith('static')) {
            alert("Cannot edit static demo jobs. Add a new job to test editing.");
            return;
        }

        if (isAdminMode) {
            setEditingJob(job);
            setJobFormData({
                company: job.company,
                role: job.role,
                location: job.location,
                deadline: job.deadline,
                tags: job.tags,
                type: job.type,
                batch_year: job.batch_year,
                logo_url: job.logo_url,
                apply_link: job.apply_link,
                experience: job.experience || 'Fresher',
                salary_range: job.salary_range || ''
            });
            setShowJobModal(true);
        } else {
            // Need password first
            setEditingJob(job);
            setShowPasswordModal(true);
        }
    };

    const verifyPassword = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/career/verify-admin/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsAdminMode(true);
                setShowPasswordModal(false);
                setPasswordInput('');
                setPasswordError('');

                // Proceed to what triggered it
                if (editingJob) {
                    setJobFormData({
                        company: editingJob.company,
                        role: editingJob.role,
                        location: editingJob.location,
                        deadline: editingJob.deadline,
                        tags: editingJob.tags,
                        type: editingJob.type,
                        batch_year: editingJob.batch_year,
                        logo_url: editingJob.logo_url,
                        apply_link: editingJob.apply_link,
                        experience: editingJob.experience || 'Fresher',
                        salary_range: editingJob.salary_range || ''
                    });
                    setShowJobModal(true);
                } else {
                    resetJobForm();
                    setShowJobModal(true);
                }
            } else {
                setPasswordError("Incorrect password");
            }
        } catch (err) {
            console.error(err);
            setPasswordError("Verification failed");
        }
    };

    const handleJobSubmit = async () => {
        // Validation
        const errors = {};
        if (!jobFormData.company) errors.company = "Required";
        if (!jobFormData.role) errors.role = "Required";
        if (!jobFormData.apply_link) errors.apply_link = "Required";

        if (Object.keys(errors).length > 0) {
            setJobFormErrors(errors);
            return;
        }

        try {
            const url = editingJob
                ? `${API_BASE}/api/career/jobs/${editingJob.id}/`
                : `${API_BASE}/api/career/jobs/`;

            const method = editingJob ? 'PUT' : 'POST';

            const payload = {
                ...jobFormData,
                deadline: jobFormData.deadline || null,
                posted_date: new Date().toISOString().split('T')[0] // Auto set posted date
            };

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowJobModal(false);
                fetchJobs(); // Refresh list
                resetJobForm();
            } else {
                alert("Failed to save job");
            }
        } catch (err) {
            console.error("Save error", err);
        }
    };

    const resetJobForm = () => {
        setJobFormData({
            company: '', role: '', location: '', deadline: '',
            tags: '', type: 'Full-Time', batch_year: '', logo_url: '', apply_link: '',
            experience: 'Fresher', salary_range: ''
        });
        setJobFormErrors({});
    };

    // --- Helper Functions ---
    const isDeadlineClose = (dateStr) => {
        if (!dateStr) return false;
        const deadline = new Date(dateStr);
        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 5; // Close if within 5 days
    };

    const isExpired = (dateStr) => {
        if (!dateStr) return false;
        const deadline = new Date(dateStr);
        const today = new Date();
        // Compare just dates to be safe
        today.setHours(0, 0, 0, 0);
        return deadline < today;
    };

    // --- Filter Logic ---
    const filterTypes = ['All', 'Full-Time', 'Internship', 'Off-Campus Drive', 'Hiring Challenge'];
    const filterYears = ['All', '2022', '2023', '2024', '2025', '2026', '2027'];
    const locationOptions = ['Remote', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Chennai', 'Delhi NCR'];

    const toggleLocation = (loc) => {
        if (selectedLocations.includes(loc)) {
            setSelectedLocations(selectedLocations.filter(l => l !== loc));
        } else {
            setSelectedLocations([...selectedLocations, loc]);
        }
    };

    const filteredOpps = allOpportunities.filter(op => {
        const typeMatch = selectedType === 'All' || op.type === selectedType;
        // Updated year logic to check if string contains the filter year
        const yearMatch = selectedYear === 'All' || (op.year && op.year.includes(selectedYear)) || (op.batch_year && op.batch_year.includes(selectedYear));
        const locationMatch = selectedLocations.length === 0 || selectedLocations.some(sel => op.location && op.location.includes(sel));
        return typeMatch && yearMatch && locationMatch;
    });

    const resetFilters = () => {
        setSelectedType('All');
        setSelectedYear('All');
        setSelectedLocations([]);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-['Outfit'] py-8">
            <div className="container mx-auto px-4 md:px-6">

                {/* --- Top Bar with Admin Button --- */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={handleAdminClick}
                        className="flex items-center gap-2 bg-[#00B4D8] text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-[#0096B4] transition-all"
                    >
                        <Plus size={18} /> Add New Job
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* --- Sidebar (Filters & Quick Links) --- */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        {/* Filters Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Filter size={18} className="text-[#00B4D8]" /> Filters</h3>
                                <button onClick={resetFilters} className="text-xs font-bold text-[#00B4D8] hover:underline">Reset</button>
                            </div>
                            <div className="space-y-6">
                                {/* Type Filter */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Opportunity Type</h4>
                                    <div className="relative">
                                        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] appearance-none cursor-pointer hover:bg-slate-100 transition-colors">
                                            {filterTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                                    </div>
                                </div>
                                {/* Year Filter */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Year</h4>
                                    <div className="relative">
                                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] appearance-none cursor-pointer hover:bg-slate-100 transition-colors">
                                            {filterYears.map(year => <option key={year} value={year}>{year}</option>)}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                                    </div>
                                </div>
                                {/* Location Filter */}
                                <div className="space-y-2" ref={locDropdownRef}>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</h4>
                                    <div className="relative">
                                        <button onClick={() => setIsLocDropdownOpen(!isLocDropdownOpen)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 flex justify-between items-center hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-[#00B4D8]">
                                            <span className="truncate">{selectedLocations.length === 0 ? 'All Locations' : `${selectedLocations.length} selected`}</span>
                                            <ChevronDown size={16} className={`text-slate-500 transition-transform ${isLocDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isLocDropdownOpen && (
                                            <div className="absolute z-10 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl p-2 max-h-64 overflow-y-auto">
                                                <div className="space-y-1">
                                                    {locationOptions.map(loc => {
                                                        const isSelected = selectedLocations.includes(loc);
                                                        return (
                                                            <div key={loc} onClick={() => toggleLocation(loc)} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#00B4D8] border-[#00B4D8]' : 'border-slate-300 bg-white'}`}>
                                                                    {isSelected && <Check size={12} className="text-white" />}
                                                                </div>
                                                                <span className={`text-sm ${isSelected ? 'font-bold text-[#00B4D8]' : 'font-medium text-slate-600'}`}>{loc}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {selectedLocations.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {selectedLocations.map(loc => (
                                                <span key={loc} className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-50 text-[#00B4D8] text-xs font-bold rounded-md">
                                                    {loc} <button onClick={(e) => { e.stopPropagation(); toggleLocation(loc); }} className="hover:text-cyan-700">×</button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Links</h4>
                            <div className="space-y-3">
                                <Link to="/resume-templates" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform"><FileText size={16} /></div>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors">Resume Templates</span>
                                </Link>
                                <Link to="/interview-prep" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Monitor size={16} /></div>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-purple-600 transition-colors">Interview Prep</span>
                                </Link>
                                <Link to="/mock-tests" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Award size={16} /></div>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">Mock Tests</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* --- Main Feed --- */}
                    <div className="w-full lg:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">Latest Opportunities</h2>
                            <span className="bg-white px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 shadow-sm border border-slate-200">
                                Showing {filteredOpps.length} results
                            </span>
                        </div>

                        <div className="space-y-6">
                            {filteredOpps.length > 0 ? (
                                filteredOpps.map(job => {
                                    const expired = isExpired(job.deadline);
                                    const nearDeadline = isDeadlineClose(job.deadline);

                                    return (
                                        <div key={job.id} className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border hover:shadow-lg transition-all border-l-4 group relative ${expired ? 'border-l-gray-300 opacity-70' : 'border-slate-100 hover:border-l-[#00B4D8]'}`}>

                                            {/* Badges */}
                                            <div className="flex gap-2 mb-4 flex-wrap">
                                                {!expired && job.isNew && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">New</span>}
                                                {expired ? (
                                                    <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Closed</span>
                                                ) : (
                                                    nearDeadline && <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1"><AlertCircle size={10} /> Closing Soon</span>
                                                )}
                                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">{job.type}</span>
                                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">{job.year || job.batch_year} Batch</span>
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                                <div className="w-16 h-16 rounded-xl bg-white p-2 border border-slate-100 shadow-sm flex-shrink-0">
                                                    <img src={job.logo_url || job.logo || "https://cdn-icons-png.flaticon.com/512/732/732221.png"} alt={job.company} className="w-full h-full object-contain" />
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#00B4D8] transition-colors">{job.role}</h3>
                                                            <div className="flex flex-wrap items-center gap-3 text-slate-500 text-sm mb-3">
                                                                <div className="flex items-center gap-1"><Briefcase size={14} /> <span className="font-semibold text-slate-700">{job.company}</span></div>
                                                                <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
                                                                <div className="flex items-center gap-1"><MapPin size={14} /> {job.location}</div>
                                                                {/* Experience & Salary Display */}
                                                                <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
                                                                <div className="flex items-center gap-1"><Award size={14} /> {job.experience || 'Fresher'}</div>
                                                                {job.salary_range && (
                                                                    <>
                                                                        <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
                                                                        <div className="flex items-center gap-1 text-emerald-600 font-bold">₹ {job.salary_range}</div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className="text-xs font-medium text-slate-400 hidden md:block">Posted {job.posted_date || job.posted}</span>
                                                            <button
                                                                onClick={() => handleEditClick(job)}
                                                                className="text-slate-400 hover:text-[#00B4D8] p-1 rounded-full hover:bg-slate-50 transition-colors"
                                                                title="Edit Job"
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {typeof job.tags === 'string'
                                                            ? job.tags.split(',').map(t => <span key={t} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">{t.trim()}</span>)
                                                            : job.tags.map(t => <span key={t} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">{t}</span>)
                                                        }
                                                    </div>

                                                    {/* Action Bar */}
                                                    <div className="flex items-center justify-between border-t border-slate-50 pt-5 mt-2">
                                                        <div className="text-xs font-medium text-slate-500">
                                                            {job.deadline && (
                                                                <>
                                                                    <span className="text-xs font-bold text-slate-400 block mb-0.5">DEADLINE</span>
                                                                    <span className={`flex items-center gap-1 ${expired ? 'text-gray-400 line-through' : (nearDeadline ? 'text-red-500 font-bold' : 'text-slate-600')}`}>
                                                                        <Clock size={12} /> {job.deadline}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() => window.open(job.apply_link || job.link, '_blank')}
                                                                disabled={expired}
                                                                className={`px-6 py-2.5 rounded-lg text-white font-bold text-sm shadow-md flex items-center gap-2 ${expired ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#00B4D8] hover:bg-[#0096B4] hover:shadow-lg transition-all'}`}
                                                            >
                                                                {expired ? 'Applications Closed' : 'Apply Now'} <ArrowRight size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400"><Filter size={24} /></div>
                                    <h3 className="text-lg font-bold text-slate-800">No opportunities found</h3>
                                    <p className="text-slate-500 text-sm mt-1">Try adjusting your filters to see more results</p>
                                    <button onClick={resetFilters} className="mt-4 text-[#00B4D8] font-bold text-sm hover:underline">Clear all filters</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Modals --- */}

            {/* Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={20} /></button>
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Admin Access Required</h3>
                            <p className="text-sm text-slate-500">Please enter the admin password to continue.</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="password"
                                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00B4D8] outline-none"
                                placeholder="Enter password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                autoFocus
                            />
                            {passwordError && <p className="text-red-500 text-xs text-center">{passwordError}</p>}
                            <button
                                onClick={verifyPassword}
                                className="w-full bg-[#00B4D8] text-white py-2.5 rounded-lg font-bold hover:bg-[#0096B4] transition-colors"
                            >
                                Verify & Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Job Form Modal */}
            {showJobModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm overflow-y-auto py-8">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto">
                        <button onClick={() => setShowJobModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={20} /></button>

                        <div className="mb-6 border-b pb-4">
                            <h3 className="text-2xl font-bold text-slate-800">{editingJob ? 'Edit Job' : 'Add New Job'}</h3>
                            <p className="text-sm text-slate-500">Fill in the details for the new career opportunity.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Role */}
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Role</label>
                                <input type="text" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="e.g. Senior React Developer"
                                    value={jobFormData.role} onChange={e => setJobFormData({ ...jobFormData, role: e.target.value })}
                                />
                                {jobFormErrors.role && <p className="text-red-500 text-xs mt-1">{jobFormErrors.role}</p>}
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
                                <input type="text" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="e.g. Amazon"
                                    value={jobFormData.company} onChange={e => setJobFormData({ ...jobFormData, company: e.target.value })}
                                />
                                {jobFormErrors.company && <p className="text-red-500 text-xs mt-1">{jobFormErrors.company}</p>}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                                <input type="text" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="e.g. Bangalore"
                                    value={jobFormData.location} onChange={e => setJobFormData({ ...jobFormData, location: e.target.value })}
                                />
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Experience</label>
                                <input type="text" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="e.g. Fresher, 1-2 Years"
                                    value={jobFormData.experience} onChange={e => setJobFormData({ ...jobFormData, experience: e.target.value })}
                                />
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Salary Range</label>
                                <input type="text" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="e.g. 6-10 LPA"
                                    value={jobFormData.salary_range} onChange={e => setJobFormData({ ...jobFormData, salary_range: e.target.value })}
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                                <select className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]"
                                    value={jobFormData.type} onChange={e => setJobFormData({ ...jobFormData, type: e.target.value })}
                                >
                                    {filterTypes.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            {/* Batch Year */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Batch(es)</label>
                                <input type="text" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]"
                                    placeholder="e.g. 2023, 2024, 2025"
                                    value={jobFormData.batch_year} onChange={e => setJobFormData({ ...jobFormData, batch_year: e.target.value })}
                                />
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deadline Date (Optional)</label>
                                <input type="date" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]"
                                    value={jobFormData.deadline} onChange={e => setJobFormData({ ...jobFormData, deadline: e.target.value })}
                                />
                            </div>

                            {/* Tags */}
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Skills / Frameworks (comma separated)</label>
                                <input type="text" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="e.g. Java, Python, SQL"
                                    value={jobFormData.tags} onChange={e => setJobFormData({ ...jobFormData, tags: e.target.value })}
                                />
                            </div>

                            {/* Apply Link */}
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Application URL</label>
                                <input type="url" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="https://..."
                                    value={jobFormData.apply_link} onChange={e => setJobFormData({ ...jobFormData, apply_link: e.target.value })}
                                />
                                {jobFormErrors.apply_link && <p className="text-red-500 text-xs mt-1">{jobFormErrors.apply_link}</p>}
                            </div>

                            {/* Logo URL */}
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Logo URL (Optional)</label>
                                <input type="url" className="w-full border p-2.5 rounded-lg outline-none focus:border-[#00B4D8]" placeholder="https://..."
                                    value={jobFormData.logo_url} onChange={e => setJobFormData({ ...jobFormData, logo_url: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleJobSubmit}
                            className="mt-8 w-full bg-[#00B4D8] text-white py-3 rounded-lg font-bold hover:bg-[#0096B4] transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> {editingJob ? 'Save Changes' : 'Post Job'}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CareerUpdates;
