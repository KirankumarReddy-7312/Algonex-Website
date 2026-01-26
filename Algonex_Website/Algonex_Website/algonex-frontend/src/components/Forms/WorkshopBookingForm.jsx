import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Building2, User, Phone, Mail, Calendar, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

const WorkshopBookingForm = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const apiUrl = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
    const [formData, setFormData] = useState({
        college_name: '',
        contact_person: '',
        phone: '',
        email: '',
        department: '',
        expected_students: '',
        preferred_date: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${apiUrl}/api/workshop/submit-workshop/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorData = await response.json();
                console.error('Backend error:', errorData);
                alert('Failed to submit request. Please check your input.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
                    {/* Success Animation Background */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#00B4D8]"></div>

                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-green-500 w-10 h-10" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Request Sent!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for your interest. Our team will get back to you shortly to coordinate the workshop details.
                    </p>

                    <button
                        onClick={() => {
                            onClose();
                            navigate('/events');
                        }}
                        className="w-full py-3.5 bg-[#00B4D8] hover:bg-[#0096B4] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#00B4D8]/20 flex items-center justify-center gap-2"
                    >
                        Go to Events & Workshops <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden my-8">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors bg-white/20 hover:bg-white/30 rounded-full p-2"
                    >
                        <X size={20} />
                    </button>
                    <h2 className="text-2xl font-bold mb-1">Request a Workshop</h2>
                    <p className="text-white/90 text-sm">Empower your students with industry-ready skills.</p>
                </div>

                {/* Form */}
                <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* College Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <Building2 size={16} className="text-[#00B4D8]" /> College Name
                                </label>
                                <input
                                    type="text"
                                    name="college_name"
                                    required
                                    value={formData.college_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="e.g. IIT Bombay"
                                />
                            </div>

                            {/* Contact Person */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <User size={16} className="text-[#00B4D8]" /> Contact Person
                                </label>
                                <input
                                    type="text"
                                    name="contact_person"
                                    required
                                    value={formData.contact_person}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="Faculty or Coordinator Name"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <Phone size={16} className="text-[#00B4D8]" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="+91 99999 99999"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <Mail size={16} className="text-[#00B4D8]" /> Official Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="contact@college.edu"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Department */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <Building2 size={16} className="text-[#00B4D8]" /> Department
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all text-gray-600"
                                >
                                    <option value="">Select Department</option>
                                    <option value="CSE">Computer Science (CSE)</option>
                                    <option value="IT">Information Technology (IT)</option>
                                    <option value="ECE">Electronics (ECE)</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Preferred Date */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <Calendar size={16} className="text-[#00B4D8]" /> Preferred Date (Tentative)
                                </label>
                                <input
                                    type="date"
                                    name="preferred_date"
                                    value={formData.preferred_date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Expected Students */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                <User size={16} className="text-[#00B4D8]" /> Expected Student Count
                            </label>
                            <input
                                type="text"
                                name="expected_students"
                                value={formData.expected_students}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all placeholder:text-gray-400"
                                placeholder="Approximate number of attendees"
                            />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                <MessageSquare size={16} className="text-[#00B4D8]" /> Specific Topic / Requirements
                            </label>
                            <textarea
                                name="message"
                                rows="3"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                                placeholder="e.g. We want a 2-day hands-on workshop on Generative AI..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-[#00B4D8] to-[#0096B4] hover:from-[#0096B4] hover:to-[#0077B6] text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkshopBookingForm;
