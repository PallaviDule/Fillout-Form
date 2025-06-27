import {MdInsertDriveFile, MdMoreVert} from 'react-icons/md';
import FormTabs from './FormTabs';
import TabMenu from './TabMenu';
import { useTabContext } from '../context/useTabContext';

function App() {
  const {state, dispatch} = useTabContext();
  const tabs = state.tabs;
  const activeTabId = state.activeTabId;
  const menuOpenTabId = state.menuOpenTabId;

  const handleAddPage = () => {
    const newId = (state.tabs.length + 1).toString();
    const newPage = {
      id: newId,
      title: 'New Page',
      icon: MdInsertDriveFile,
    };

    dispatch({type: 'ADD_TAB', payload: {newPage} });
    dispatch({type: 'SET_ACTIVE_TAB', payload: {id: newId}})
  }
  
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
              onClick={() => dispatch({type: 'SET_ACTIVE_TAB', payload: {id: tab.id}})}
              />
            <span onClick={() => dispatch({type: 'SET_ACTIVE_TAB', payload: {id: tab.id}})}>{tab.title} </span>  
            {tab.id === activeTabId &&  
              <div className='flex items-center p-1'>
                <MdMoreVert 
                          size={18} 
                          onClick={() =>  dispatch({type: 'OPEN_MENU', payload: {id: tab.id}})}/>
              </div>}
            {(menuOpenTabId === tab.id && tab.id === activeTabId) && (
              <TabMenu/>
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
