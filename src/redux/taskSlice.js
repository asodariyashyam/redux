import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    { id: "1", title: "Task 1", date: "11-1-2024", types: "unassigned" ,status:""},
    { id: "2", title: "Task 2", date: "11-12-2024", types: "todo" , status:"" },
    { id: "3", title: "Task 3", date: "12-13-2024", types: "in_progress" , status:"" },
    { id: "4", title: "Task 4", date: "10-11-2024", types: "in_review" , status:"" },
    { id: "5", title: "Task 5", date: "10-11-2024", types: "unassigned" , status:"" },
    { id: "6", title: "Task 6", date: "6-11-2024", types: "unassigned" , status:"" },
    { id: "7", title: "Task 7", date: "4-11-2024", types: "todo" , status:"" },
    { id: "8", title: "Task 8", date: "7-11-2024", types: "in_progress" , status:"" },
    { id: "9", title: "Task 9", date: "10-11-2024", types: "todo" , status:"" },
    { id: "10", title: "Task 10", date: "5-11-2024", types: "in_review" , status:"" },
    { id: "11", title: "Task 11", date: "5-11-2024", types: "in_review" , status:"" },
    { id: "12", title: "Task 12", date: "11-11-2024", types: "in_review" , status:"" },
]

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
      addTask: (state, action) => {
        state.push(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state));
      },
      updateTask: (state, action) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload; 
          localStorage.setItem("tasks", JSON.stringify(state));
        }
      },
    },
  });
export const { addTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;