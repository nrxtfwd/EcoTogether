import Project from "../models/Project.js"

export async function getAllProjects(_,res) {
    try {
        const Projects = await Project.find().sort({createdAt:-1}) //newest first
        res.status(200).json(Projects)
    } catch (error) {
        console.error("Error in getAllProjects controller", error)
        res.status(500).json({message:"Internal server error"})
    }
    // get projs
    // res.status(200).send("You fetched the projects")
}

export async function createProject(req,res) {
    try {
        const {title,description,members,location} = req.body
        const newProject = new Project({title,description,members,location })
        const savedProject = await newProject.save()
        res.status(201).json(savedProject)
    } catch (error) {
        console.error("Error in createProject controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function updateProject(req,res) {
    try {
        const {title,description,members,location} = req.body
        const updatedProject = await Project.findByIdAndUpdate(req.params.id,
            {title,description,members,location}
            ,{new:true}
        )
        if (!updatedProject) return res.status(404).json({message:"Project not found"})
       
        res.status(200).json({
            message: "You updated a project"
        })
    } catch (error) {
        console.error("Error in updateProject controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function deleteProject(req,res) {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id)
        if (!deletedProject) return res.status(404).json({message:"Project not found"})
       
        res.status(200).json({
            message: "You deleted a project"
        })
    } catch (error) {
        console.error("Error in deleteProject controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function getSpecificProject(req,res) {
    try {
        const specificProject = await Project.findById(req.params.id)
        if (!specificProject) return res.status(404).json({message:"Project not found"})
        res.status(200).json(specificProject)
    } catch (error) {
        console.error("Error in getSpecificProject controller", error)
        res.status(500).json({message:"Internal server error"})
    }
    // get projs
    // res.status(200).send("You fetched the projects")
}