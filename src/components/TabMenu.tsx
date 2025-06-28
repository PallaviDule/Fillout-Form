import {
  MdDeleteOutline, MdContentCopy, MdCopyAll,
  MdDriveFileRenameOutline, MdClose, MdFlag
} from 'react-icons/md';
import { useTabContext } from '../context/useTabContext';
import { useState } from 'react';

const TabMenu = () => {
  const { state, dispatch } = useTabContext();
  const activeTabId = state.activeTabId;
  const currentTab = state.tabs.find(tab => tab.id === activeTabId);

  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTab?.title || '');

  const handleDelete = () => {
    dispatch({ type: 'DELETE_ACTIVE_TAB', payload: { id: activeTabId } });
  };

  const handleRename = () => {

    if (newTitle.trim() !== '' && currentTab?.title !== newTitle.trim()) {
      dispatch({ type: 'RENAME_ACTIVE_TAB', payload: { id: activeTabId, newTitle: newTitle.trim() } });
    }
    setIsRenaming(false);
  };

  const handleRenameKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setNewTitle(currentTab?.title || '');
    }
  };

  return (
    <div className="absolute left-0 mt-10 w-40 bg-white border rounded shadow z-10">
      <div className='border-b border-b-gray-500 font-bold px-1 flex justify-between items-center'
        onClick={() => dispatch({ type: 'CLOSE_MENU' })}
      >
        <span className="font-bold">Settings</span>
        <MdClose
          size={18}
          className="cursor-pointer text-gray-600 hover:text-black border rounded-md border-gray-300"
          role="button"
        />
      </div>

      <button 
        className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group"
        onClick={() => dispatch({type: 'SET_AS_FIRST_PAGE'})}>
        <MdFlag size={18} className="text-gray-500 group-hover:text-blue-700" />
        <span className='px-1'>Set as first page</span>
      </button>

      {isRenaming ? (
        <div className="px-2 py-1">
          <input
            type="text"
            className="w-full border rounded px-1 text-sm"
            value={newTitle}
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleRenameKey}
          />
        </div>
      ) : (
        <button
          className="w-full p-1 hover:bg-gray-100 flex items-center text-sm group"
          onClick={() => setIsRenaming(true)}
        >
          <MdDriveFileRenameOutline size={18} className="text-gray-500 group-hover:text-black" />
          <span className="px-1 hover:font-bold"> Rename </span>
        </button>
      )}

      <button className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group">
        <MdCopyAll size={18} className="text-gray-500 group-hover:text-black" />
        <span className='px-1'>Copy</span>
      </button>

      <button className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group"
        onClick={() => dispatch({type: 'DUPLICATE_ACTIVE_TAB'})}>
        <MdContentCopy size={18} className="text-gray-500 group-hover:text-black" />
        <span className='px-1'>Duplicate</span>
      </button>

      <button
        className="w-full p-1 text-red-500 hover:bg-gray-100 hover:font-bold flex items-center text-sm border-t border-t-gray-200"
        onClick={handleDelete}
      >
        <MdDeleteOutline size={18} />
        <span className='px-1'>Delete</span>
      </button>
    </div>
  );
};

export default TabMenu;
