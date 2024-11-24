import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-purple-400 transition-colors">Trending</Link>
              </li>
              <li>
                <Link to="/premium" className="hover:text-purple-400 transition-colors">Premium</Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Trend Buster helps creators discover and analyze trending content across different regions. 
              Stay ahead of the curve with our powerful analytics and visualization tools.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Kairo369"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                <i className="fab fa-github text-2xl"></i>
                <span className="ml-2">GitHub</span>
              </a>
              <a
                href="https://x.com/Kairo_Codes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                <i className="fab fa-twitter text-2xl"></i>
                <span className="ml-2">Twitter</span>
              </a>
              <a
                href="https://www.youtube.com/@Kairo_Codes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                <i className="fab fa-youtube text-2xl"></i>
                <span className="ml-2">YouTube</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Trend Buster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
