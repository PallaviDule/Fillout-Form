import React, {useState} from 'react'
import { useTabContext } from '../context/useTabContext';
import {MdInsertDriveFile, MdClose} from 'react-icons/md';

interface AddNewPageDialogProps {
  showDialog: boolean;
  onClose: () => void;
  insertIndex?: number; 
}

const AddNewPage = ({showDialog, onClose, insertIndex}: AddNewPageDialogProps) => {
    const {dispatch} = useTabContext();
    const [newTabTitle, setNewTabTitle] = useState<string>('');

    if(!showDialog) return null;

    const handleAddPage = () => {
         if (!newTabTitle.trim()) return;
          
        const newTab = {
            id: `${newTabTitle.trim()}-${Date.now()}`.toString(),
            title: newTabTitle.trim(),
            icon: MdInsertDriveFile,
        };
        console.log('In add dialog:', insertIndex);
        if(insertIndex) {
          dispatch({ type: 'INSERT_TAB_AT', payload: { newPage: newTab, index: insertIndex} });
        } else {
          dispatch({ type: 'ADD_TAB', payload: { newPage: newTab } });
        }
        setNewTabTitle('');
        onClose();
    };

  return (        
    <div className="fixed inset-0 flex justify-center items-start pt-50 z-20">
      <div className="bg-white p-4 rounded-md shadow-xl w-150 border border-gray-50">
        <div className='justify-between flex'>
            <h2 className="text-lg font-semibold mb-2">Name your form page</h2>
            <MdClose
                className="text-gray-300 hover:text-black cursor-pointer"
                size={20}
                onClick={onClose}
            />
        </div>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded mb-3"
          placeholder="Enter page title"
          value={newTabTitle}
          onChange={(e) => setNewTabTitle(e.target.value)}
          autoFocus
        />
        <div className='flex justify-end'>
            <button
                onClick={handleAddPage}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 content-end items-end-safe justify-end"
            >
                Add
          </button>
        </div>
      </div>
    </div>
  )};

export default AddNewPage;