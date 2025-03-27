import React from '@theia/core/shared/react';
import { Circle } from 'lucide-react';

export default function Sidebar() {
  const data = [
    {
      section: 'Sources',
      items: [
        'Text Bible',
        'Open Bible Story',
        'Bible Commentary',
        'Greek Lexicon',
        'Hebrew Dictionary',
        'Maps and Charts',
      ],
    },
    {
      section: 'Notes',
      items: [
        'Note on verse 1',
        'Explanation of context',
        'Historical note',
        'Word study note',
        'Cultural background',
      ],
    },
    {
      section: 'References',
      items: [
        'Genesis 1:1',
        'John 3:16',
        'Romans 8:28',
        'Psalm 23',
        'Matthew 5:3-12',
      ],
    },
    {
      section: 'Comments',
      items: [
        'This verse is powerful.',
        'Loved the imagery here.',
        'Interesting theological point.',
        'Reminds me of another passage.',
        'Great for reflection.',
      ],
    },
  ];

  return (
    <div className='w-64 border-r border-blue-200 p-4'>
      <div className='mb-6'>
        <h3 className='text-sm font-medium mb-2 text-cyan-600'>Navigate to</h3>
        <div className='h-[70vh] overflow-scroll '>
          {data.map((sectionData, idx) => (
            <div key={idx} className='mb-4'>
              <h4 className='text-sm text-gray-500 mb-1'>
                {sectionData.section}
              </h4>
              <div className='space-y-1'>
                {sectionData.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className='flex items-center gap-2 p-2 rounded hover:bg-gray-100'
                  >
                    <span className='text-sm'>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
