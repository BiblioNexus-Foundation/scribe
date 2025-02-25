// import * as React from "@theia/core/shared/react";
// import { useState, useEffect } from "react";
// import ChapterReading from "./ChapterReading";
// import BibleNavigation from "bcv-navigator/lib/browser/components/BibleNavigation";

// interface BibleNavState {
//   book_abbr: string;
//   book_name: string;
//   chapter: number;
//   verse: number;
// }

// const AudioComponents: React.FC = () => {
//   const [currentNav, setCurrentNav] = useState<BibleNavState | null>(() => {
//     // Initialize from localStorage on mount
//     const savedState = localStorage.getItem("bibleNavState");
//     return savedState ? JSON.parse(savedState) : null;
//   });
//   // const myScope = {
//   //   EXO: [],
//   //   PSA: [],
//   //   JHN: []
//   // };
//   useEffect(() => {
//     // Function to handle updates to localStorage
//     const handleStorageChange = () => {
//       const savedState = localStorage.getItem("bibleNavState");
//       if (savedState) {
//         setCurrentNav(JSON.parse(savedState));
//       }
//     };

//     // Listen for the custom event from the navigation component
//     window.addEventListener("bibleNavUpdated", handleStorageChange);

//     // Also listen for storage events (in case localStorage is updated from another tab)
//     window.addEventListener("storage", (e) => {
//       if (e.key === "bibleNavState") {
//         const newValue = e.newValue ? JSON.parse(e.newValue) : null;
//         setCurrentNav(newValue);
//       }
//     });

//     // Cleanup listeners on unmount
//     return () => {
//       window.removeEventListener("bibleNavUpdated", handleStorageChange);
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <>
//       <BibleNavigation
//         showPrevChapter={true}
//         showBookChapter={true}
//         showNextChapter={true}
//         // verseRefUtils={verseRefUtils} // Pass VerseRefUtils to BibleNavigation

//         // scope={myScope}
//       />

//       <div className="bg-[var(--theia-editor-background)]">
//         {currentNav && (
//           <ChapterReading
//             version="NLT"
//             chapterName={currentNav.book_name}
//             verse={currentNav.chapter.toString()}
//             scripture="John the Baptist Prepares the Way
// 1 This is the Good News about Jesus the Messiah, the Son of God. It began 2
// just as the prophet Isaiah had written:
// &quot;Look, I am sending my messenger ahead of you,
// and he will prepare your way.
// 3 He is a voice shouting in the wilderness,
// 'Prepare the way for the Lord's coming!
// Clear the road for him!&quot;
// 4 This messenger was John the Baptist. He was in the wilderness and
// preached that people should be baptized to show that they had repented of
// their sins and turned to God to be forgiven. 5 All of Judea, including all the
// people of Jerusalem, went out to see and hear John. And when they
//         confessed their sins, he baptized them in the Jordan River."
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default AudioComponents;

// // import * as React from "@theia/core/shared/react";
// // import { useState, useEffect, useRef } from "react";
// // import ChapterReading from "./ChapterReading";
// // import BibleNavigation from "bcv-navigator/lib/browser/components/BibleNavigation";

// // // Add the VerseRef interfaces
// // interface VerseRefValue {
// //   book: string;
// //   chapter: number;
// //   verse: number;
// // }

// // interface VerseRefUtilsInterface {
// //   getVerseRef(): Promise<VerseRefValue>;
// //   setVerseRef(verseRef: VerseRefValue): Promise<void>;
// //   onVerseRefChange(callback: (verseRef: VerseRefValue) => void): Promise<void>;
// // }

// // interface BibleNavState {
// //   book_abbr: string;
// //   book_name: string;
// //   chapter: number;
// //   verse: number;
// // }

// // const AudioComponents: React.FC = () => {
// //   const [currentNav, setCurrentNav] = useState<BibleNavState | null>(() => {
// //     // Initialize from localStorage on mount
// //     const savedState = localStorage.getItem("bibleNavState");
// //     return savedState ? JSON.parse(savedState) : null;
// //   });

// //   // Create a reference to store callbacks
// //   const verseRefCallbacks = useRef<((verseRef: VerseRefValue) => void)[]>([]);

// //   // Create verseRefUtils implementation
// //   const verseRefUtils: VerseRefUtilsInterface = {
// //     async getVerseRef(): Promise<VerseRefValue> {
// //       const savedState = localStorage.getItem("bibleNavState");
// //       const state = savedState ? JSON.parse(savedState) : { book_abbr: "GEN", chapter: 1, verse: 1 };
// //       return {
// //         book: state.book_abbr,
// //         chapter: state.chapter,
// //         verse: state.verse || 1 // Default to verse 1 if not specified
// //       };
// //     },

// //     async setVerseRef(verseRef: VerseRefValue): Promise<void> {
// //       // Update the navigation state
// //       const bookName = getBookName(verseRef.book); // You would need to implement this function
// //       const newState: BibleNavState = {
// //         book_abbr: verseRef.book,
// //         book_name: bookName,
// //         chapter: verseRef.chapter,
// //         verse: verseRef.verse
// //       };

// //       localStorage.setItem("bibleNavState", JSON.stringify(newState));
// //       setCurrentNav(newState);

// //       // Notify all registered callbacks
// //       verseRefCallbacks.current.forEach(callback => callback(verseRef));
// //     },

