import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

import List from "../Component/List";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "minimum characters required"),
  date: Yup.date().required("date is required"),
});

export default function Tasks() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [newTaskType, setNewTaskType] = useState("");

  const handleAddTask = (values) => {
    const newTaskObj = {
      id: (tasks.length + 1).toString(),
      title: values.title,
      date: values.date,
      types: newTaskType,
    };

    dispatch(addTask(newTaskObj));
    setShowModal(false);
  };

  const handleAddButtonClick = (type) => {
    setNewTaskType(type);
    setShowModal(true);
  };

  const handelCancel = () => {
    setShowModal(false);
    setNewTaskType("");
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <List type="unassigned" handleAddButtonClick={handleAddButtonClick} />
          <List type="todo" handleAddButtonClick={handleAddButtonClick} />
          <List
            type="in_progress"
            handleAddButtonClick={handleAddButtonClick}
          />
          <List type="in_review" handleAddButtonClick={handleAddButtonClick} status="done"/>
        </div>
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "",
              date: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddTask}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="mb-4">
                  <label className="block mb-2">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className={`border p-2 rounded ${
                      touched.title && errors.title ? "border-red-500" : ""
                    }`}
                    placeholder="Enter title"
                    style={{ width: "400px" }}
                  />
                  {touched.title && errors.title && (
                    <p className="text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Date</label>
                  <Field
                    type="date"
                    name="date"
                    className={`border p-2 w-full rounded ${
                      touched.date && errors.date ? "border-red-500" : ""
                    }`}
                    style={{ width: "400px" }}
                  />
                  {touched.date && errors.date && (
                    <p className="text-red-500">{errors.date}</p>
                  )}
                </div>

                <DialogActions>
                  <button
                    type="button"
                    onClick={handelCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Add Task
                  </button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
