'use client';

import { useState } from 'react';

export default function Button({
    children,
    onClick,
    className = "",
    type = "button",
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [wasClicked, setWasClicked] = useState(false);
    
    // Extract text content from children
    const getTextContent = (node) => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(getTextContent).join('');
        if (node?.props?.children) return getTextContent(node.props.children);
        return '';
    };
    
    const text = getTextContent(children);
    const characters = text.split('');
    
    const handleClick = (e) => {
        setIsHovered(false);
        setWasClicked(true);
        onClick?.(e);
    };
    
    const handleMouseEnter = () => {
        setWasClicked(false);
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        if (!wasClicked) {
            setIsHovered(false);
        }
    };
    
    return (
        <button
                type={type}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`
                    button-rolling
                    ${isHovered && !wasClicked ? 'button-rolling-hovered' : ''}
                    ${wasClicked ? 'button-rolling-no-animate' : ''}
                    relative
                    flex items-center justify-center
                    px-4 py-2
                    rounded-lg
                    cursor-pointer
                    transform
                    transition-all duration-200 ease-out
                    hover:opacity-95
                    hover:-translate-y-0.25
                    hover:shadow-sm
                    active:translate-y-1.25
                    active:shadow-none
                    active:duration-180
                    active:ease-in
                    overflow-hidden
                    ${className}
                `}
                {...props}
            >
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
                                    transitionDelay: wasClicked 
                                        ? '0s' 
                                        : (isHovered 
                                            ? `${index * 0.02}s` 
                                            : `${(characters.length - index - 1) * 0.02}s`)
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
            </button>
    );
}

