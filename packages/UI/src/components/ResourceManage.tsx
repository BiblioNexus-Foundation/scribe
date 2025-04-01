import React, { useState } from '@theia/core/shared/react';
import { BookPlus, Plus, X } from 'lucide-react';
import ResourceTable from './resource-table';
import Sidebar from './siderbar';

const resources = [
  {
    type: 'Text Bible',
    items: [
      {
        title: 'King James Version (KJV)',
        language: 'eng',
        publisher: 'Cambridge University Press',
        year: '1611',
        hasDownload: true,
      },
      {
        title: 'New International Version (NIV)',
        language: 'eng',
        publisher: 'Biblica',
        year: '1978',
        hasDownload: true,
      },
      {
        title: 'English Standard Version (ESV)',
        language: 'eng',
        publisher: 'Crossway',
        year: '2001',
        hasDownload: false,
      },
      {
        title: 'La Biblia de las Américas (LBLA)',
        language: 'spa',
        publisher: 'Lockman Foundation',
        year: '1986',
        hasDownload: true,
      },
      {
        title: 'Lutherbibel',
        language: 'deu',
        publisher: 'Deutsche Bibelgesellschaft',
        year: '2017',
        hasDownload: false,
      },
      {
        title: 'Louis Segond (LSG)',
        language: 'fra',
        publisher: 'Alliance Biblique Française',
        year: '1910',
        hasDownload: true,
      },
      {
        title: 'Hausa Bible',
        language: 'hau',
        publisher: 'Bible Society of Nigeria',
        year: '1980',
        hasDownload: true,
      },
      {
        title: 'Swahili Union Bible (SUV)',
        language: 'swh',
        publisher: 'Bible Society of Kenya',
        year: '2000',
        hasDownload: false,
      },
      {
        title: 'Chinese Union Version (CUV)',
        language: 'zho',
        publisher: 'United Bible Societies',
        year: '1919',
        hasDownload: true,
      },
      {
        title: 'Tamil Bible',
        language: 'tam',
        publisher: 'Bible Society of India',
        year: '2005',
        hasDownload: true,
      },
    ],
  },
  {
    type: 'Open Bible Story',
    items: [
      {
        title: 'The Story of Jesus for Children',
        language: 'eng',
        publisher: 'Jesus Film Project',
        year: '2000',
        hasDownload: true,
      },
      {
        title: 'Historias Bíblicas Ilustradas',
        language: 'spa',
        publisher: 'Sociedades Bíblicas Unidas',
        year: '2010',
        hasDownload: true,
      },
      {
        title: 'Die Bibel in Bildern',
        language: 'deu',
        publisher: 'Gustave Doré',
        year: '1866',
        hasDownload: false,
      },
      {
        title: 'Illustrated Bible Stories',
        language: 'eng',
        publisher: 'Usborne Publishing',
        year: '2015',
        hasDownload: true,
      },
      {
        title: 'Les Histoires de la Bible',
        language: 'fra',
        publisher: 'Éditions Bibliques',
        year: '2012',
        hasDownload: false,
      },
      {
        title: 'Kiswahili Bible Stories',
        language: 'swh',
        publisher: 'Bible Society of Tanzania',
        year: '2018',
        hasDownload: true,
      },
      {
        title: 'The Bible Storybook for Kids',
        language: 'eng',
        publisher: 'Zonderkidz',
        year: '2021',
        hasDownload: false,
      },
      {
        title: 'Children’s Illustrated Bible',
        language: 'eng',
        publisher: 'Dorling Kindersley',
        year: '1994',
        hasDownload: true,
      },
    ],
  },
  {
    type: 'Study Guides',
    items: [
      {
        title: 'NIV Study Bible',
        language: 'eng',
        publisher: 'Zondervan',
        year: '1985',
        hasDownload: true,
      },
      {
        title: 'The MacArthur Study Bible',
        language: 'eng',
        publisher: 'Thomas Nelson',
        year: '1997',
        hasDownload: true,
      },
      {
        title: 'Luther’s Study Bible',
        language: 'deu',
        publisher: 'Deutsche Bibelgesellschaft',
        year: '2010',
        hasDownload: false,
      },
      {
        title: 'La Biblia de Estudio',
        language: 'spa',
        publisher: 'Editorial Vida',
        year: '2008',
        hasDownload: true,
      },
      {
        title: 'The Reformation Study Bible',
        language: 'eng',
        publisher: 'Ligonier Ministries',
        year: '2015',
        hasDownload: false,
      },
      {
        title: 'ESV Gospel Transformation Study Bible',
        language: 'eng',
        publisher: 'Crossway',
        year: '2013',
        hasDownload: true,
      },
    ],
  },
  {
    type: 'Biblical Commentaries',
    items: [
      {
        title: 'Matthew Henry’s Commentary',
        language: 'eng',
        publisher: 'Hendrickson Publishers',
        year: '1706',
        hasDownload: true,
      },
      {
        title: 'John Calvin’s Commentaries',
        language: 'eng',
        publisher: 'Baker Academic',
        year: '1559',
        hasDownload: false,
      },
      {
        title: 'El Comentario Bíblico de Matthew Henry',
        language: 'spa',
        publisher: 'Editorial CLIE',
        year: '1980',
        hasDownload: true,
      },
      {
        title: 'Luther’s Commentary on Galatians',
        language: 'deu',
        publisher: 'Fortress Press',
        year: '1535',
        hasDownload: true,
      },
      {
        title: 'Jamieson-Fausset-Brown Commentary',
        language: 'eng',
        publisher: 'S.W. Green',
        year: '1871',
        hasDownload: false,
      },
      {
        title: 'Keil & Delitzsch Old Testament Commentary',
        language: 'eng',
        publisher: 'Hendrickson',
        year: '1861',
        hasDownload: true,
      },
    ],
  },
  {
    type: 'Theology Books',
    items: [
      {
        title: 'Mere Christianity',
        language: 'eng',
        publisher: 'HarperOne',
        year: '1952',
        hasDownload: false,
      },
      {
        title: 'The Knowledge of the Holy',
        language: 'eng',
        publisher: 'HarperCollins',
        year: '1961',
        hasDownload: true,
      },
      {
        title: 'Les Confessions de Saint Augustin',
        language: 'fra',
        publisher: 'Librairie Philosophique J. Vrin',
        year: '397',
        hasDownload: true,
      },
      {
        title: 'The Cost of Discipleship',
        language: 'eng',
        publisher: 'Touchstone',
        year: '1937',
        hasDownload: true,
      },
      {
        title: 'Basic Christianity',
        language: 'eng',
        publisher: 'IVP Books',
        year: '1958',
        hasDownload: false,
      },
      {
        title: 'La Imitación de Cristo',
        language: 'spa',
        publisher: 'Editorial Claretiana',
        year: '1418',
        hasDownload: true,
      },
    ],
  },
];

