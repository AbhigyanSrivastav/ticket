import Issue from '../models/issue.model.js';

// Create a new issue
export const createIssue = async (req, res) => {
    console.log('req.user._id', req.user)
    try {
        const newIssue = new Issue({
            ...req.body,
            createdBy: req.user.userId // Attach the user who created the issue
        });
        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all issues (adjust filtering/sorting as needed)
export const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single issue by ID
export const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) { 
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.json(issue); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an issue by ID
export const updateIssue = async (req, res) => {
    // ... Logic to update issue, consider authorization based on user role
};

// Delete an issue by ID
export const deleteIssue = async (req, res) => {
    // ... Logic to delete issue, consider authorization 
};
