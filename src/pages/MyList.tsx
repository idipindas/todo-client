import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox,
  Button,
  Modal,
} from "@mui/material";
import { ExpandMore, ExpandLess, Edit, Delete, Add } from "@mui/icons-material";
import TaskForm from "../components/Form";
import axiosInstance from "../axios/axiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const MyList = () => {
  const [taskList, setTaskList] = useState<any[]>([]);
  const [openTaskIds, setOpenTaskIds] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<any | null>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };

  const toggleTask = (id: string) => {
    setOpenTaskIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleToggleSubtaskComplete = async (
    taskId: string,
    subtaskId: string
  ) => {
    try {
      const task = taskList.find((t) => t._id === taskId);
      if (!task) return;

      const updatedItems = task.items.map((item: any) =>
        item._id === subtaskId ? { ...item, completed: !item.completed } : item
      );

      const allCompleted = updatedItems.every((item: any) => item.completed);

      await axiosInstance.put(`/api/todos/${taskId}`, {
        name: task.name,
        items: updatedItems,
        completed: allCompleted,
      });

      handleGetTask();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/api/todos/${taskId}`);
      handleGetTask();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = async (taskId: string) => {
    try {
      setId(taskId);
      handleOpen();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSubtask = async (taskId: string, subtaskId: string) => {
    try {
      const task = taskList.find((t) => t._id === taskId);
      if (!task) return;

      const updatedItems = task.items.filter(
        (item: any) => item._id !== subtaskId
      );

      await axiosInstance.put(`/api/todos/${taskId}`, {
        name: task.name,
        items: updatedItems,
        completed: updatedItems.every((item: any) => item.completed),
      });

      handleGetTask();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetTask = async () => {
    try {
      const response = await axiosInstance.get("/api/todos");
      if (response.status === 200) {
        setTaskList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetTask();
  }, []);

  return (
    <Grid container>
      <Box p={2} width="100%">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight={600} color="#111827">
            My To-Do List
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpen}
          >
            Create Task
          </Button>
        </Grid>

        <Grid container spacing={2}>
          {taskList.map((task) => (
            <Grid size={12} key={task._id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f9fafb",
                  borderLeft: task.items.every((i: any) => i.completed)
                    ? "4px solid #10b981"
                    : "4px solid #4f46e5",
                  opacity: task.items.every((i: any) => i.completed) ? 0.6 : 1,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" color="#374151">
                    {task.name}
                  </Typography>

                  <Box>
                    <IconButton onClick={() => handleDeleteTask(task._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleEditTask(task._id)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => toggleTask(task._id)}>
                      {openTaskIds.includes(task._id) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                  </Box>
                </Box>

                <Collapse
                  in={openTaskIds.includes(task._id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List dense sx={{ mt: 1 }}>
                    {task.items.map((subtask: any) => (
                      <React.Fragment key={subtask._id}>
                        <ListItem
                          secondaryAction={
                            <>
                              <IconButton
                                onClick={() =>
                                  handleDeleteSubtask(task._id, subtask._id)
                                }
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </>
                          }
                        >
                          <Checkbox
                            checked={subtask.completed}
                            onChange={() =>
                              handleToggleSubtaskComplete(task._id, subtask._id)
                            }
                          />
                          <ListItemText
                            primary={subtask.text}
                            sx={{
                              textDecoration: subtask.completed
                                ? "line-through"
                                : "none",
                              color: subtask.completed ? "#9ca3af" : "#111827",
                            }}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <TaskForm onClose={handleClose} onSave={handleGetTask} id={id} />
          </Box>
        </Modal>
      </Box>
    </Grid>
  );
};

export default MyList;
