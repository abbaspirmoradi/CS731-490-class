import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box
} from '@mui/material';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('/api/students');
        setStudents(res.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch students.');
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );

  if (students.length === 0)
    return (
      <Typography variant="body1" sx={{ mt: 4 }}>
        No students registered yet.
      </Typography>
    );

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Student List
        </Typography>
        <List>
          {students.map((student) => (
            <ListItem key={student._id} divider>
              <ListItemText
                primary={student.name}
                secondary={`${student.email} — ${student.enrollmentNumber}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default StudentList;
