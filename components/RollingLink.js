'use client';

import Link from 'next/link';
import useRollingText from '@/hooks/useRollingText';

export default function RollingLink({
    href,
    children,
    className = "",
    as = "link",
    disableAnimation = false,
    onClick,
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
    } = useRollingText(children, { disabled: disableAnimation });

    const baseClasses = [
        'button-rolling inline-flex items-center',
        isHovered && !wasClicked ? 'button-rolling-hovered' : '',
        wasClicked ? 'button-rolling-no-animate' : '',
        className
    ]
        .filter(Boolean)
        .join(' ');

    const sharedProps = {
        href,
        className: baseClasses,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: (event) => handleClick(event, onClick),
        ...props
    };

    const content = shouldAnimate ? (
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
        <span className="inline-flex items-center">{children}</span>
    );

    if (as === "anchor") {
        return (
            <a {...sharedProps}>
                {content}
            </a>
        );
    }

    return (
        <Link {...sharedProps}>
            {content}
        </Link>
    );
}


