import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axiosInstance from "../axios/axiosInstance";

type Subtask = { text: string; completed: boolean };

interface TaskFormProps {
  onClose: () => void;
  onSave: () => void;
  
  id?: any;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onClose,
  onSave,
 
  id,
}) => {
  const [name, setName] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { text: "", completed: false },
  ]);

  const handleGettasks = async (id: any) => {
    try {
      const resp: any = await axiosInstance.get(`/api/todos/${id}`);
      if (resp.status === 200) {
        setName(resp?.data?.name);
        setSubtasks(resp?.data?.items);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      handleGettasks(id);
    }
  
  }, [id]);

  const handleSubtaskChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index].text = value;
    setSubtasks(updated);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { text: "", completed: false }]);
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    const validSubtasks = subtasks.filter((s) => s.text.trim() !== "");
    if (validSubtasks.length === 0) return;

    const payload = {
      name,
      items: validSubtasks,
    };

    try {
      if (id) {
        await axiosInstance.put(`/api/todos/${id}`, payload);
      } else {
        await axiosInstance.post("/api/todos", payload);
      }
      onSave(); // Refresh task list in parent
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {id ? "Update Task" : "Create New Task"}
      </Typography>
      <TextField
        fullWidth
        label="Task Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      {subtasks.map((subtask, idx) => (
        <Grid
          container
          spacing={1}
          alignItems="center"
          key={idx}
          sx={{ mb: 1 }}
        >
          <Grid size={11}>
            <TextField
              fullWidth
              label={`Subtask ${idx + 1}`}
              value={subtask.text}
              onChange={(e) => handleSubtaskChange(idx, e.target.value)}
            />
          </Grid>
          <Grid size={1}>
            <IconButton onClick={() => handleRemoveSubtask(idx)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        startIcon={<Add />}
        onClick={handleAddSubtask}
        sx={{ mt: 1, mb: 2 }}
      >
        Add Subtask
      </Button>
      <Grid container justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {id ? "Update Task" : "Create Task"}
        </Button>
      </Grid>
    </Box>
  );
};

export default TaskForm;
