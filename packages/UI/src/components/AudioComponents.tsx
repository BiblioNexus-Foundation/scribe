import * as React from "@theia/core/shared/react";
import { useState, useEffect } from 'react';
import ChapterReading from "./ChapterReading";
import BibleNavigation from 'bcv-navigator/lib/browser/components/BibleNavigation';

interface BibleNavState {
  book_abbr: string;
  book_name: string;
  chapter: number;
  verse: number;
}


const AudioComponents: React.FC = () => {
  const [currentNav, setCurrentNav] = useState<BibleNavState | null>(() => {
    // Initialize from localStorage on mount
    const savedState = localStorage.getItem('bibleNavState');
    return savedState ? JSON.parse(savedState) : null;
  });
  // const myScope = {
  //   EXO: [],
  //   PSA: [],
  //   JHN: []
  // };
  useEffect(() => {
    // Function to handle updates to localStorage
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('bibleNavState');
      if (savedState) {
        setCurrentNav(JSON.parse(savedState));
      }
    };

    // Listen for the custom event from the navigation component
    window.addEventListener('bibleNavUpdated', handleStorageChange);

    // Also listen for storage events (in case localStorage is updated from another tab)
    window.addEventListener('storage', (e) => {
      if (e.key === 'bibleNavState') {
        const newValue = e.newValue ? JSON.parse(e.newValue) : null;
        setCurrentNav(newValue);
      }
    });

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('bibleNavUpdated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <BibleNavigation
        showPrevChapter={true}
        showBookChapter={true}
        showNextChapter={true}
      // scope={myScope} 
      />

      <div className="bg-[var(--theia-editor-background)]">
        {currentNav &&
          <ChapterReading
            version="NLT"
            chapterName={currentNav.book_name}
            verse={currentNav.chapter.toString()}
            scripture="John the Baptist Prepares the Way
1 This is the Good News about Jesus the Messiah, the Son of God. It began 2
just as the prophet Isaiah had written:
&quot;Look, I am sending my messenger ahead of you,
and he will prepare your way.
3 He is a voice shouting in the wilderness,
'Prepare the way for the Lord's coming!
Clear the road for him!&quot;
4 This messenger was John the Baptist. He was in the wilderness and
preached that people should be baptized to show that they had repented of
their sins and turned to God to be forgiven. 5 All of Judea, including all the
people of Jerusalem, went out to see and hear John. And when they
        confessed their sins, he baptized them in the Jordan River."
          />
        }
      </div>
    </>
  );
}

export default AudioComponents;
