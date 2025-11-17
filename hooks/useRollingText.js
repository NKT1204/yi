'use client';

import { useMemo, useState } from 'react';

export function getTextContent(node) {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (node?.props?.children) return getTextContent(node.props.children);
    return '';
}

export default function useRollingText(children, { disabled = false } = {}) {
    const text = useMemo(() => getTextContent(children), [children]);
    const shouldAnimate = !disabled && text.length > 0;

    const characters = useMemo(
        () => (shouldAnimate ? text.split('') : []),
        [shouldAnimate, text]
    );

    const [isHovered, setIsHovered] = useState(false);
    const [wasClicked, setWasClicked] = useState(false);

    const handleMouseEnter = () => {
        if (!shouldAnimate) return;
        setWasClicked(false);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!shouldAnimate) return;
        if (!wasClicked) {
            setIsHovered(false);
        }
    };

    const handleClick = (event, userHandler) => {
        if (shouldAnimate) {
            setIsHovered(false);
            setWasClicked(true);
        }
        userHandler?.(event);
    };

    const getTransitionDelay = (index) => {
        if (!shouldAnimate || characters.length === 0) return '0s';
        if (wasClicked) return '0s';
        return isHovered
            ? `${index * 0.02}s`
            : `${(characters.length - index - 1) * 0.02}s`;
    };

    return {
        text,
        characters,
        shouldAnimate,
        isHovered,
        wasClicked,
        getTransitionDelay,
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
    };
}