// //     async onVerseRefChange(callback: (verseRef: VerseRefValue) => void): Promise<void> {
// //       verseRefCallbacks.current.push(callback);
// //     }
// //   };

// //   // Helper function to get book name from abbreviation
// //   const getBookName = (bookAbbr: string): string => {
// //     // This is a simplified example. You should replace this with your actual book mapping.
// //     const bookMap: Record<string, string> = {
// //       GEN: "Genesis",
// //       EXO: "Exodus",
// //       PSA: "Psalms",
// //       JHN: "John",
// //       // Add all other books as needed
// //     };

// //     return bookMap[bookAbbr] || bookAbbr;
// //   };

// //   useEffect(() => {
// //     // Function to handle updates to localStorage
// //     const handleStorageChange = () => {
// //       const savedState = localStorage.getItem("bibleNavState");
// //       if (savedState) {
// //         setCurrentNav(JSON.parse(savedState));
// //       }
// //     };

// //     // Listen for the custom event from the navigation component
// //     window.addEventListener("bibleNavUpdated", handleStorageChange);

// //     // Also listen for storage events (in case localStorage is updated from another tab)
// //     window.addEventListener("storage", (e) => {
// //       if (e.key === "bibleNavState") {
// //         const newValue = e.newValue ? JSON.parse(e.newValue) : null;
// //         setCurrentNav(newValue);
// //       }
// //     });

// //     // Cleanup listeners on unmount
// //     return () => {
// //       window.removeEventListener("bibleNavUpdated", handleStorageChange);
// //       window.removeEventListener("storage", handleStorageChange);
// //     };
// //   }, []);

// //   return (
// //     <>
// //       <BibleNavigation
// //         showPrevChapter={true}
// //         showBookChapter={true}
// //         showNextChapter={true}
// //         verseRefUtils={verseRefUtils} // Now passing a defined verseRefUtils object
// //         // scope={myScope}
// //       />

// //       <div className="bg-[var(--theia-editor-background)]">
// //         {currentNav && (
// //           <ChapterReading
// //             version="NLT"
// //             chapterName={currentNav.book_name}
// //             verse={currentNav.chapter.toString()}
// //             scripture="John the Baptist Prepares the Way 1 This is the Good News about Jesus the Messiah, the Son of God. It began 2 just as the prophet Isaiah had written: &quot;Look, I am sending my messenger ahead of you, and he will prepare your way. 3 He is a voice shouting in the wilderness, 'Prepare the way for the Lord's coming! Clear the road for him!&quot; 4 This messenger was John the Baptist. He was in the wilderness and preached that people should be baptized to show that they had repented of their sins and turned to God to be forgiven. 5 All of Judea, including all the people of Jerusalem, went out to see and hear John. And when they confessed their sins, he baptized them in the Jordan River."
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default AudioComponents;

import * as React from "@theia/core/shared/react";
import { useState, useEffect } from "react";
import ChapterReading from "./ChapterReading";
import BibleNavigation from "bcv-navigator/lib/browser/components/BibleNavigation";
import { VerseRefUtils } from "@scribe/theia-utils/lib/browser";
import { VerseRefValue } from "bcv-navigator/lib/browser/components/BibleNavigation";

interface AudioComponentsProps {
  verseRefUtils: VerseRefUtils;
}

const AudioComponents: React.FC<AudioComponentsProps> = ({ verseRefUtils }) => {
  const [currentNav, setCurrentNav] = useState<VerseRefValue | null>(null);
  const myScope = {
    EXO: [],
    PSA: [],
    JHN: [],
  };

  // Load initial verse reference on mount
  useEffect(() => {
    if (verseRefUtils) {
      verseRefUtils
        .getVerseRef()
        .then((verseRef) => {
          setCurrentNav(verseRef);
        })
        .catch((error) => {
          console.error("Failed to get verse reference:", error);
        });

      // Subscribe to verse reference changes
      verseRefUtils.onVerseRefChange((verseRef) => {
        setCurrentNav(verseRef);
      });
    }
  }, [verseRefUtils]);

  return (
    <>
      <BibleNavigation
        showPrevChapter={true}
        showPrevVerse={true}
        showBookChapter={true}
        showNextVerse={true}
        showNextChapter={true}
        verseRefUtils={verseRefUtils}
        // scope={myScope}
      />

      <div className="bg-[var(--theia-editor-background)]">
        {currentNav && (
          <ChapterReading
            version="NLT"
            chapterName={currentNav.book} // You might need to convert book code to name
            verse={currentNav.chapter.toString()}
            scripture="John the Baptist Prepares the Way 1 This is the Good News about Jesus the Messiah, the Son of God. It began 2 just as the prophet Isaiah had written: &quot;Look, I am sending my messenger ahead of you, and he will prepare your way. 3 He is a voice shouting in the wilderness, 'Prepare the way for the Lord's coming! Clear the road for him!&quot; 4 This messenger was John the Baptist. He was in the wilderness and preached that people should be baptized to show that they had repented of their sins and turned to God to be forgiven. 5 All of Judea, including all the people of Jerusalem, went out to see and hear John. And when they confessed their sins, he baptized them in the Jordan River."
          />
        )}
      </div>
    </>
  );
};

export default AudioComponents;
