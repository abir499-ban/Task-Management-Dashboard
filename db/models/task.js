import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        default: 'To Do',
        required:false
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium', 
        required:false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true, 
});

const Task =  mongoose.models.Task || mongoose.model('Task', taskSchema);

export {Task}
