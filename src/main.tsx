import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import BajaHubPage from './BajaHubPage'
import BajaWorkstreamPage from './BajaWorkstreamPage'
import NotFoundPage from './NotFoundPage'
import ProjectDetailPage from './ProjectDetailPage'
import ProjectsPage from './ProjectsPage'
import ResumePage from './ResumePage'
import ContactPage from './ContactPage'
import './styles.css'

const basePrefix = import.meta.env.BASE_URL.replace(/\/$/, '')
const pathname = window.location.pathname
const appPath = basePrefix && pathname.startsWith(`${basePrefix}/`)
  ? pathname.slice(basePrefix.length)
  : pathname === basePrefix
    ? '/'
    : pathname
const currentPath = appPath.replace(/\/+$/, '') || '/'
const bajaWorkstreamMatch = currentPath.match(/^\/projects\/baja-upright\/(cnc-upright|welded-upright|portal-upright)$/)
const detailMatch = currentPath.match(/^\/projects\/([^/]+)$/)
const projectId = detailMatch ? decodeURIComponent(detailMatch[1]) : undefined
const CurrentPage = currentPath === '/'
  ? App
  : currentPath === '/projects'
    ? ProjectsPage
    : currentPath === '/projects/baja-upright'
      ? BajaHubPage
      : bajaWorkstreamMatch
        ? () => <BajaWorkstreamPage workstream={bajaWorkstreamMatch[1] as 'cnc-upright' | 'welded-upright' | 'portal-upright'} />
          : projectId
            ? () => <ProjectDetailPage projectId={projectId} />
            : currentPath === '/resume'
              ? ResumePage
              : currentPath === '/contact'
                ? ContactPage
                : NotFoundPage

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrentPage />
  </React.StrictMode>,
)
