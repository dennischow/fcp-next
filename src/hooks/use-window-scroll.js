import { useState, useEffect } from "react";

const useWindowScroll = () => {
    const [windowScroll, setWindowScroll] = useState({
        x: 0,
        y: 0,
        percentage: 0,
    });

    const onScrollHandler = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);

        setWindowScroll({
            x: window.scrollX,
            y: window.scrollY,
            percentage: scrollPercentRounded,
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", onScrollHandler);
        return () => window.removeEventListener("scroll", onScrollHandler);
    }, []);

    return windowScroll;
};

export default useWindowScroll;