function ResourceManage() {
  const [activeItem, setActiveItem] = useState('Text Bible');

  const handleItemSelect = (type: string) => {
    setActiveItem(type);
  };

  return (
    <div>
      <div className='flex gap-4 p-4 py-10'>
        <p className='  text-foreground font-bold text-xl'>Resources :</p>
        <button className='text-sm text-muted flex gap-2 justify-center items-center px-4 py-2 bg-cyan-800 rounded-md rounded-lg'>
          <BookPlus className='h-3.5 w-3.5' />
          Import Resources
        </button>
      </div>
      <div className='flex flex-col border border-border rounded  ov'>
        {/* Filter Section */}
        <div className='border-b border-border gap-4 p-3 flex justify-between items-center bg-background sticky top-0 z-10 '>
          <div className='w-48 flex items-end justify-end'>
            <h2 className='font-medium text-foreground'>Filter</h2>
          </div>
          <div className='flex flex-1 items-center gap-3 px-4'>
            <div className='relative flex-1'>
              <input
                type='text'
                placeholder='Find Title...'
                className='pl-3  py-1.5 border border-border rounded w-full text-sm bg-input text-foreground'
              />
            </div>
            <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
              <Plus className='h-3.5 w-3.5' />
              <span>Language</span>
            </button>
            <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
              <Plus className='h-3.5 w-3.5' />
              <span>Publisher</span>
            </button>
            <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
              <Plus className='h-3.5 w-3.5' />
              <span>Year</span>
            </button>
            <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
              <Plus className='h-3.5 w-3.5' />
              <span>Status</span>
            </button>
            <div className='flex hover:text-cyan-600 cursor-pointer items-center justify-center gap-2'>
              <button className='text-sm text-muted hover:text-foreground'>
                Reset
              </button>
              <X className='h-3.5 w-3.5 text-muted' />
            </div>
          </div>
        </div>

        <div className='flex flex-1 overflow-hidden'>
          <Sidebar
            activeItem={activeItem}
            onItemSelect={handleItemSelect}
            resources={resources}
          />
          <div className='w-full'>
            <ResourceTable activeItem={activeItem} resources={resources} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceManage;
