
import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Play, Trophy, RotateCcw, User, Mail, Phone, Award, Lock, Download, Linkedin, Share2 } from 'lucide-react';
import { questionsData } from '../../data/mockQuestions';
import logo from '../../assets/logo_transparent.png';

const MockTests = () => {
    const [step, setStep] = useState(1); // 1: Course, 2: Level, 3: User Details, 4: Quiz, 5: Result
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // { questionId: optionIndex }
    const [score, setScore] = useState(0);
    const [showReview, setShowReview] = useState(false);

    // New State for Attempts & Certification
    const [quizAttempts, setQuizAttempts] = useState({}); // { 'course-level': count }
    const [quizStatus, setQuizStatus] = useState('playing'); // 'playing', 'won', 'lost', 'retry'

    // Expanded Courses List
    const courses = [
        { id: 'trending', name: 'Trending Tech', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80' },
        { id: 'fullstack', name: 'Full Stack Dev', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80' },
        { id: 'backend', name: 'Backend Dev', image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=500&q=80' },
        { id: 'dataengineer', name: 'Data Engineer', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&q=80' },
        { id: 'java', name: 'Java', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80' },
        { id: 'python', name: 'Python', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80' },
        { id: 'genai', name: 'Gen AI', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80' },
        { id: 'datascience', name: 'Data Science', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
        { id: 'cybersecurity', name: 'Cyber Security', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80' },
        { id: 'devops', name: 'DevOps', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&q=80' },
        { id: 'cloud', name: 'Cloud Computing', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80' },
        { id: 'ml', name: 'Machine Learning', image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=500&q=80' },
        { id: 'powerbi', name: 'Power BI', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' }, // Reusing Analytics
        { id: 'excel', name: 'Excel', image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=500&q=80' },
        { id: 'github', name: 'Git & GitHub', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&q=80' },
        { id: 'testing', name: 'Software Testing', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80' },
    ];

    const levels = [
        { id: 'easy', name: 'Easy', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { id: 'medium', name: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-200' },
        { id: 'hard', name: 'Hard', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    ];

    // Get current questions based on selection
    const currentQuestions = selectedCourse && selectedLevel
        ? (questionsData[selectedCourse]?.[selectedLevel] || [])
        : [];

    const getQuizId = () => `${selectedCourse}-${selectedLevel}`;

    const handleUserDetailsChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleAnswerSelect = (optionIndex) => {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: optionIndex });
    };

    const startQuiz = () => {
        const quizId = getQuizId();
        const attempts = quizAttempts[quizId] || 0;

        // Check if questions exist
        if (currentQuestions.length === 0) {
            alert("Questions for this module are coming soon! Please try Full Stack, Java or Python.");
            return;
        }

        if (attempts >= 2) {
            setQuizStatus('lost');
            setStep(5);
        } else {
            setStep(4);
            setQuizStatus('playing');
        }
    };

    const submitQuiz = async () => {
        let newScore = 0;
        currentQuestions.forEach((q, idx) => {
            if (userAnswers[idx] === q.correct) {
                newScore += 1;
            }
        });
        setScore(newScore);

        const quizId = getQuizId();
        const currentAttempts = (quizAttempts[quizId] || 0) + 1;
        setQuizAttempts({ ...quizAttempts, [quizId]: currentAttempts });

        const isFullScore = newScore === currentQuestions.length;

        if (isFullScore) {
            setQuizStatus('won');
        } else {
            if (currentAttempts >= 2) {
                setQuizStatus('lost');
            } else {
                setQuizStatus('retry');
            }
        }
        setStep(5);

        // Backend Integration
        const apiUrl = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
        try {
            const courseName = courses.find(c => c.id === selectedCourse)?.name || selectedCourse;
            await fetch(`${apiUrl}/api/mocktest/submit-result/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...userDetails,
                    course: courseName,
                    level: selectedLevel,
                    score: newScore,
                    total_questions: currentQuestions.length,
                    passed: isFullScore
                }),
            });
        } catch (error) {
            console.error('Error saving quiz result:', error);
        }
    };

    const handleDownloadCertificate = async () => {
        const apiUrl = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
        const courseName = courses.find(c => c.id === selectedCourse)?.name || selectedCourse;

        try {
            const response = await fetch(`${apiUrl}/api/mocktest/download-certificate/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userDetails.name,
                    course: courseName,
                    level: selectedLevel
                }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${userDetails.name.replace(/ /g, '_')}_Certificate.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert('Failed to download certificate. Please try again.');
            }
        } catch (error) {
            console.error('Download error:', error);
            alert('Error downloading certificate.');
        }
    };

    const handleLinkedInShare = () => {
        const courseName = courses.find(c => c.id === selectedCourse)?.name || selectedCourse;
        const text = `I am thrilled to share that I have successfully completed the ${courseName} Mock Test (Level: ${selectedLevel}) with Algonex IT Solutions! 🚀\n\n#Learning #TechSkills #Algonex #Certified`;
        const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const resetQuiz = () => {
        setUserAnswers({});
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowReview(false);
        setStep(4);
        setQuizStatus('playing');
    };

    const fullReset = () => {
        setStep(1);
        setSelectedCourse(null);
        setSelectedLevel(null);
        setUserAnswers({});
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowReview(false);
        setQuizStatus('playing');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    // Certificate Component
    const CertificateOfCompletion = () => (
        <div className="bg-white p-8 md:p-12 border-[10px] border-double border-[#00B4D8] relative text-center shadow-2xl max-w-3xl mx-auto animate-in zoom-in duration-500 overflow-hidden print:shadow-none">
            {/* Watermark/Decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-amber-400"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-amber-400"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-amber-400"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-amber-400"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none z-0">
                <span className="text-[140px] font-black text-slate-400 tracking-[0.2em] transform rotate-[-35deg] select-none uppercase">ALGONEX</span>
            </div>

            <div className="absolute top-8 left-8 z-20 hidden md:block">
                <img src={logo} alt="Algonex Logo" className="h-16 w-auto object-contain" />
            </div>

            <div className="mb-8 relative z-10 pt-8 md:pt-0">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-2 tracking-wide uppercase">Certificate</h1>
                <h2 className="text-xl md:text-2xl font-serif text-slate-500 uppercase tracking-widest">of Completion</h2>
            </div>

            <p className="text-slate-600 mb-6 font-serif italic text-lg relative z-10">This is to certify that</p>

            <h3 className="text-3xl md:text-4xl font-bold text-[#00B4D8] mb-6 font-['Poppins'] underline decoration-wavy decoration-amber-200 underline-offset-8 relative z-10 px-4">
                {userDetails.name || "Your Name Here"}
            </h3>

            <p className="text-slate-600 mb-6 font-serif text-lg leading-relaxed max-w-xl mx-auto relative z-10 px-4">
                has successfully passed the <span className="font-bold text-slate-800">{courses.find(c => c.id === selectedCourse)?.name || "Course Name"}</span> mock test at the <span className="font-bold uppercase">{selectedLevel || "Level"}</span> difficulty level with a perfect score.
            </p>

            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative z-10">
                <Award size={48} className="text-amber-600" />
            </div>

            <div className="flex justify-between items-end mt-12 border-t border-slate-200 pt-8 px-8 relative z-10">
                <div className="text-left">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
                    <p className="font-serif text-lg">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <div className="h-10 w-40 flex items-center justify-end">
                        <span className="text-4xl text-blue-800 italic" style={{
                            fontFamily: "'Great Vibes', 'Allura', 'Dancing Script', 'Brush Script MT', cursive",
                            transform: 'rotate(-8deg)',
                            display: 'inline-block'
                        }}>Ganesh</span>
                    </div>
                    <div className="h-px bg-slate-300 w-40 ml-auto mt-1"></div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Algonex IT Solutions</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {step < 5 && (
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-['Poppins']">
                            Mock Tests & Quizzes
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Challenge yourself with our industry-standard assessments.
                        </p>
                    </div>
                )}

                {/* Step 1: Select Course */}
                {step === 1 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">1</span>
                                Choose Your Domain
                            </h2>
                            <button
                                onClick={() => {
                                    setUserDetails({ name: 'Sample User', email: 'sample@algonex.com', phone: '1234567890' });
                                    setSelectedCourse('python');
                                    setSelectedLevel('HARD');
                                    setStep(10);
                                }}
                                className="text-sm font-bold text-[#00B4D8] hover:underline flex items-center gap-1"
                            >
                                <Award size={16} /> View Sample Certificate
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {courses.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => { setSelectedCourse(course.id); setStep(2); }}
                                    className="relative group overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-xl transition-all border border-slate-100"
                                >
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold text-lg">{course.name}</h3>
                                        <span className="text-slate-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Start Assessment &rarr;</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 10: Sample Certificate View */}
                {step === 10 && (
                    <div className="animate-in zoom-in-95 duration-500 text-center">
                        <CertificateOfCompletion />
                        <button
                            onClick={() => {
                                setStep(1);
                                setUserDetails({ name: '', email: '', phone: '' });
                                setSelectedCourse(null);
                            }}
                            className="mt-8 bg-slate-800 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-900 transition-colors shadow-lg"
                        >
                            Close Preview
                        </button>
                    </div>
                )}

                {/* Step 2: Select Level */}
                {step === 2 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 animate-in slide-in-from-right duration-300 max-w-4xl mx-auto">
                        <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600 mb-6 font-medium flex items-center gap-1">
                            &larr; Back to Courses
                        </button>
                        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">2</span>
                            Select Difficulty Level
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {levels.map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => { setSelectedLevel(level.id); setStep(3); }}
                                    className={`p-8 rounded-2xl border-2 text-xl font-bold capitalize transition-all hover:scale-105 ${level.color}`}
                                >
                                    {level.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: User Details */}
                {step === 3 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 animate-in slide-in-from-right duration-300 max-w-2xl mx-auto">
                        <button onClick={() => setStep(2)} className="text-slate-400 hover:text-slate-600 mb-6 font-medium flex items-center gap-1">
                            &larr; Back to Levels
                        </button>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">3</span>
                            Enter Your Details
                        </h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={userDetails.name}
                                        onChange={handleUserDetailsChange}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00B4D8] outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleUserDetailsChange}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00B4D8] outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userDetails.phone}
                                        onChange={handleUserDetailsChange}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00B4D8] outline-none"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            {(quizAttempts[getQuizId()] || 0) >= 2 ? (
                                <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2 mt-4">
                                    <AlertCircle size={20} />
                                    <span className="font-bold">You have already used your 2 chances for this test.</span>
                                </div>
                            ) : (
                                <div className="pt-6">
                                    <button
                                        onClick={startQuiz}
                                        disabled={!userDetails.name || !userDetails.email || !userDetails.phone}
                                        className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        Start Quiz <Play size={20} />
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mt-2">Attempt {(quizAttempts[getQuizId()] || 0) + 1} of 2 for Certificate eligibility.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 4: Quiz Interface */}
                {step === 4 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in zoom-in-95 duration-300 max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                            <div>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} / {currentQuestions.length}</span>
                                <div className="h-2 w-32 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className="h-full bg-[#00B4D8] transition-all duration-300"
                                        style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${levels.find(l => l.id === selectedLevel)?.color}`}>
                                {selectedLevel}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                                {currentQuestions[currentQuestionIndex]?.q}
                            </h3>
                        </div>

                        <div className="space-y-4 mb-10">
                            {/* Option Handling: Check if it's a coding question or MCQ */}
                            {currentQuestions[currentQuestionIndex]?.options ? (
                                // MCQ
                                currentQuestions[currentQuestionIndex].options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswerSelect(idx)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${userAnswers[currentQuestionIndex] === idx
                                            ? 'border-[#00B4D8] bg-[#E0F7FF] text-[#007796]'
                                            : 'border-slate-100 hover:border-[#00B4D8] hover:bg-slate-50 text-slate-600'
                                            }`}
                                    >
                                        <span className="font-semibold">{opt}</span>
                                        {userAnswers[currentQuestionIndex] === idx && <CheckCircle2 size={20} />}
                                    </button>
                                ))
                            ) : (
                                // Coding Question
                                <div className="w-full">
                                    <textarea
                                        rows="10"
                                        className="w-full p-4 bg-slate-900 text-slate-300 font-mono rounded-xl border border-slate-700 focus:border-[#00B4D8] outline-none"
                                        placeholder="Type your solution here..."
                                        defaultValue={currentQuestions[currentQuestionIndex].starter || ''}
                                        onChange={(e) => handleAnswerSelect(e.target.value)} // Saving text as the answer
                                    ></textarea>
                                    <p className="text-sm text-slate-500 mt-2">
                                        * This coding problem is for practice. It will be marked as correct for this mock test.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                className={`text-slate-500 font-bold hover:text-[#00B4D8] ${currentQuestionIndex === 0 ? 'invisible' : ''}`}
                            >
                                Previous
                            </button>
                            {currentQuestionIndex < currentQuestions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                    className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-900 transition-colors"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={submitQuiz}
                                    className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-600 shadow-lg hover:shadow-xl transition-all"
                                >
                                    Submit Quiz
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 5: Results */}
                {step === 5 && (
                    <div className="animate-in zoom-in-95 duration-500">
                        {/* 1. CERTIFICATE WON */}
                        {quizStatus === 'won' && (
                            <div className="text-center">
                                <div className="text-green-500 font-bold text-xl flex items-center justify-center gap-2 mb-4 animate-bounce">
                                    <CheckCircle2 /> Certified Successfully!
                                </div>
                                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl mb-8 max-w-2xl mx-auto border border-blue-200">
                                    A copy of this certificate has been sent to <b>{userDetails.email}</b>
                                </div>
                                <CertificateOfCompletion />
                                <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                                    <button
                                        onClick={handleDownloadCertificate}
                                        className="bg-[#00B4D8] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0096B4] transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Download size={20} /> Download Certificate
                                    </button>
                                    <button
                                        onClick={handleLinkedInShare}
                                        className="bg-[#0A66C2] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#004182] transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Linkedin size={20} /> Share on LinkedIn
                                    </button>
                                    <button
                                        onClick={fullReset}
                                        className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg"
                                    >
                                        Take Another Test
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 2. ALL CHANCES LOST */}
                        {quizStatus === 'lost' && !showReview && (
                            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-2xl mx-auto border-t-8 border-red-500">
                                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Lock size={48} className="text-red-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Chances are done</h2>
                                <p className="text-slate-500 mb-8 max-w-md mx-auto">You have used all 2 attempts for this test without achieving a full score. Unfortunately, no certificate can be issued.</p>

                                <div className="text-5xl font-black text-slate-300 mb-2">{score} <span className="text-2xl font-bold">/ {currentQuestions.length}</span></div>
                                <p className="text-slate-400 font-semibold mb-8">Final Score</p>

                                <button onClick={() => setShowReview(true)} className="text-[#00B4D8] font-bold hover:underline mb-6 block mx-auto">Review Mistakes</button>

                                <button onClick={fullReset} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors">
                                    Try Different Course
                                </button>
                            </div>
                        )}

                        {/* 3. RETRY AVAILABLE (1 Chance Used) */}
                        {quizStatus === 'retry' && !showReview && (
                            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-2xl mx-auto border-t-8 border-amber-400">
                                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle size={48} className="text-amber-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Almost there!</h2>
                                <p className="text-slate-500 mb-8">You need a 100% score to get the certificate. You have <span className="font-bold text-amber-600">1 attempt remaining</span>.</p>

                                <div className="text-5xl font-black text-[#00B4D8] mb-2">{score} <span className="text-2xl text-slate-400 font-bold">/ {currentQuestions.length}</span></div>
                                <p className="text-slate-400 font-semibold mb-8">Current Score</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => setShowReview(true)} className="bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                                        Review Answers
                                    </button>
                                    <button onClick={resetQuiz} className="bg-[#00B4D8] text-white py-3 rounded-xl font-bold hover:bg-[#0096B4] transition-colors flex items-center justify-center gap-2">
                                        <RotateCcw size={18} /> Use Final Attempt
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Review Screen (Shared) */}
                        {showReview && (
                            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-2xl font-bold text-slate-800">Answer Review</h2>
                                    <button onClick={() => setShowReview(false)} className="text-[#00B4D8] font-bold hover:underline">
                                        Back to Score
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    {currentQuestions.map((q, idx) => {
                                        const isCorrect = userAnswers[idx] === q.correct;
                                        return (
                                            <div key={idx} className={`p-6 rounded-2xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                                <h3 className="text-lg font-bold text-slate-800 mb-3 flex gap-3"><span className="text-slate-400">#{idx + 1}</span> {q.q}</h3>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-500 w-24">Your Answer:</span>
                                                        <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{q.options[userAnswers[idx]] || 'Skipped'}</span>
                                                        {isCorrect ? <CheckCircle2 size={16} className="text-green-500" /> : <AlertCircle size={16} className="text-red-500" />}
                                                    </div>
                                                    {!isCorrect && (
                                                        <div className="flex items-center gap-2"><span className="font-bold text-slate-500 w-24">Correct:</span><span className="font-bold text-green-700">{q.options[q.correct]}</span></div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default MockTests;
