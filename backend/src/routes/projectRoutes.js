import express from "express"
import { getAllProjects, createProject, updateProject, deleteProject, getSpecificProject } from '../controllers/projectsController.js'

const router = express.Router();

router.get("/", getAllProjects)
router.get("/:id", getSpecificProject)
router.post("/", createProject)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)

export default router