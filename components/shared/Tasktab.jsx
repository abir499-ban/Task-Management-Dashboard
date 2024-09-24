"use client"; // Use client-side rendering

import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import axios from 'axios';

const Tasktab = () => {
    const [allTasks, setallTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/task/fetchTask');
                setallTasks(response.data.allTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        console.log(allTasks);
        fetchTasks(); 
    }, []);
    return (
        <>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Task Title</TableHead>
                            <TableHead>Task Priority</TableHead>
                            <TableHead>Task Status</TableHead>
                            <TableHead >Due Date</TableHead>
                            <TableHead>Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allTasks.map((task) => (
                            <TableRow key={task._id}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>
                                    <Button variant="ghost">Edit</Button>
                                    <Button variant="destructive">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </>
    )
}

export default Tasktab