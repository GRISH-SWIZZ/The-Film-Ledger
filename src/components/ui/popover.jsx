'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

function Popover(props) {
    return <PopoverPrimitive.Root {...props} />;
}

function PopoverTrigger(props) {
    return <PopoverPrimitive.Trigger {...props} />;
}

function PopoverContent({
    className,
    align = 'end',
    side = 'bottom',
    sideOffset = 12,
    ...props
}) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                align={align}
                side={side}
                sideOffset={sideOffset}
                className={cn(
                    // ✅ CLEAN BASE
                    'z-50 min-w-[16rem] rounded-xl border bg-white text-swiss-black shadow-lg',

                    // ✅ SMOOTH ANIMATION
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                    'data-[side=bottom]:slide-in-from-top-2',
                    'data-[side=top]:slide-in-from-bottom-2',
                    'data-[side=left]:slide-in-from-right-2',
                    'data-[side=right]:slide-in-from-left-2',

                    className
                )}
                {...props}
            />
        </PopoverPrimitive.Portal>
    );
}

/* ---------- STRUCTURE ---------- */

function PopoverHeader({ className, ...props }) {
    return (
        <div
            className={cn(
                'px-4 py-3 border-b bg-gray-50 rounded-t-xl',
                className
            )}
            {...props}
        />
    );
}

function PopoverTitle({ className, ...props }) {
    return (
        <p className={cn('text-sm font-semibold', className)} {...props} />
    );
}

function PopoverDescription({ className, ...props }) {
    return (
        <p className={cn('text-xs text-gray-500', className)} {...props} />
    );
}

function PopoverBody({ className, ...props }) {
    return (
        <div className={cn('px-2 py-2', className)} {...props} />
    );
}

function PopoverFooter({ className, ...props }) {
    return (
        <div
            className={cn(
                'px-4 py-3 border-t bg-gray-50 rounded-b-xl',
                className
            )}
            {...props}
        />
    );
}

/* ---------- OPTIONAL ---------- */

function PopoverAnchor(props) {
    return <PopoverPrimitive.Anchor {...props} />;
}

function PopoverClose(props) {
    return <PopoverPrimitive.Close {...props} />;
}

export {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverDescription,
    PopoverBody,
    PopoverFooter,
    PopoverAnchor,
    PopoverClose,
};
