import { useState } from 'react';
import {MdOutlineInfo, MdInsertDriveFile, MdCheckCircleOutline, MdMoreVert} from 'react-icons/md';
import type { IconType } from "react-icons";

type Page = {
  id: string;
  title: string;
  icon: IconType;
};

const intialTabs : Page[] = [
  {
    id: '1',
    title: 'Info',
    icon: MdOutlineInfo
  }, {
    id: '2',
    title: 'Details',
     icon: MdInsertDriveFile
  }, {
    id: '3',
    title: 'Other',
     icon: MdInsertDriveFile
  },
  {
    id: '4',
    title: 'Ending',
     icon: MdCheckCircleOutline
  }
];



const FormTabs = ({Icon, isActive, onClick, setToggleMenu} : {
  Icon: IconType;
  isActive: boolean; 
}) => {

  return (
    <div className='flex items-center p-1' onClick = {onClick}>
      {isActive? 
        <MdMoreVert size={18} /> : 
        <Icon size={18} onClick={() => setToggleMenu(true)}/>}
    </div>
  )
}

function App() {
  const [toggleMenu, setToggleMenu] = useState(false); 
  const [tabs, setTabs] = useState(intialTabs);
  const [activeTabId, setActiveTabId] = useState<string>(intialTabs[0].id);
  const handleAddPage = () => {
    const tempTabs = tabs;
    const newTab = {
      id: '5',
      title: 'Email Address',
      icon: MdInsertDriveFile
    }

    setTabs([...tempTabs, newTab]);
  }
  

  return (
    <>
      <div className='font-bold'> Fillout Forms</div>
      <div className='flex '>
        {tabs.map((tab) => 
          <div 
            className={`flex border border-gray-200 p-2 rounded-md m-3 ${tab.id === activeTabId ? 'bg-white' : ' bg-gray-200 text-gray-500'} cursor-pointer`}
            > 
            <FormTabs 
              Icon={tab.icon} 
              isActive={tab.id === activeTabId}
              onClick={() => setActiveTabId(tab.id)}/>
            <span onClick={() => setActiveTabId(tab.id)}>{tab.title} </span>
          </div>
        )}
        <button
              onClick={handleAddPage}
              className="p-2 m-3 rounded-md border border-b-0 bg-green-600 text-white hover:bg-green-700 select-none"
            >
              + Add Page
            </button>
      </div>
    </>
  )
}

export default App
