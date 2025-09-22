import React, { useEffect, useState } from 'react'
import {useNavigate, useParams, Link} from 'react-router'
import api from '../lib/axios'
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const ProjectDetail = () => {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  console.log(id)
  useEffect(() => {
    const fetchProject = async() => {
      try {
        const res = await api.get(`/projects/${id}`)
        setProject(res.data)
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch project!")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [])

  const handleSave = async () => {
    console.log(project)
    if (!project.title || !project.description || !project.members || !project.location) {
      toast.error("All fields required!")
      return;
    }

    setSaving(true)

    try {
      await api.put(`/projects/${id}`, project)
      toast.success("Project updated successfully!")
    } catch (error) {
      console.log(error)
      toast.error("Error updating project!")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`)
      toast.success("Project deleted!")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete project!")
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5' />
            Back to Projects
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Project
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className='form-control mb-4'>
                  <label className="label-text">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" 
                  placeholder="Project Title" 
                  className='input input-bordered'
                  value={project.title}
                  onChange={e => setProject(thisData => (
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
                  value={project.description}
                  onChange={e => setProject(thisData => (
                    {
                      ...thisData,
                      description: e.target.value
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
                  value={project.members}
                  onChange={e => setProject(thisData => (
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
                  value={project.location}
                  onChange={e => setProject(thisData => (
                    {
                      ...thisData,
                      location: e.target.value
                    }
                  ))}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button className='btn btn-primary' onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
