import React from "react";

const TermsOfService = () => {
    return (
        <div className="relative min-h-screen bg-black text-white py-32">
            <div className="container-custom max-w-4xl">
                <h1 className="text-5xl font-extrabold mb-10">
                    Terms of <span className="text-swiss-red">Service</span>
                </h1>

                <p className="text-gray-300 text-lg mb-12">
                    Welcome to <strong>The Film Ledger</strong>. By accessing or using our
                    platform, you agree to comply with the following terms and conditions.
                </p>

                <section className="space-y-10 text-gray-300 text-lg leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            1. Platform Usage
                        </h2>
                        <p>
                            Film Ledger is a community-driven platform for discovering movies
                            and sharing opinions. You agree to use the platform responsibly
                            and lawfully.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            2. User Accounts
                        </h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your
                            account credentials. Any activity performed under your account is
                            your responsibility.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            3. User Content
                        </h2>
                        <p>
                            Reviews, comments, and other content posted by users must not be
                            abusive, misleading, or unlawful. We reserve the right to remove
                            content that violates these guidelines.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            4. Intellectual Property
                        </h2>
                        <p>
                            All platform content, branding, and design belong to The Film
                            Ledger unless otherwise stated. Unauthorized use is prohibited.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            5. Service Availability
                        </h2>
                        <p>
                            We strive to keep the platform available at all times, but we do
                            not guarantee uninterrupted access. Features may change or be
                            discontinued without notice.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            6. Limitation of Liability
                        </h2>
                        <p>
                            Film Ledger is not liable for any indirect or consequential
                            damages arising from the use of the platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            7. Modifications
                        </h2>
                        <p>
                            These terms may be updated periodically. Continued use of the
                            platform indicates acceptance of updated terms.
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

export default TermsOfService;
