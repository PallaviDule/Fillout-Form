import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx'
import { TabProvider } from './context/TabContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabProvider>
          <App />
    </TabProvider>
  </StrictMode>,
)
