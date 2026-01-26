import React, { useState } from 'react';
import { Search, Download, Crown, CheckCircle, ArrowLeft, ChevronRight, X, Mail } from 'lucide-react';
import { jsPDF } from 'jspdf';

const ResumeTemplates = () => {
    // Steps: 0 = Level Selection, 1 = Domain Selection, 2 = Template List
    const [step, setStep] = useState(0);
    const [selectedLevel, setSelectedLevel] = useState(null); // 'fresher' | 'experienced'
    const [selectedDomain, setSelectedDomain] = useState(null); // 'fullstack', 'python', 'java', etc.
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState(null); // 'success' | 'error'

    const paperBg = "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop&q=60";
    const cleanBg = "https://images.unsplash.com/photo-1586282391129-76a6df840fd0?w=500&auto=format&fit=crop&q=60";

    // --- Domains Configuration with Professional Icons ---
    const domains = [
        {
            id: 'fullstack',
            label: 'Full Stack / Web Dev',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            desc: 'React, Node, Angular, Vue'
        },
        {
            id: 'datascience',
            label: 'Data Science & AI',
            icon: 'https://static.vecteezy.com/system/resources/previews/046/284/137/original/data-science-and-analysis-icon-concept-vector.jpg',
            desc: 'Python, Pandas, ML, AI'
        },
        {
            id: 'python',
            label: 'Python & DSA',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            desc: 'Core Python, Algorithms'
        },
        {
            id: 'java',
            label: 'Java Development',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
            desc: 'Spring Boot, Hibernate'
        },
        {
            id: 'devops',
            label: 'DevOps & Cloud',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
            desc: 'AWS, Kubernetes, CI/CD'
        },
        {
            id: 'cpp',
            label: 'C++ & Systems',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
            desc: 'System Programming, Gaming'
        },
    ];

    // --- Template Data Generator ---
    const generateTemplates = () => {
        const baseTemplates = [];
        let idCounter = 1;

        const layouts = ['classic', 'modern', 'minimal', 'tech', 'creative', 'simple', 'corporate', 'academic'];
        const bgs = [paperBg, cleanBg];

        const domainsList = [
            { id: 'python', roleFresher: 'Python Developer Intern', roleExp: 'Senior Python Engineer' },
            { id: 'java', roleFresher: 'Java Trainee', roleExp: 'Lead Java Architect' },
            { id: 'fullstack', roleFresher: 'Frontend Intern', roleExp: 'Full Stack Staff Engineer' },
            { id: 'datascience', roleFresher: 'Junior Data Analyst', roleExp: 'Lead Data Scientist' },
            { id: 'devops', roleFresher: 'Cloud Associate', roleExp: 'Principal DevOps Engineer' },
            { id: 'cpp', roleFresher: 'C++ Systems Intern', roleExp: 'Senior Systems Engineer' }
        ];

        const manualTemplates = [
            {
                id: 'real-1',
                domain: 'java',
                category: 'fresher',
                title: 'Java Developer Style',
                role: 'Java Developer',
                description: 'Professional Java developer resume structure focusing on projects and internships.',
                type: 'free',
                previewImage: '/assets/resume-previews/sonal_vinod_karma.png'
            },
            {
                id: 'real-2',
                domain: 'datascience',
                category: 'fresher',
                title: 'AI & DS Student',
                role: 'AI Engineer',
                description: 'Clean resume format for Artificial Intelligence and Data Science students.',
                type: 'free',
                previewImage: '/assets/resume-previews/venkata_lahari_katakam.png'
            },
            {
                id: 'real-3',
                domain: 'datascience',
                category: 'fresher',
                title: 'Data Analyst Profile',
                role: 'Data Analyst',
                description: 'Detailed layout highlighting analytical skills, tools like Pandas/SQL, and experience.',
                type: 'free',
                previewImage: '/assets/resume-previews/ganesh_pasala.png'
            },
            {
                id: 'real-4',
                domain: 'datascience',
                category: 'fresher',
                title: 'Data Scientist Format',
                role: 'Data Scientist',
                description: 'structured resume for Data Science roles emphasizing ML models and certifications.',
                type: 'free',
                previewImage: '/assets/resume-previews/pasala_vamsi_krishna.png'
            }
        ];

        domainsList.forEach(domain => {
            // Generate 15 Fresher Templates per Domain
            for (let i = 0; i < 15; i++) {
                baseTemplates.push({
                    id: idCounter++,
                    domain: domain.id,
                    category: 'fresher',
                    title: `${domain.id.charAt(0).toUpperCase() + domain.id.slice(1)} Entry ${i + 1}`,
                    role: domain.roleFresher,
                    description: `Optimized beginner layout for ${domain.id} roles. Focus on education and projects.`,
                    layout: layouts[i % layouts.length], // Cycle through layouts
                    type: i < 5 ? 'free' : 'premium', // Mix free/premium (first 5 free)
                    bgImage: bgs[i % bgs.length],
                    candidateName: "Alex Fresher"
                });
            }

            // Generate 15 Experienced Templates per Domain
            for (let i = 0; i < 15; i++) {
                baseTemplates.push({
                    id: idCounter++,
                    domain: domain.id,
                    category: 'experienced',
                    title: `${domain.id.charAt(0).toUpperCase() + domain.id.slice(1)} Pro ${i + 1}`,
                    role: domain.roleExp,
                    description: `Senior level resume highlighting metrics, leadership, and ${domain.id} expertise.`,
                    layout: layouts[(i + 2) % layouts.length], // Offset layouts
                    type: i < 5 ? 'free' : 'premium', // First 5 free
                    bgImage: bgs[(i + 1) % bgs.length],
                    candidateName: "James Senior"
                });
            }
        });

        return [...manualTemplates, ...baseTemplates];
    };

    const templates = generateTemplates();

    const filteredTemplates = templates.filter(t =>
        t.category === selectedLevel && t.domain === selectedDomain
    );

    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
        setStep(1);
    };

    const handleDomainSelect = (domainId) => {
        setSelectedDomain(domainId);
        setStep(2);
    };

    const resetSelection = () => {
        setStep(0);
        setSelectedLevel(null);
        setSelectedDomain(null);
    };

    const goBackToDomains = () => {
        setStep(1);
        setSelectedDomain(null);
    };

    const handlePreview = (e, template) => {
        e.stopPropagation(); // Prevent any parent clicks
        setSelectedTemplate(template);
        setShowPreviewModal(true);
    };

    const handleDownloadClick = (e, template) => {
        e.stopPropagation(); // Prevent any parent clicks
        setSelectedTemplate(template);
        setShowDownloadModal(true);
        setDownloadStatus(null);
        setEmail('');
    };

    // Function to load image and get dimensions
    const loadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
            // Handle cross-origin if needed, though usually fine for local assets
            img.crossOrigin = "Anonymous";
        });
    };

    const generatePdf = async (template) => {
        const doc = new jsPDF();

        if (template.previewImage) {
            try {
                // Load image first to get dimensions
                const img = await loadImage(template.previewImage);

                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = doc.internal.pageSize.getHeight();

                // Calculate aspect ratio to fit the page 
                const imgRatio = img.width / img.height;
                const pdfRatio = pdfWidth / pdfHeight;

                let renderWidth, renderHeight;

                // Scale to fit width, but respect height
                // Since resumes are typically A4 portrait, we usually want full width
                renderWidth = pdfWidth;
                renderHeight = pdfWidth / imgRatio;

                // If height exceeds page, we might want to scale down or multi-page
                // For this simple version, let's just scale to fit width.

                doc.addImage(img, 'PNG', 0, 0, renderWidth, renderHeight);
                doc.save(`${template.title.replace(/\s+/g, '_')}.pdf`);
                return true;
            } catch (err) {
                console.error("Error generating PDF from image:", err);
                return false;
            }
        } else {
            // Logic for generated code-based templates (Placeholder)
            doc.setFontSize(22);
            doc.setTextColor(0, 0, 0);
            doc.text(template.title, 105, 20, { align: 'center' });

            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text("Generated by Algonex Resume Builder", 105, 30, { align: 'center' });

            doc.setLineWidth(0.5);
            doc.line(20, 35, 190, 35);

            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(`Role: ${template.role}`, 20, 50);

            doc.setFontSize(12);
            doc.text("Description:", 20, 65);
            doc.setTextColor(60, 60, 60);
            const splitDesc = doc.splitTextToSize(template.description, 170);
            doc.text(splitDesc, 20, 72);

            doc.setTextColor(200, 50, 50);
            doc.text("\n[Note: This is a generated template preview. A full PDF rendering engine is needed for complex HTML-to-PDF conversion.]", 20, 100, { maxWidth: 170 });

            doc.save(`${template.title.replace(/\s+/g, '_')}.pdf`);
            return true;
        }
    };

    const handleDownloadSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/download-resume/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    template_id: selectedTemplate.id.toString(),
                    template_title: selectedTemplate.title
                }),
            });

            if (response.ok) {
                setDownloadStatus('success');
                // Generate and download PDF
                await generatePdf(selectedTemplate);

                setTimeout(() => {
                    setShowDownloadModal(false);
                }, 2000);
            } else {
                setDownloadStatus('error');
            }
        } catch (error) {
            console.error("Download error:", error);
            setDownloadStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };


    // --- Enhanced Resume Preview Component (used for thumbnails and modal) ---
    const ResumePreview = ({ layout, name, role, bg, category = 'experienced', isModal = false }) => {
        // ... (Content generation logic similar to before) ...
        // 1. Fresher Content (Education Focus, Projects, Internships)
        const fresherContent = {
            summary: `Motivated ${role} with a strong academic background in Computer Science. Passionate about building scalable applications and learning new technologies.`,
            contact: "+1 555-0100 | alex.student@email.com | New York, NY",
            education: [
                { school: "University of Technology", location: "New York, NY", degree: "Bachelor of Science in Computer Science", date: "09/2019 - 05/2023", details: ["GPA: 3.8/4.0", "Dean's List 2021-2023"] }
            ],
            experience: [ // Actually Internships/Projects for freshers
                {
                    title: "Software Engineering Intern",
                    company: "TechStart Inc",
                    location: "Remote",
                    date: "06/2022 - 08/2022",
                    points: ["Developed a REST API using Node.js and Express.", "Collaborated with frontend team to integrate UI components."]
                },
                {
                    title: "Capstone Project",
                    company: "Academic",
                    location: "Campus",
                    date: "01/2023 - 05/2023",
                    points: ["Built a full-stack e-commerce dashboard using React and Firebase."]
                }
            ],
            skills: { "Languages": "Java, Python", "Web": "React, HTML5" },
            certificates: ["AWS Certified Cloud Practitioner"]
        };

        const experiencedContent = {
            summary: `Results-oriented ${role} with 7+ years of experience driving architectural decisions and leading engineering teams.`,
            contact: "+1 555-0199 | james.pro@email.com | San Francisco, CA",
            experience: [
                {
                    title: role,
                    company: "Global Tech Solutions",
                    location: "San Francisco, CA",
                    date: "01/2020 - Present",
                    points: ["Spearheaded the migration of legacy monolith to microservices.", "Led a team of 8 engineers."]
                },
                {
                    title: "Senior Developer",
                    company: "Innovate Corp",
                    location: "Austin, TX",
                    date: "06/2017 - 12/2019",
                    points: ["Developed key features using Python and Django.", "Optimized database queries."]
                }
            ],
            education: [{ school: "State University", location: "Austin, TX", degree: "MS Software Engineering", date: "2015 - 2017", details: [] }],
            skills: { "Architecture": "Microservices, AWS", "Languages": "Python, Java" },
            certificates: ["AWS Solutions Architect", "Scrum Master"]
        };

        const isFresher = role.toLowerCase().includes('intern') || role.toLowerCase().includes('trainee') || role.includes('Entry');
        const content = isFresher ? fresherContent : experiencedContent;

        const SectionHeader = ({ title }) => (
            <div className={`mb-1.5 ${['modern', 'tech'].includes(layout) ? 'border-l-2 border-blue-500 pl-1' : 'border-b border-gray-300 pb-0.5'}`}>
                <h5 className={`${isModal ? 'text-xs md:text-sm' : 'text-[6px]'} font-bold uppercase tracking-wider text-slate-800`}>{title}</h5>
            </div>
        );

        return (
            <div className={`w-full h-full relative overflow-hidden bg-white shadow-inner text-slate-800 ${isModal ? 'p-8 text-base overflow-y-auto' : 'p-2 text-[4px]'}`}>
                {!isModal && <img src={bg} alt="Paper" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />}

                <div className={`relative z-10 flex flex-col h-full`}>
                    <div className="mb-4">
                        <h4 className={`${isModal ? 'text-2xl md:text-3xl' : 'text-[10px]'} font-bold uppercase tracking-tight text-slate-900 border-b border-slate-800 pb-2 mb-2`}>{name}</h4>
                        <p className={`${isModal ? 'text-sm text-slate-600' : 'text-[4px] text-slate-600'} font-medium`}>{content.contact}</p>
                    </div>

                    <div className="space-y-4">
                        {isFresher && (
                            <div>
                                <SectionHeader title="Education" />
                                {content.education.map((edu, i) => (
                                    <div key={i} className="mb-2">
                                        <div className="flex justify-between font-bold"><span>{edu.school}</span><span>{edu.location}</span></div>
                                        <div className="flex justify-between italic text-slate-600"><span>{edu.degree}</span><span>{edu.date}</span></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <SectionHeader title="Experience" />
                            {content.experience.map((exp, i) => (
                                <div key={i} className="mb-3">
                                    <div className="flex justify-between font-bold border-b border-dotted border-gray-200"><span>{exp.company}</span><span>{exp.location}</span></div>
                                    <div className="flex justify-between font-semibold text-slate-700"><span>{exp.title}</span><span className="text-slate-500">{exp.date}</span></div>
                                    <ul className="list-disc ml-4 mt-1">
                                        {exp.points.map((pt, j) => <li key={j} className="text-slate-600">{pt}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <div className="bg-[#0f172a] text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">Professional <span className="text-[#00B4D8]">Resume Templates</span></h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">Tailored templates for every role, language, and career stage.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                {/* --- STEP 0: LEVEL SELECTION --- */}
                {step === 0 && (
                    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-slate-800">1. Select Your Experience Level</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                            {/* Buttons same as before but ensured click handlers work */}
                            <button onClick={() => handleLevelSelect('fresher')} className="group bg-white p-8 rounded-2xl shadow-lg hover:border-blue-400 border-2 border-transparent transition-all hover:-translate-y-1">
                                <div className="p-4 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-500 mx-auto w-fit group-hover:scale-110 transition-transform">
                                    <div className="bg-[#0077B5] text-white p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg></div>
                                </div>
                                <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">Fresher / Student</h3>
                                <p className="text-center text-slate-500">0-2 Years | Internships | Entry Level</p>
                            </button>
                            <button onClick={() => handleLevelSelect('experienced')} className="group bg-white p-8 rounded-2xl shadow-lg hover:border-purple-400 border-2 border-transparent transition-all hover:-translate-y-1">
                                <div className="p-4 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-500 mx-auto w-fit group-hover:scale-110 transition-transform">
                                    <div className="bg-[#6b21a8] text-white p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg></div>
                                </div>
                                <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">Experienced Professional</h3>
                                <p className="text-center text-slate-500">2+ Years | Senior | Lead | Manager</p>
                            </button>
                        </div>
                    </div>
                )}

                {/* --- STEP 1: DOMAIN SELECTION --- */}
                {step === 1 && (
                    <div className="animate-fade-in-up">
                        <button onClick={resetSelection} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 font-medium"><ArrowLeft size={16} /> Back</button>

                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2 capitalize">2. Select Your Specialization</h2>
                            <p className="text-slate-500 line-clamp-2">Choose your technical domain to view relevant resume formats.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {domains.map(domain => (
                                <button key={domain.id} onClick={() => handleDomainSelect(domain.id)} className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 p-6 rounded-xl transition-all text-left flex items-start gap-4 shadow-sm hover:shadow-md">
                                    <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <img src={domain.icon} alt={domain.label} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-[#00B4D8] transition-colors">{domain.label}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{domain.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- STEP 2: TEMPLATE LIST --- */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={goBackToDomains} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium"><ArrowLeft size={16} /> Back to Domains</button>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <span className="text-slate-400 text-sm">Path: <span className="capitalize">{selectedLevel}</span> / <span className="capitalize">{domains.find(d => d.id === selectedDomain)?.label}</span></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTemplates.length > 0 ? filteredTemplates.map(template => (
                                <div key={template.id} className="group relative h-[500px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                                        {template.previewImage ? (
                                            <img src={template.previewImage} alt={template.title} className="w-full h-full object-cover object-top" />
                                        ) : (
                                            <ResumePreview layout={template.layout} name={template.candidateName} role={template.role} bg={template.bgImage} />
                                        )}
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 cursor-default">
                                        <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{template.title}</h3>
                                        <p className="text-gray-300 text-sm mb-6 line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{template.description}</p>

                                        <div className="grid grid-cols-2 gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 relative z-20">
                                            <button onClick={(e) => handlePreview(e, template)} className="py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer relative z-30">
                                                <Search size={16} /> Preview
                                            </button>
                                            <button onClick={(e) => handleDownloadClick(e, template)} className="py-2.5 rounded-lg bg-[#00B4D8] text-white font-semibold hover:bg-[#0096B4] transition-all flex items-center justify-center gap-2 text-sm shadow-lg cursor-pointer relative z-30">
                                                <Download size={16} /> Download
                                            </button>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 z-20">
                                        {template.type === 'premium' ?
                                            <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md"><Crown size={12} fill="currentColor" /> Premium</span> :
                                            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md"><CheckCircle size={12} /> Free</span>
                                        }
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-3 text-center py-20">
                                    <h3 className="text-2xl font-bold text-slate-400 mb-2">No templates found</h3>
                                    <button onClick={goBackToDomains} className="mt-4 text-[#00B4D8] font-bold hover:underline">Browse other domains</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- PREVIEW MODAL --- */}
                {showPreviewModal && selectedTemplate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                        <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-xl font-bold text-slate-800">{selectedTemplate.title}</h3>
                                <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                            <div className="flex-1 overflow-auto bg-gray-100 p-8 flex justify-center">
                                {selectedTemplate.previewImage ? (
                                    <img src={selectedTemplate.previewImage} alt="Preview" className="w-full max-w-2xl shadow-xl" />
                                ) : (
                                    <div className="w-[800px] h-[1000px] shadow-xl bg-white"><ResumePreview layout={selectedTemplate.layout} name={selectedTemplate.candidateName} role={selectedTemplate.role} bg={selectedTemplate.bgImage} isModal={true} /></div>
                                )}
                            </div>
                            <div className="p-4 border-t bg-white flex justify-end gap-4">
                                <button onClick={() => setShowPreviewModal(false)} className="px-6 py-2 text-slate-600 font-bold hover:bg-gray-100 rounded-lg">Close</button>
                                <button onClick={(e) => { setShowPreviewModal(false); handleDownloadClick(e, selectedTemplate); }} className="px-6 py-2 bg-[#00B4D8] text-white font-bold rounded-lg hover:bg-[#0096B4] shadow-lg flex items-center gap-2">
                                    <Download size={18} /> Download Template
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- DOWNLOAD EMAIL MODAL --- */}
                {showDownloadModal && selectedTemplate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                        <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
                            <button onClick={() => setShowDownloadModal(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>

                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00B4D8]">
                                    <Download size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Download {selectedTemplate.title}</h3>
                                <p className="text-slate-500 text-sm">Please enter your email address to receive your download link and future job alerts.</p>
                            </div>

                            <form onSubmit={handleDownloadSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {downloadStatus === 'success' && (
                                    <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2">
                                        <CheckCircle size={16} /> Download starting... check your downloads folder.
                                    </div>
                                )}

                                {downloadStatus === 'error' && (
                                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || downloadStatus === 'success'}
                                    className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00B4D8] hover:bg-[#0096B4] hover:shadow-xl hover:-translate-y-0.5'}`}
                                >
                                    {isSubmitting ? 'Processing...' : 'Download Now'}
                                </button>
                            </form>

                            <p className="text-xs text-center text-slate-400 mt-4">We respect your privacy. No spam.</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ResumeTemplates;
