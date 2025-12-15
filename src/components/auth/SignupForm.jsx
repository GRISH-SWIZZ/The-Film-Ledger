import React, { useState } from 'react';
import Button from '@/components/ui/Button';

const SignupForm = ({ onSignup, loading }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup({ name, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-bold uppercase text-gray-500 mb-1">Name</label>
                <input
                    type="text"
                    className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-bold uppercase text-gray-500 mb-1">Email</label>
                <input
                    type="email"
                    className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-bold uppercase text-gray-500 mb-1">Password</label>
                <input
                    type="password"
                    className="w-full border-b border-gray-300 py-2 focus:border-swiss-black outline-none transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? "Signing Up..." : "Sign Up"}
            </Button>
        </form>
    );
};

export default SignupForm;
