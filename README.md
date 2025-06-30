## Form-Tab App

A React-based tab management interface developed as part of a frontend engineering test assessment. This app allows users to create, reorder, and manage tabs dynamically, with a clean user experience and component-based architecture.     
**[Link To Demo](https://fillout-form-react-vite.vercel.app/)**

### Tech Stack

* **React** + **TypeScript**
* **Tailwind CSS** for styling
* **React Icons** for UI icons
* **SortableJS (ReactSortable)** for drag-and-drop reordering
* **Context API**
* **Vite** for bundling

## Features

* **Dynamic Tabs** : Users can add new tabs and switch between them.

* **Drag-and-Drop** : Tabs can be reordered using drag-and-drop via SortableJS.

* **Inline Add Button** : A small "+" button appears between tabs to insert a tab at that position.

* **Context Menu** : The 3-dot menu on each tab opens additional actions (like rename, delete).

* **Scrollable Tab Bar**: Tabs scroll horizontally if they overflow without affecting layout.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

###  Deployment

Deployed using **Vercel**

## Project Structure

```
src/
├── components/
│   ├── App.tsx
│   ├── FormTabs.tsx
│   ├── TabMenu.tsx
│   └── AddNewPage.tsx
├── context/
│   └── useTabContext.tsx
|   └── tabeReducer.ts
|   └── TabContext.tsx
```