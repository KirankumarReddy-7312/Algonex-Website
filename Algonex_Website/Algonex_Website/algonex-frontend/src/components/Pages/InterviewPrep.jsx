
import React from 'react';
import { MonitorPlay } from 'lucide-react';

const InterviewPrep = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-['Outfit'] py-12 px-4">
            <div className="container mx-auto max-w-4xl text-center">
                <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <MonitorPlay size={40} />
                </div>
                <h1 className="text-4xl font-bold text-slate-800 mb-4">Interview Preparation</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Master your upcoming interviews with our curated collection of questions, tips, and mock scenarios.
                </p>

                <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Coming Soon</h3>
                    <p className="text-slate-500">We are currently building this comprehensive resource. Check back later!</p>
                </div>
            </div>
        </div>
    );
};

export default InterviewPrep;
