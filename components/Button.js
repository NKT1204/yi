'use client';

import useRollingText from '@/hooks/useRollingText';

export default function Button({
    children,
    onClick,
    className = "",
    variant = "primary",
    type = "button",
    iconOnly = false,
    ...props
}) {
    const {
        characters,
        shouldAnimate,
        isHovered,
        wasClicked,
        getTransitionDelay,
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
    } = useRollingText(children, { disabled: iconOnly || variant === "ghost" });
    
    const baseClasses = [
        'button-rolling',
        isHovered && !wasClicked ? 'button-rolling-hovered' : '',
        wasClicked ? 'button-rolling-no-animate' : '',
        'relative flex items-center justify-center',
        iconOnly ? 'w-11 h-11 p-0 aspect-square' : 'px-4 py-2',
        'rounded-lg',
        'cursor-pointer',
        'transform transition-all duration-200 ease-out',
        'hover:opacity-95 hover:-translate-y-0.25 hover:shadow-sm',
        'active:translate-y-1.25 active:shadow-none active:duration-180 active:ease-in',
        'overflow-hidden',
        className
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
                type={type}
                onClick={(event) => handleClick(event, onClick)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={baseClasses}
                {...props}
            >
                {variant === "ghost" || iconOnly ? (
                    <span className="flex items-center justify-center w-full">
                        {children}
                    </span>
                ) : shouldAnimate ? (
                    <span className="inline-block">
                        {characters.map((char, index) => (
                            <span
                                key={index}
                                className="button-char-container"
                            >
                                <span 
                                    className="button-char-stack"
                                    style={{
                                        transform: wasClicked ? 'translateY(0)' : undefined,
                                        transitionDelay: getTransitionDelay(index)
                                    }}
                                >
                                    <span className="button-char-item">
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                    <span className="button-char-item">
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                </span>
                            </span>
                        ))}
                    </span>
                ) : (
                    <span className="flex items-center justify-center w-full">
                        {children}
                    </span>
                )}
            </button>
    );
}

