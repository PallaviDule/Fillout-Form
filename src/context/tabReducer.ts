import type { Page, TabState } from "./TabContext";

export type Action =
  | { type: 'ADD_TAB'; payload: { newPage: Page } }
  | { type: 'INSERT_TAB_AT'; payload: { newPage: Page, index: number } }
  | { type: 'SET_ACTIVE_TAB'; payload: { id: string } }
  | { type: 'DELETE_ACTIVE_TAB'; payload: { id: string } }
  | { type: 'RENAME_ACTIVE_TAB'; payload: { id: string, newTitle: string } }
  | { type: 'REORDER_TABS'; payload: { tabs: Page[] } }
  | { type: 'CLOSE_MENU'}
  | { type: 'OPEN_MENU'; payload: { id: string }}
  | { type: 'SET_AS_FIRST_PAGE'}
  | { type: 'DUPLICATE_ACTIVE_TAB' };


type ReducerMap = {
  ADD_TAB: (state: TabState, payload: { newPage: Page }) => TabState;
  INSERT_TAB_AT: (state: TabState, payload: { newPage: Page, index: number }) => TabState;
  SET_ACTIVE_TAB: (state: TabState, payload: { id: string }) => TabState;
  DELETE_ACTIVE_TAB: (state: TabState, payload: { id: string }) => TabState;
  RENAME_ACTIVE_TAB: (state: TabState, payload: { id: string, newTitle: string }) => TabState;
  REORDER_TABS: (state: TabState, payload: { tabs: Page[] }) => TabState;
  CLOSE_MENU: (state: TabState) => TabState;
  OPEN_MENU: (state: TabState, payload: { id: string }) => TabState;
  SET_AS_FIRST_PAGE: (state: TabState) => TabState;
  DUPLICATE_ACTIVE_TAB: (state: TabState) => TabState;
};

const reducerMap : ReducerMap = {
  ADD_TAB: (state, {newPage}): TabState => {
    return {
      ...state,
      tabs: [...state.tabs, newPage],
      activeTabId: newPage.id,
      pageCount: state.pageCount + 1,
    };
  },
  INSERT_TAB_AT: (state, {newPage, index}) => {
    const newTabs = [
      ...state.tabs.slice(0,index),
      newPage,
      ...state.tabs.slice(index)
    ];
    return {
      ...state,
      tabs: newTabs,
      activeTabId: newPage.id,
      pageCount: state.pageCount + 1,
    }
  },
  SET_ACTIVE_TAB: (state, {id}): TabState => {
    return {
      ...state,
      activeTabId: id,
    };
  },
  DELETE_ACTIVE_TAB: (state, {id}): TabState => {
      const updatedTabs = state.tabs.filter((tab) => tab.id !== id);

      return {
        ...state,
        tabs: updatedTabs
      }
  },
  RENAME_ACTIVE_TAB: (state, {id, newTitle}): TabState => {
     const updatedTabs = state.tabs.map((tab) =>  tab.id === id ? {...tab, title: newTitle} : tab);
      return  {
        ...state,
        tabs: updatedTabs
      }
  },
  REORDER_TABS: (state, payload) => ({
    ...state,
    tabs: payload.tabs
  }),
  CLOSE_MENU : (state): TabState => {
    return  {
      ...state,
      menuOpenTabId: null
    }
  },
  OPEN_MENU : (state, {id}): TabState => {
    return  {
      ...state,
      menuOpenTabId: id
    }
  }, 
  SET_AS_FIRST_PAGE: (state): TabState => {
  const currentIndex = state.tabs.findIndex(tab => tab.id === state.activeTabId);
  if (currentIndex === -1) return state;

  const newTabs = [...state.tabs];
  const [selectedTab] = newTabs.splice(currentIndex, 1);
  newTabs.unshift(selectedTab);

  return {
    ...state,
    tabs: newTabs,
    activeTabId: selectedTab.id,
    menuOpenTabId: null
  };
  },
  DUPLICATE_ACTIVE_TAB: (state): TabState => {
  const currentTab = state.tabs.find(tab => tab.id === state.activeTabId);
  if (!currentTab) return state;

  const newId = `${currentTab.title.trim()}-${Date.now()}`.toString();
  const duplicatedPage = {
    ...currentTab,
    id: newId,
    title: `Copy of ${currentTab.title}`,
  };

  const currentIndex = state.tabs.findIndex(tab => tab.id === currentTab.id);
  const updatedTabs = [...state.tabs];
  updatedTabs.splice(currentIndex + 1, 0, duplicatedPage); // insert right after original

  return {
    ...state,
    tabs: updatedTabs,
    activeTabId: duplicatedPage.id,
  };
}
};

export function tabReducer(state: TabState, action: Action): TabState {
  switch (action.type) {
    case 'ADD_TAB':
      return reducerMap.ADD_TAB(state, action.payload);
    case 'INSERT_TAB_AT': 
      return reducerMap.INSERT_TAB_AT(state, action.payload);
    case 'SET_ACTIVE_TAB':
      return reducerMap.SET_ACTIVE_TAB(state, action.payload);
    case 'DELETE_ACTIVE_TAB':
      return reducerMap.DELETE_ACTIVE_TAB(state, action.payload);
    case 'RENAME_ACTIVE_TAB':
      return reducerMap.RENAME_ACTIVE_TAB(state, action.payload);
    case 'REORDER_TABS':
      return reducerMap.REORDER_TABS(state, action.payload);
    case 'CLOSE_MENU':
      return reducerMap.CLOSE_MENU(state);
    case 'OPEN_MENU':
      return reducerMap.OPEN_MENU(state, action.payload);
    case 'SET_AS_FIRST_PAGE':
      return reducerMap.SET_AS_FIRST_PAGE(state);
    case 'DUPLICATE_ACTIVE_TAB':
      return reducerMap.DUPLICATE_ACTIVE_TAB(state);
    default:
      return state;
  }
}