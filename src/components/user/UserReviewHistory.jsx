import React from 'react';
import Card from '@/components/ui/Card';

const dummyHistory = [
    { id: 1, movie: "Inception", rating: 5, date: "2023-10-01", comment: "Mind blowing." },
    { id: 2, movie: "The Dark Knight", rating: 5, date: "2023-09-15", comment: "Best superhero movie." },
    { id: 3, movie: "Tenet", rating: 3.5, date: "2023-08-20", comment: "Confusing but visually stunning." }
];

const UserReviewHistory = () => {
    return (
        <div className="space-y-6">
            {/* Section Header */}
            <h3 className="
                text-lg font-extrabold tracking-wide
                text-black border-b border-red-600/30
                pb-3
            ">
                Review History
            </h3>

            {dummyHistory.map(review => (
                <Card
                    key={review.id}
                    className="
                        flex gap-4 p-4
                        bg-white border border-zinc-200
                        rounded-2xl shadow-sm
                        hover:shadow-md transition-shadow
                    "
                >
                    {/* Poster Placeholder */}
                    <div className="
                        w-16 h-24 flex-shrink-0
                        bg-zinc-900 rounded-lg
                        flex items-center justify-center
                        text-white text-xs font-bold
                        tracking-widest
                    ">
                        POSTER
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-base text-black">
                                {review.movie}
                            </h4>
                            <span className="
                                text-xs font-extrabold
                                text-red-600
                                tracking-wide
                            ">
                                {review.rating} / 5
                            </span>
                        </div>

                        <p className="
                            text-sm text-zinc-600
                            mt-1 line-clamp-2
                        ">
                            {review.comment}
                        </p>

                        <span className="
                            text-[11px] text-zinc-400
                            mt-3 block
                            tracking-wide
                        ">
                            {review.date}
                        </span>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default UserReviewHistory;
