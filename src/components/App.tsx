import {MdMoreVert} from 'react-icons/md';
import FormTabs from './FormTabs';
import TabMenu from './TabMenu';
import { useTabContext } from '../context/useTabContext';
import { useState } from 'react';
import AddNewPage from './AddNewPage';
import { ReactSortable } from 'react-sortablejs';

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | undefined>(undefined);


  const {state, dispatch} = useTabContext();
  const tabs = state.tabs;
  const activeTabId = state.activeTabId;
  const menuOpenTabId = state.menuOpenTabId;

  const handleToggleMenu = (id: string) => {
      const isMenuOpen = state.menuOpenTabId === id;

    if (isMenuOpen) {
      dispatch({ type: 'CLOSE_MENU' });
    } else {
      dispatch({ type: 'OPEN_MENU', payload: { id } });
    }
  };

  const openNewPageDialog = (index: number) => {
    setInsertIndex(index);
    setShowDialog(true);
  };
  
  return (
    <>
      <div className='flex'>
        <ReactSortable
          tag="div"
          className="flex"
          list={tabs}
          setList={(newTabs) => dispatch({ type: 'REORDER_TABS', payload: { tabs: newTabs } })}
        >         
        {tabs.map((tab, index) => 
            <div key={tab.id} className='flex '> 
              <div className={`relative flex border border-gray-200 p-2 rounded-md m-3 ${tab.id === activeTabId ? 'bg-white' : ' bg-gray-200 text-gray-500'} hover:bg-gray-300 cursor-pointer`}>
              <FormTabs 
                Icon={tab.icon} 
                onClick={() => dispatch({type: 'SET_ACTIVE_TAB', payload: {id: tab.id}})}
                />
              <span onClick={() => dispatch({type: 'SET_ACTIVE_TAB', payload: {id: tab.id}})}>{tab.title} </span>  
              {tab.id === activeTabId &&  
                <div className='flex items-center p-1'>
                  <MdMoreVert 
                            size={18} 
                            onClick={() => handleToggleMenu(tab.id)}/>
                </div>}
              {(menuOpenTabId === tab.id && tab.id === activeTabId) && (
                <TabMenu/>
              )}
              </div>
              <div className="content-center hover:text-black text-white">
                <button
                  onClick={() => openNewPageDialog(index+1)}
                  className='rounded-full border-black border'
                >
                +
              </button>
            </div>
          </div>
        )}</ReactSortable>

        <button
            onClick={() => setShowDialog(true)}
            className="p-2 m-3 rounded-md border border-b-0 bg-blue-500 text-white hover:bg-blue-700 select-none"
          >
            + Add Page
        </button>

        <AddNewPage 
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
          insertIndex={insertIndex}
        />
      </div>
    </>
  )
}

export default App
