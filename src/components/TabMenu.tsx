import { MdDeleteOutline, MdContentCopy, MdCopyAll, MdDriveFileRenameOutline, MdClose, MdFlag } from 'react-icons/md';
import { useTabContext } from '../context/useTabContext';

const TabMenu = () => {
    const {dispatch} = useTabContext();

  return (
    <div className="absolute left-0 mt-10 w-40 bg-white border rounded shadow z-10">
      <div className='border-b border-b-gray-500 font-bold px-1 flex justify-between items-center'>
        <span className="font-bold">Settings</span>
        <MdClose
          size={18}
          className="cursor-pointer text-gray-600 hover:text-black border rounded-md border-gray-300"
          onClick={() => dispatch({type: 'CLOSE_MENU'})}
          role="button"
        />
      </div>
      <button className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group">
        <MdFlag size={18} className="text-gray-500 group-hover:text-blue-700" />
        <span className='px-1'>Set as first page</span>
      </button>
      <button className="w-full p-1 hover:bg-gray-100 flex items-center text-sm group">
        <MdDriveFileRenameOutline size={18} className="text-gray-500 group-hover:text-black" />
        <span className="px-1 group-hover:font-bold"> Rename </span>
      </button>
      <button className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group">
        <MdCopyAll size={18} className="text-gray-500 group-hover:text-black" />
        <span className='px-1'>Copy</span>
      </button>
      <button className="w-full p-1 hover:bg-gray-100 hover:font-bold flex items-center text-sm group">
        <MdContentCopy size={18} className="text-gray-500 group-hover:text-black" />
        <span className='px-1'>Duplicate</span>
      </button>
      <button className="w-full p-1 text-red-500 hover:bg-gray-100 hover:font-bold flex items-center text-sm border-t border-t-gray-200">
        <MdDeleteOutline size={18} />
        <span className='px-1'>Delete</span>
      </button>
    </div>
  );
};


export default TabMenu;