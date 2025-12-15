import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="relative min-h-screen bg-black text-white py-32">
            <div className="container-custom max-w-4xl">
                <h1 className="text-5xl font-extrabold mb-10">
                    Privacy <span className="text-swiss-red">Policy</span>
                </h1>

                <p className="text-gray-300 text-lg mb-12">
                    At <strong>The Film Ledger</strong>, your privacy is important to us.
                    This Privacy Policy explains how we collect, use, and protect your
                    information when you use our platform.
                </p>

                <section className="space-y-10 text-gray-300 text-lg leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            1. Information We Collect
                        </h2>
                        <p>
                            We may collect personal information such as your name, email
                            address, profile photo, and activity data when you create an
                            account, write reviews, or interact with features on Film Ledger.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            2. How We Use Your Information
                        </h2>
                        <p>
                            Your information is used to provide core features such as account
                            access, personalized content, community interaction, and platform
                            improvements. We do not sell your personal data.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            3. Cookies & Tracking
                        </h2>
                        <p>
                            Film Ledger may use cookies and similar technologies to enhance
                            user experience, analyze traffic, and improve site performance.
                            You can control cookie preferences through your browser.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            4. Data Security
                        </h2>
                        <p>
                            We implement industry-standard security measures to protect your
                            data. However, no digital platform can guarantee absolute
                            security.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            5. Third-Party Services
                        </h2>
                        <p>
                            We may integrate third-party services (such as authentication or
                            analytics). These services operate under their own privacy
                            policies.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            6. Changes to This Policy
                        </h2>
                        <p>
                            This policy may be updated periodically. Continued use of the
                            platform means you accept any changes made.
                        </p>
                    </div>
                </section>

                <p className="mt-16 text-sm text-gray-500">
                    Last updated: {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
