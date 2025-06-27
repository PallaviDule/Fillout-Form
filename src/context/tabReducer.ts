import type { Page, TabState } from "./TabContext";

export type Action =
  | { type: 'ADD_TAB'; payload: { newPage: Page } }
  | { type: 'SET_ACTIVE_TAB'; payload: { id: string } }
  | { type: 'CLOSE_MENU'}
  | { type: 'OPEN_MENU'; payload: { id: string }};


type ReducerMap = {
  ADD_TAB: (state: TabState, payload: { newPage: Page }) => TabState;
  SET_ACTIVE_TAB: (state: TabState, payload: { id: string }) => TabState;
  CLOSE_MENU: (state: TabState) => TabState;
  OPEN_MENU: (state: TabState, payload: { id: string }) => TabState;
};

const reducerMap : ReducerMap = {
  ADD_TAB: (state: TabState, {newPage}): TabState => {
    return {
      ...state,
      tabs: [...state.tabs, newPage],
      activeTabId: newPage.id,
      pageCount: state.pageCount + 1,
    };
  },
  SET_ACTIVE_TAB: (state: TabState, {id}): TabState => {
    return {
      ...state,
      activeTabId: id,
    };
  },
  CLOSE_MENU : (state: TabState): TabState => {
    return  {
      ...state,
      menuOpenTabId: null
    }
  },
  OPEN_MENU : (state: TabState, {id}): TabState => {
    return  {
      ...state,
      menuOpenTabId: id
    }
  }
};

export function tabReducer(state: TabState, action: Action): TabState {
  switch (action.type) {
    case 'ADD_TAB':
      return reducerMap.ADD_TAB(state, action.payload);
    case 'SET_ACTIVE_TAB':
      return reducerMap.SET_ACTIVE_TAB(state, action.payload);
    case 'CLOSE_MENU':
      return reducerMap.CLOSE_MENU(state);
    case 'OPEN_MENU':
      return reducerMap.OPEN_MENU(state, action.payload);
    default:
      return state;
  }
}