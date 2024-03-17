const Issue = require('../models/issue.model');

// Create a new issue
exports.createIssue = async (req, res) => {
    try {
        const newIssue = new Issue({
            ...req.body,
            createdBy: req.user._id // Attach the authenticated user
        });
        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all issues (adjust filtering/sorting as needed)
exports.getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find() 
            .populate('createdBy', 'username') 
            .populate('assignedTo', 'username'); 
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single issue by ID
exports.getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id)
            .populate('createdBy', 'username')
            .populate('assignedTo', 'username')
            .populate('comments.user', 'username');

        if (!issue) { 
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.json(issue); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an issue by ID
exports.updateIssue = async (req, res) => {
    try {
        const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true }); 

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.json(issue); // Return the updated issue
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an issue by ID
exports.deleteIssue = async (req, res) => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.id); 
        
        if (!deletedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.json({ message: 'Issue deleted' }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
