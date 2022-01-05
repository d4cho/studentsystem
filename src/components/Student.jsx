import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';

const Student = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getAllStudentsFromDatabase();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        const student = { name, address };
        console.log(student);

        fetch('http://localhost:8080/student/add', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(student),
        }).then(() => {
            console.log('New student added');
            getAllStudentsFromDatabase();
        });
    };

    const getAllStudentsFromDatabase = () => {
        fetch('http://localhost:8080/student/getAll')
            .then((res) => res.json())
            .then((result) => {
                setStudents(result);
            });
    };

    return (
        <Box
            component='form'
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
        >
            <Paper
                elevation={3}
                style={{
                    padding: '50px 20px',
                    width: 600,
                    margin: '20px auto',
                }}
            >
                <h1
                    style={{
                        color: 'blue',
                    }}
                >
                    <u>Add Student</u>
                </h1>
                <TextField
                    id='outline-basic'
                    label='Student Name'
                    variant='outlined'
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div style={{ height: 20 }} />
                <TextField
                    id='outline-basic'
                    label='Student Address'
                    variant='outlined'
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <div style={{ height: 20 }} />
                <Button variant='contained' color='secondary' onClick={handleClick}>
                    Submit
                </Button>
            </Paper>
            <Paper
                elevation={3}
                style={{
                    padding: '50px 20px',
                    width: 600,
                    margin: '20px auto',
                }}
            >
                {students.map((student) => (
                    <Paper
                        key={student.id}
                        elevation={6}
                        style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
                    >
                        Id: {student.id}
                        <br />
                        Name: {student.name}
                        <br />
                        Address: {student.address}
                    </Paper>
                ))}
            </Paper>
        </Box>
    );
};

export default Student;
