const Project = require("../models/Project");

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects"
        });
    }
};

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            message: "Project created successfully",
            project
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create project",
            error: error.message
        });
    }
};

module.exports = {
    getProjects,
    createProject
};