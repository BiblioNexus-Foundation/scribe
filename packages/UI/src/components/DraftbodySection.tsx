import React, { useState } from "@theia/core/shared/react";
import {
  IconClock,
  IconSortDescending,
  IconBookmark,
  IconReload,
  IconChevronsRight,
  IconChevronsLeft,
} from "@tabler/icons-react";
import Button from "./Button";
import ChapterNavigator from "./DropdownMenu";
import { IconDots } from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/Collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

const books = [
  {
    name: "Genesis",
    chapters: [
      {
        number: 1,
        text: `
      In the beginning God created the heaven and the earth. And the earth was without form, and void; 
      and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.
      And God said, Let there be light: and there was light. And God saw the light, that it was good: 
      and God divided the light from the darkness. And God called the light Day, and the darkness he called Night. 
      And the evening and the morning were the first day.

      And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters. 
      And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: 
      and it was so. And God called the firmament Heaven. And the evening and the morning were the second day.
      `,
      },
      {
        number: 2,
        text: `
      And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so. 
      And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.
      
      And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, 
      whose seed is in itself, upon the earth: and it was so. And the earth brought forth grass, and herb yielding seed after his kind, 
      and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good. 
      And the evening and the morning were the third day.

      And God said, Let there be lights in the firmament of the heaven to divide the day from the night; 
      and let them be for signs, and for seasons, and for days, and years: And let them be for lights in the firmament of the heaven 
      to give light upon the earth: and it was so. And God made two great lights; the greater light to rule the day, 
      and the lesser light to rule the night: he made the stars also. 
      `,
      },
      {
        number: 3,
        text: `
      Now the serpent was more crafty than any of the wild animals the Lord God had made. He said to the woman, 
      "Did God really say, 'You must not eat from any tree in the garden'?" 
      The woman said to the serpent, "We may eat fruit from the trees in the garden, 
      but God said, 'You shall not eat the fruit of the tree which is in the midst of the garden, 
      nor shall you touch it, lest you die.'"
      
      You will not surely die," the serpent said to the woman. "For God knows that in the day you eat of it, 
      your eyes will be opened, and you will be like God, knowing good and evil."
      `,
      },
      {
        number: 4,
        text: `
      Adam and Eve have two sons: Cain and Abel. Cain became a farmer, and Abel a shepherd. 
      In the course of time, Cain brought an offering of the fruit of the ground to the Lord. 
      Abel also brought an offering, the fat portions from some of the firstborn of his flock. 
      The Lord looked with favor on Abel and his offering, but on Cain and his offering He did not look with favor. 
      So Cain was very angry, and his face was downcast.

      Then the Lord said to Cain, "Why are you angry? Why is your face downcast? If you do what is right, 
      will you not be accepted? But if you do not do what is right, sin is crouching at your door; 
      it desires to have you, but you must rule over it."
      `,
      },
      {
        number: 5,
        text: `
      This is the written account of Adam's family line. When God created mankind, He made them in the likeness of God. 
      He created them male and female and blessed them. And He named them "Mankind" when they were created. 
      When Adam had lived 130 years, he had a son in his own likeness, in his own image; and he named him Seth. 
      After Seth was born, Adam lived 800 years and had other sons and daughters.
      `,
      },
      {
        number: 6,
        text: `
      When human beings began to increase in number on the earth and daughters were born to them, 
      the sons of God saw that the daughters of humans were beautiful, and they married any of them they chose. 
      Then the Lord said, "My Spirit will not contend with humans forever, for they are mortal; 
      their days will be a hundred and twenty years."

      The Nephilim were on the earth in those days—and also afterward—when the sons of God went to the daughters of humans 
      and had children by them. They were the heroes of old, men of renown.
      `,
      },
      {
        number: 7,
        text: `
      Then the Lord said to Noah, "Go into the ark, you and your whole family, because I have found you righteous 
      in this generation. Take with you seven pairs of every kind of clean animal, a male and its mate, 
      and one pair of every kind of unclean animal, a male and its mate, and also seven pairs of every kind of bird, 
      male and female, to keep their various kinds alive throughout the earth.

      Seven days from now I will send rain on the earth for forty days and forty nights, 
      and I will wipe from the face of the earth every living creature I have made."
      `,
      },
      {
        number: 8,
        text: `
      And the flood continued for forty days on the earth, and as the waters increased, they lifted the ark high above the earth. 
      The waters rose and increased greatly on the earth, and the ark floated on the surface of the water. 
      They rose greatly on the earth, and all the high mountains under the entire heavens were covered.

      The waters rose and covered the mountains to a depth of more than fifteen cubits. 
      Every living thing that moved on land perished—birds, livestock, wild animals, all the creatures that swarm over the earth, 
      and all mankind. Everything on dry land that had the breath of life in its nostrils died.
      `,
      },
      {
        number: 9,
        text: `
      Then God said to Noah, "Come out of the ark, you and your wife and your sons and their wives. 
      Bring out every kind of living creature that is with you—the birds, the animals, and all the creatures 
      that move along the ground—so they can multiply on the earth and be fruitful and increase in number on it."

      So Noah came out, together with his sons and his wife and his sons' wives. 
      All the animals and all the creatures that move along the ground and all the birds—everything that moves on land—came out of the ark, 
      one kind after another.
      `,
      },
      {
        number: 10,
        text: `
      This is the account of Shem, Ham and Japheth, Noah's sons, who themselves had sons after the flood. 
      The sons of Japheth: Gomer, Magog, Madai, Javan, Tubal, Meshech and Tiras. The sons of Gomer: Ashkenaz, Riphath and Togarmah. 
      The sons of Javan: Elishah, Tarshish, the Kittim and the Rodanim. From these the maritime peoples spread out into their territories 
      by their clans within their nations, each with its own language.

      The sons of Ham: Cush, Egypt, Put and Canaan. The sons of Cush: Seba, Havilah, Sabtah, Raamah and Sabtechah. 
      The sons of Raamah: Sheba and Dedan. Cush was the father of Nimrod, who became a mighty warrior on the earth. 
      He was a mighty hunter before the Lord; that is why it is said, "Like Nimrod, a mighty hunter before the Lord."
      `,
      },
    ],
  },
  {
    name: "Exodus",
    chapters: [
      { number: 1, text: "These are the names of the sons of Israel..." },
      { number: 2, text: "Now a man of the tribe of Levi married..." },
      { number: 3, text: "Now Moses was tending the flock of Jethro..." },
    ],
  },
  {
    name: "Matthew",
    chapters: [
      { number: 1, text: "This is the genealogy of Jesus the Messiah..." },
      { number: 2, text: "After Jesus was born in Bethlehem..." },
      {
        number: 3,
        text: "In those days John the Baptist came, preaching...",
      },
    ],
  },
  {
    name: "Psalms",
    chapters: [
      { number: 1, text: "Blessed is the one who does not walk..." },
      { number: 2, text: "The Lord is my shepherd, I lack nothing..." },
      {
        number: 3,
        text: "Whoever dwells in the shelter of the Most High...",
      },
    ],
  },
];

