import {createSlice} from "@reduxjs/toolkit";

// const ACTIONS = Object.freeze({
//     ADD_TASK: "ADD_TASK",
//     REMOVE_TASK: "REMOVE_TASK",
// });

const initialState = [
    {
      title: "TODO",
      content: [
        {
          name: "Task 1",
          tag: "High Priority",
        },
      ],
      id: 1,
    },
    {
      title: "PROGRESS",
      content: [],
      id: 2,
    },
    {
      title: "DONE",
      content: [],
      id: 3,
    },
  ]

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        addTask(state, action) {
          console.log("addTask action payload:", action.payload);
            const { columnId, task } = action.payload.data;
            const column = state.find((col) => col.id === columnId);
            if (column) {
                column.content.push(task);
            }
        },
        removeTask(state, action) {
            const { columnId, taskIndex } = action.payload;
            const column = state.find((col) => col.id === columnId);
            if (column && taskIndex >= 0 && taskIndex < column.content.length) {
                column.content.splice(taskIndex, 1);
            }
        },
    },  
});

export const { addTask, removeTask } = headerSlice.actions;

export default headerSlice.reducer;