import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-swiss-black text-white pt-20 pb-10">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-3xl font-bold tracking-tighter mb-8 block hover:text-swiss-red transition-colors">
                            THE FILM LEDGER<span className="text-swiss-red">.</span>
                        </Link>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            A modern, community-driven platform for exploring movies, sharing reviews, discovering trends, and shaping the cinematic conversation.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-base font-bold mb-8 text-swiss-red tracking-widest">PLATFORM</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/explore" className="hover:text-white transition-colors text-base">Browse Movies</Link></li>
                            <li><Link to="/auth" className="hover:text-white transition-colors text-base">Sign In</Link></li>
                            <li><Link to="/auth" className="hover:text-white transition-colors text-base">Create Account</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-bold mb-8 text-swiss-red tracking-widest">LEGAL</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/privacy-policy" className="hover:text-white transition-colors text-base">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-white transition-colors text-base">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-6 md:mb-0">
                        © {new Date().getFullYear()} The Film Ledger. All rights reserved.
                    </p>
                    <div className="flex space-x-8">
                        <a href="#" className="text-gray-400 hover:text-swiss-red transition-colors"><FaGithub size={22} /></a>
                        <a href="#" className="text-gray-400 hover:text-swiss-red transition-colors"><FaTwitter size={22} /></a>
                        <a href="#" className="text-gray-400 hover:text-swiss-red transition-colors"><FaInstagram size={22} /></a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