const sources = [
  {
    value: "New Revised Standard (NRS)",
    label: "New Revised (NRS)",
  },
  { value: "King James Version (KJV)", label: "King Version (KJV)" },
  {
    value: "New International Version (NIV)",
    label: "New Version (NIV)",
  },
  {
    value: "Christian Standard Bible (CSB)",
    label: "Christian  Bible (CSB)",
  },
  {
    value: "New King James Version (NKJV)",
    label: "New Version (NKJV)",
  },
  {
    value: "Good News Translation (GNT)",
    label: "News Translation (GNT)",
  },
];

function DraftbodySection() {
  const [activeBook, setActiveBook] = useState(null);
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  const handleBookClick = (bookName: any) => {
    setActiveBook(bookName === activeBook ? null : bookName);
    setActiveNumber(1); // Reset to the first chapter
  };

  const handleNext = () => {
    if (activeBook) {
      const book = books.find((b) => b.name === activeBook);
      if (!book) return;

      const currentChapterIndex = book.chapters.findIndex(
        (ch) => ch.number === activeNumber
      );
      if (currentChapterIndex < book.chapters.length - 1) {
        setActiveNumber(book.chapters[currentChapterIndex + 1].number);
      }
    }
  };

  const handlePrevious = () => {
    if (activeBook) {
      const book = books.find((b) => b.name === activeBook);
      if (!book) return;

      const currentChapterIndex = book.chapters.findIndex(
        (ch) => ch.number === activeNumber
      );
      if (currentChapterIndex > 0) {
        setActiveNumber(book.chapters[currentChapterIndex - 1].number);
      }
    }
  };

  const currentText =
    books
      .find((b) => b.name === activeBook)
      ?.chapters.find((chapter) => chapter.number === activeNumber)?.text || "";

  return (
    <div className="">
      <div className="flex gap-2 items-center border-b py-2.5 px-2 dark:border-zinc-900 border-zinc-200 justify-between ">
        <div className="flex gap-2 flex-1">
          <Button
            label=""
            className="  300 py-1 px-3 rounded hover:bg-gray-400"
            onClick={handlePrevious}
            icon={
              <IconChevronsLeft size={14} stroke={2} strokeLinejoin="miter" />
            }

            // disabled={
            //   !activeNumber || activeNumber === books[0]?.chapters[0]
            // }
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                label={` ${activeBook} book ${activeNumber}:0`}
                className="relative flex-row-reverse gap-3  text-[10px] flex item-center justify-content-center dark:text-gray-300 text-gray-600"
                icon={
                  <IconReload size={14} stroke={2} strokeLinejoin="miter" />
                }
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="transparent/0 w-[15rem] bg-zinc-800   border-r rounded-none  mt-2  absolute top-0 left-[-110px] z-50">
              <div className={`w-full h-[75vh]`}>
                <div className="flex justify-between items-center py-2">
                  <p className="text-[15px] px-2">Go To</p>
                  <div className="flex items-center ">
                    <Button
                      className="border-none dark:bg-transparent rounded-none dark:hover:bg-gray-900"
                      icon={
                        <IconSortDescending
                          size={20}
                          stroke={2}
                          strokeLinejoin="miter"
                        />
                      }
                    />
                    <Button
                      className=" dark:bg-transparent rounded-none border-none dark:hover:bg-gray-900"
                      icon={
                        <IconClock
                          size={20}
                          stroke={2}
                          strokeLinejoin="miter"
                        />
                      }
                    />
                    <Button
                      className=" dark:bg-transparent rounded-none border-none dark:hover:bg-gray-900"
                      icon={
                        <IconBookmark
                          size={20}
                          stroke={2}
                          strokeLinejoin="miter"
                        />
                      }
                    />
                  </div>
                </div>

                <div className="flex-1  px-2">
                  <p className="font-bold text-[13px]  mb-3">Old Testments</p>
                  <div className="flex overflow-auto max-h-[69vh] hide-scrollbar ">
                    <ul className="space-y-0 w-full">
                      {books.map((book, index) => (
                        <>
                          <li key={index}>
                            <Collapsible
                              key={index}
                              title={"name title"}
                              className="group/collapsible w-full"
                              open={activeBook === book.name}
                            >
                              <CollapsibleTrigger
                                className={` w-full justify-between  cursor-pointer p-2 rounded-md flex items-center space-x-2 text-[12px] 
                            ${
                              activeBook === book.name
                                ? "dark:text-cyan-500 text-white border-l-4  border-cyan-700"
                                : "bg-transparent"
                            }`}
                                onClick={() => handleBookClick(book.name)}
                              >
                                {book.name}
                                {/* <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" /> */}
                              </CollapsibleTrigger>

                              <CollapsibleContent>
                                <ChapterNavigator
                                  activeBookData={book.chapters}
                                  activeNumber={activeNumber}
                                  setActiveNumber={setActiveNumber}
                                  key={book.name}
                                />
                              </CollapsibleContent>
                            </Collapsible>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            label=""
            className="py-1 px-3 rounded hover:bg-gray-400"
            onClick={handleNext}
            icon={
              <IconChevronsRight size={14} stroke={2} strokeLinejoin="miter" />
            }

            // disabled={
            //   !activeNumber ||
            //   activeNumber ===
            //     books
            //       .find((b) => b.name === activeBook)
            //       ?.chapters.slice(-1)[0]
            // }
          />
          <select
            name="name"
            id=""
            className="w-fit h-8  capitalize gap-1   text-[10px] border dark:border-gray-500 border-gray-600 dark:text-gray-300 text-gray-600 rounded-md"
          >
            {sources?.map((data) => (
              <option key={data.value} value={data.value}>
                {data.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <div className="overflow-hidden rounded-xl p-[1px]">
            <Button
              label={"A"}
              className="border-transparent dark:bg-cyan-700 bg-cyan-300 text-cyan-500 rounded-none"
            />
            <Button
              label={"B"}
              className="rounded-r-lg border-none dark:bg-gray-900  bg-gray-200 rounded-none"
            />
          </div>
          <IconDots size={15} stroke={2} strokeLinejoin="miter" />
          {/* <IconX size={15} stroke={2} strokeLinejoin="miter" /> */}
        </div>{" "}
      </div>
      {/* start of body section */}
      <div className="flex w-full  max-h-[80vh]">
        <div className="flex-1 flex-col  hide-scrollbar px-2">
          <div
            className={`overflow-auto ${
              activeBook && activeNumber ? "h-[70vh]" : "h-[79vh]"
            } hide-scrollbar px-2`}
          >
            <p className="text-[12px] font-thin">
              {currentText ? currentText : "no selected data please select one"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DraftbodySection;
