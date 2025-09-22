import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const CreatePage = () => {
  const [data,setData] = useState({
    title:"",
    desc:"",
    members:0,
    location:""
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.title || !data.desc || data.members <= 0 || !data.location) {
      toast.error("All fields are required!")
      console.log(data)
      return;
    }

    setLoading(true)
    try {
      await api.post('/projects/', {
        ...data,
        "description": data.desc
      })
      toast.success("Project created successfully!")
      navigate("/")
    } catch (error) {
      toast.error("Failed to create project!")
      console.log("Error creating project!", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Projects
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Project</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className="label-text">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" 
                  placeholder="Project Title" 
                  className='input input-bordered'
                  value={data.title}
                  onChange={e => setData(thisData => (
                    {
                      ...thisData,
                      title: e.target.value
                    }
                  ))}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className="label-text">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea type="text" 
                  placeholder="What is your project about?" 
                  className='textarea textarea-bordered h-32'
                  value={data.desc}
                  onChange={e => setData(thisData => (
                    {
                      ...thisData,
                      desc: e.target.value
                    }
                  ))}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className="label-text">
                    <span className="label-text">Members</span>
                  </label>
                  <input type="number" 
                  placeholder="How many members in your project?" 
                  className='input input-bordered'
                  value={data.members}
                  onChange={e => setData(thisData => (
                    {
                      ...thisData,
                      members: e.target.value
                    }
                  ))}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className="label-text">
                    <span className="label-text">Location</span>
                  </label>
                  <input type="text" 
                  placeholder="Where is the project mostly based from?" 
                  className='input input-bordered'
                  value={data.location}
                  onChange={e => setData(thisData => (
                    {
                      ...thisData,
                      location: e.target.value
                    }
                  ))}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button className='btn btn-primary' type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
