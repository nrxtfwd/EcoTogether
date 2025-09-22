import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const ProjectCard = ({project,setProjects}) => {
  const handleDelete = async (e,id) => {
    e.preventDefault() // stop navigation
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${project._id}`)
      setProjects((cur) => cur.filter(proj => proj._id != project._id))
      toast.success('Project deleted successfully!')
    } catch (error) {
      toast.error("Failed to delete project!")
      console.log("Error in deleting project", error)
    }
  } 


  return (
    <Link to={`/project/${project._id}`} 
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{project.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>About: {project.description}</p>
            <p className='text-base-content/70 line-clamp-3'>Members: {project.members}</p>
            <p className='text-base-content/70 line-clamp-3'>Location: {project.location}</p>
            <div className='card-acgtions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>
                {formatDate(new Date(project.createdAt))}
            </span>
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4' />
                <button onClick={e => handleDelete(e,project._id)} className='btn btn-ghost btn-xs text-error'>
                  <Trash2Icon className='size-4' />
                </button>
                
            </div>
            </div>
        </div>
    </Link>
  )
}

export default ProjectCard
