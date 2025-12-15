import { memo, useState, forwardRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

const AnimatedInput = memo(
    forwardRef(function AnimatedInput(
        { className, type, ...props },
        ref
    ) {
        const radius = 100;
        const [visible, setVisible] = useState(false);

        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            ${visible ? radius + 'px' : '0px'} circle
                            at ${mouseX}px ${mouseY}px,
                            #ff0000,
                            transparent 80%
                        )
                    `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="group/input relative rounded-lg p-[2px] transition duration-300"
            >
                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        'flex h-12 w-full rounded-md bg-gray-50 px-4 py-3 text-base text-swiss-black shadow-md transition duration-300',
                        'placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    {...props}
                />
            </motion.div>
        );
    })
);

AnimatedInput.displayName = 'AnimatedInput';

export { AnimatedInput };
