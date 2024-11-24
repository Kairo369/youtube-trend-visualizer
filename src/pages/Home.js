import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto py-20">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-[#6B46C1] to-purple-600 text-transparent bg-clip-text leading-tight py-2">
            Discover Trending Content
          </h1>
          <p className="text-2xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
            Explore YouTube trends with powerful analytics and interactive visualizations.
            Get insights into what's trending across different regions and categories.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
            <Link
              to="/trending"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#6B46C1] to-purple-600 text-white hover:from-[#553499] hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Explore Trends
            </Link>
            
            <Link
              to="/premium"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Go Premium
            </Link>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-[#6B46C1] rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300 text-center group-hover:text-purple-400 transition-colors duration-300">Real-time Analytics</h3>
              <p className="text-gray-300 text-center leading-relaxed">Track trending videos and their performance metrics in real-time with interactive visualizations.</p>
            </div>

            <div className="p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-[#6B46C1] rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300 text-center group-hover:text-purple-400 transition-colors duration-300">Global Insights</h3>
              <p className="text-gray-300 text-center leading-relaxed">Discover and analyze trending content across different regions and categories worldwide.</p>
            </div>

            <div className="p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-[#6B46C1] rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300 text-center group-hover:text-purple-400 transition-colors duration-300">Custom Reports</h3>
              <p className="text-gray-300 text-center leading-relaxed">Generate detailed reports and insights tailored to your specific interests and needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
