import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Premium = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load Buy Me a Coffee button script
    const script = document.createElement('script');
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.type = "text/javascript";
    
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const buttonScript = document.querySelector('script[src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"]');
      if (buttonScript) {
        document.body.removeChild(buttonScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1A1A2E] to-[#16162A] flex flex-col pt-20">
      <div className="container mx-auto px-4 flex-grow flex items-start justify-center py-8">
        <div className="w-full max-w-2xl bg-[#1E1E32]/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mx-4 relative z-0">
          <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 via-[#6B46C1] to-purple-600 text-transparent bg-clip-text">
            Unlock Premium Features
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-8">
            Support us and get access to premium features!
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-[#242442]/80 backdrop-blur-sm rounded-xl p-6 overflow-hidden">
              {user ? (
                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    Support our work and get instant access to premium features!
                  </p>
                  <div className="flex justify-center">
                    <a 
                      href="https://www.buymeacoffee.com/kairo369" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block transform hover:scale-105 transition-transform duration-200 relative group"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                      <div className="relative">
                        <img 
                          src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=kairo369&button_colour=6B46C1&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                          alt="Buy Me A Coffee"
                          style={{ 
                            height: '60px',
                            filter: 'drop-shadow(0 0 10px rgba(107, 70, 193, 0.5))'
                          }}
                          className="rounded-lg"
                        />
                      </div>
                    </a>
                  </div>
                  <p className="text-sm text-gray-400 mt-6">
                    Note: After supporting us, please allow up to 24 hours for premium access to be activated.
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-300">
                  Please{' '}
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-purple-400 hover:text-purple-300 underline font-semibold"
                  >
                    sign in
                  </button>
                  {' '}to subscribe
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-purple-400 mb-6">Premium Features</h2>
            <ul className="space-y-4">
              {[
                'Advanced trend analytics and insights',
                'Historical data access and comparison',
                'Custom reports and data exports',
                'Priority support and updates',
                'Early access to new features'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
