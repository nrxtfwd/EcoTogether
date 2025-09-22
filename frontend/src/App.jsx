import React from 'react'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import ProjectDetail from './pages/ProjectDetail'
import {Route,Routes} from 'react-router'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  )
}

export default App
