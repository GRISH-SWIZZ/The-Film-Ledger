import * as React from "react";
import { cn } from "@/lib/utils";
import { Play, X } from "lucide-react";

const VideoPlayer = React.forwardRef(
    (
        {
            className,
            thumbnailUrl,
            videoUrl,
            title,
            description,
            aspectRatio = "16/9",
            ...props
        },
        ref
    ) => {
        const [isModalOpen, setIsModalOpen] = React.useState(false);

        React.useEffect(() => {
            const handleEsc = (event) => {
                if (event.key === "Escape") {
                    setIsModalOpen(false);
                }
            };
            window.addEventListener("keydown", handleEsc);
            return () => {
                window.removeEventListener("keydown", handleEsc);
            };
        }, []);

        React.useEffect(() => {
            if (isModalOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, [isModalOpen]);

        return (
            <>
                <div
                    ref={ref}
                    className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-lg shadow-lg border-2 border-gray-200 hover:border-swiss-red",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red focus-visible:ring-offset-2",
                        className
                    )}
                    style={{ aspectRatio }}
                    onClick={() => setIsModalOpen(true)}
                    onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
                    tabIndex={0}
                    aria-label={`Play video: ${title}`}
                    {...props}
                >
                    <img
                        src={thumbnailUrl}
                        alt={`Thumbnail for ${title}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-swiss-red/80 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-swiss-red shadow-xl">
                            <Play className="h-10 w-10 fill-white text-white ml-1" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h3>
                        {description && (
                            <p className="mt-1 text-sm text-white/90 drop-shadow-md">{description}</p>
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in-0"
                        aria-modal="true"
                        role="dialog"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 border-2 border-white/20"
                            aria-label="Close video player"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="w-full max-w-5xl aspect-video p-4" onClick={(e) => e.stopPropagation()}>
                            <iframe
                                src={videoUrl}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full rounded-lg shadow-2xl"
                            ></iframe>
                        </div>
                    </div>
                )}
            </>
        );
    }
);
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
