import { createContext, useReducer, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { MdOutlineInfo, MdInsertDriveFile, MdCheckCircleOutline } from "react-icons/md";
import { tabReducer, type Action } from "./tabReducer";

export type Page = {
  id: string;
  title: string;
  icon: IconType;
};

export interface TabState {
  tabs: Page[];
  activeTabId: string;
  pageCount: number;
  menuOpenTabId: string | null;
}

const initialTabs: Page[] = [
  { id: '1', title: 'Info', icon: MdOutlineInfo },
  { id: '2', title: 'Details', icon: MdInsertDriveFile },
  { id: '3', title: 'Other', icon: MdInsertDriveFile },
  { id: '4', title: 'Ending', icon: MdCheckCircleOutline },
];


const initialState: TabState = {
  tabs: initialTabs,
  activeTabId: initialTabs[0].id,
  pageCount: 0,
  menuOpenTabId: null
};

const TabContext = createContext<
{
state: TabState;
dispatch: React.Dispatch<Action>;
} | undefined>(undefined);


export const TabProvider = ({children} : {children: ReactNode}) => {
    const [state, dispatch] = useReducer(tabReducer, initialState);

    return (
        <TabContext.Provider value={{state, dispatch}}>
            {children}
        </TabContext.Provider>
    )
}

export default TabContext;