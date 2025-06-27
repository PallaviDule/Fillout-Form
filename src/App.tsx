import { useState } from 'react';
import {MdOutlineInfo, MdInsertDriveFile, 
  MdCheckCircleOutline, MdMoreVert, MdDeleteOutline, 
  MdContentCopy, MdCopyAll, MdDriveFileRenameOutline, MdClose,
MdFlag} from 'react-icons/md';
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



const FormTabs = ({Icon,onClick} : {
  Icon: IconType;
  onClick: () => void;
}) => {
  return (
    <div className='flex items-center p-1'>
        <Icon size={18} onClick={onClick}/>
    </div>
  )
}

function App() {
  const [menuOpenTabId, setMenuOpenTabId] = useState<string | null>(null);
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
  
  console.log('menuOpenTabId:', menuOpenTabId);
  return (
    <>
      <div className='font-bold'> Fillout Forms</div>
      <div className='flex'>
        {tabs.map((tab) => 
          <div 
            className={`relative flex border border-gray-200 p-2 rounded-md m-3 ${tab.id === activeTabId ? 'bg-white' : ' bg-gray-200 text-gray-500'} hover:bg-gray-300 cursor-pointer`}
            > 
            <FormTabs 
              Icon={tab.icon} 
              onClick={() => setActiveTabId(tab.id)}
              />
            <span onClick={() => setActiveTabId(tab.id)}>{tab.title} </span>  
            {tab.id === activeTabId &&  
              <div className='flex items-center p-1'>
                <MdMoreVert 
                          size={18} 
                          onClick={() => setMenuOpenTabId((prev) => (prev === tab.id ? '' : tab.id))}/>
              </div>}
            {(menuOpenTabId === tab.id && tab.id === activeTabId) && (
              <div 
                className="absolute left-0 mt-10 w-40 bg-white border rounded shadow z-10"
              >
                <div className='border-b border-b-gray-500 font-bold px-1 flex justify-between items-center'> 
                  <span className="font-bold">Settings</span>
                  <MdClose
                    size={18}
                    className="cursor-pointer text-gray-600 hover:text-black border rounded-md border-gray-300"
                    onClick={() => setMenuOpenTabId(null)}
                    role="button"
                  />
                </div>
                <button className="w-full p-1 hover:bg-gray-100  hover:font-bold flex items-center text-sm group">
                  <MdFlag 
                    size={18}  
                    className="text-gray-500 group-hover:text-blue-700"/>
                  <span className='px-1'>Set as first page</span>
                </button>
                <button className="w-full p-1 hover:bg-gray-100 flex items-center text-sm group">
                  <MdDriveFileRenameOutline
                    size={18}
                    className="text-gray-500 group-hover:text-black"
                  />
                  <span className="px-1 group-hover:font-bold"> Rename </span>
                </button>
                <button className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group">
                  <MdCopyAll 
                    size={18}                     
                    className="text-gray-500 group-hover:text-black"
                  />
                  <span className='px-1'>Copy</span>
                </button>
                <button className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group">
                  <MdContentCopy 
                    size={18}                     
                    className="text-gray-500 group-hover:text-black"
                  />
                  <span className='px-1'>Duplicate</span>
                </button>
                <button className="w-full p-1 text-red-500 hover:bg-gray-100 hover:font-bold flex items-center text-sm border-t border-t-gray-200">
                  <MdDeleteOutline  size={18}/>
                  <span className='px-1'>Delete</span>
                </button>
              </div>
            )}
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
