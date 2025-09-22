import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import toast from 'react-hot-toast'
import ProjectCard from '../components/ProjectCard'
import api from '../lib/axios'
import NoProjectsFound from '../components/NoProjectsFound'

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects/')
        console.log(res.data)
        setProjects(res.data)
        setRateLimited(false)
      } catch (error) {
        console.log("Error fetching projects", error)

        if (error.response.status === 429) {
          setRateLimited(true)
        } else {
          toast.error("Failed to load projects")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  },[])

  console.log(projects.length)

  return (
    <div className='min-h-screen'>
        <Navbar />

        {isRateLimited && <RateLimitedUI />}

        <div className='max-w-7xl mx-auto p-4 mt-6'>
          {loading && <div className='text-center text-primary py-10'>Loading projects</div>}

          {projects.length === 0 && !isRateLimited && <NoProjectsFound />}

          {projects.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {projects.map(project => {
                return (
                  <ProjectCard key={project._id} project={project} setProjects={setProjects}/>
                )
              })}
            </div>
          )}
        </div>
    </div>
  )
}

export default HomePage
