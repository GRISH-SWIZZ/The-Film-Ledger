import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const stars = [
    {
        id: 1,
        name: "Rajinikanth",
        image: "/stars/rajini.jpg",
        description:
            "The Superstar of Indian cinema, known for unmatched charisma and cultural impact."
    },
    {
        id: 2,
        name: "Kamal Haasan",
        image: "/stars/kamal.jpg",
        description:
            "Legendary actor celebrated for versatility, realism, and experimental cinema."
    },
    {
        id: 3,
        name: "Ajith Kumar",
        image: "/stars/ajith.jpg",
        description:
            "Known for intense performances and a loyal fan base."
    },
    {
        id: 4,
        name: "Vijay",
        image: "/stars/vijay.jpg",
        description:
            "A contemporary icon with massive youth following."
    },
    {
        id: 5,
        name: "Dhanush",
        image: "/stars/dhanush.jpg",
        description:
            "National Award-winning actor with global recognition."
    },
    {
        id: 6,
        name: "Sivakarthikeyan",
        image: "/stars/sk.jpg",
        description:
            "Popular entertainer with strong family-audience appeal."
    },
    {
        id: 6,
        name: "Suriya",
        image: "/stars/suriya.jpg",
        description:
            "Popular entertainer with strong family-audience appeal."
    }
];

const KollywoodShowcase = () => {
    const [activeStar, setActiveStar] = useState(null);

    return (
        <section className="relative py-24 bg-swiss-black overflow-hidden">
            {/* HEADER */}
            <div className="container-custom mb-16">
                <h2 className="text-5xl font-extrabold text-white mb-2">
                    Kollywood <span className="text-swiss-red">Icons</span>
                </h2>
                <p className="text-gray-400 max-w-2xl text-lg">
                    Celebrating the legends and modern stars of Tamil cinema.
                </p>
            </div>

            {/* AUTO SCROLL STRIP */}
            <div className="relative overflow-hidden">
                <motion.div
                    className="flex gap-10 px-10 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 35,
                        ease: "linear"
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {[...stars, ...stars].map((star, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.08, y: -10 }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            className="relative min-w-[260px] cursor-pointer"
                            onClick={() => setActiveStar(star)}
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src={star.image}
                                    alt={star.name}
                                    className="h-[360px] w-full object-cover"
                                />

                                {/* GRADIENT */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                {/* NAME */}
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-xl font-bold text-white">
                                        {star.name}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {activeStar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-[#0f0f0f] max-w-4xl w-full rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl"
                        >
                            <img
                                src={activeStar.image}
                                alt={activeStar.name}
                                className="h-full w-full object-cover"
                            />

                            <div className="p-12 text-white flex flex-col justify-center">
                                <h3 className="text-4xl font-extrabold mb-4">
                                    {activeStar.name}
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {activeStar.description}
                                </p>
                            </div>

                            <button
                                onClick={() => setActiveStar(null)}
                                className="absolute top-6 right-6 text-white hover:text-swiss-red transition"
                            >
                                <FaTimes size={22} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default KollywoodShowcase;
