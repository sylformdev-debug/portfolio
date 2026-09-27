import { createBrowserRouter, RouterProvider } from 'react-router'
import { PreferencesProvider } from './context/PreferencesContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/projects/:slug', element: <ProjectDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return (
    <PreferencesProvider>
      <RouterProvider router={router} />
    </PreferencesProvider>
  )
}
