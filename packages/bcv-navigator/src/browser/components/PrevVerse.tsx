import { useState, useEffect } from "react";
import React from "react";

// Type definitions
interface BibleNavState {
    book_abbr: string;
    book_name: string;
    chapter: number;
    verse: number;
}




export const PrevVerse = () => {
    const [currentVerse, setCurrentVerse] = useState<number>(1);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

    React.useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        // Initial check
        checkDarkMode();

        // Create observer to watch for class changes
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        // Start observing
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Get initial state from localStorage
        const savedState = JSON.parse(localStorage.getItem('bibleNavState') || '{}') as BibleNavState;
        if (savedState.verse) {
            setCurrentVerse(savedState.verse);
            setIsDisabled(savedState.verse <= 1);
        }

        // Listen for navigation updates
        const handleNavUpdate = () => {
            const updatedState = JSON.parse(localStorage.getItem('bibleNavState') || '{}') as BibleNavState;
            if (updatedState.verse) {
                setCurrentVerse(updatedState.verse);
                setIsDisabled(updatedState.verse <= 1);
            }
        };

        window.addEventListener('bibleNavUpdated', handleNavUpdate);
        return () => window.removeEventListener('bibleNavUpdated', handleNavUpdate);
    }, []);

    const handlePrevVerse = () => {
        if (currentVerse > 1) {
            const newVerse = currentVerse - 1;
            setCurrentVerse(newVerse);
            
            // Update localStorage
            const savedState = JSON.parse(localStorage.getItem('bibleNavState') || '{}') as BibleNavState;
            localStorage.setItem('bibleNavState', JSON.stringify({
                ...savedState,
                verse: newVerse
            }));
            
            window.dispatchEvent(new Event('bibleNavUpdated'));
        }
    };

    return (
        <button
            onClick={handlePrevVerse}
            disabled={isDisabled}
            className={`py-1 px-2 border-2 hover:border-blue-300 mr-2 rounded-lg
                ${isDarkMode ? 'text-zinc-50 hover:bg-cyan-400 border-cyan-700' : 'text-zinc-700'}
                ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : ''}`
            }
        >
            {'<'}
        </button>
    );
};