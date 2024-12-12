import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import { IoMdAdd } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { FiAlignLeft } from "react-icons/fi";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function List(props) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  localStorage.setItem("tasks", JSON.stringify(tasks));
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);

  const filterTasks = (type, status) =>
    !status
      ? tasks?.filter((task) => task?.types === type)
      : tasks
          ?.filter((task) => task?.types === type)
          ?.filter((item) => item?.status !== status);

  const handleMoveTask = (task, newType) => {
    const updatedTask = { ...task, types: newType };
    dispatch(updateTask(updatedTask));
    setAnchorEl(null);
  };

  const formatDate = (date) => {
    return dayjs(date).format("MMM D, YYYY");
  };

  const handleDoneTask = (task) => {
    const updatedTask = { ...task, status: "done" };
    dispatch(updateTask(updatedTask));
    setAnchorEl(null);
  };

  const handleClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setActiveTaskId(taskId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveTaskId(null);
  };

  return (
    <div>
      <div className="w-full sm:w-72 p-4 rounded">
        <div className="flex justify-between items-center pb-4">
          <h4
            className="text-lg font-bold mb-2 uppercase"
            style={{ paddingTop: "6px" }}
          >
            {props?.type?.replace("_", " ")}{" "}
            <span
              className="bg-blue-400 mb px-2 py-1 rounded-full"
              style={{ fontSize: "10px" }}
            >
              {filterTasks(props?.type, props?.status, "")?.length}
            </span>
          </h4>

          <button
            onClick={() => props.handleAddButtonClick(props.type)}
            className="bg-white text-lg px-2 py-2 rounded-full shadow-lg"
          >
            <IoMdAdd />
          </button>
        </div>

        {filterTasks(props.type, "")?.length > 0 ? (
          <div
            style={{ height: "500px" }}
            className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200"
          >
            {filterTasks(props.type, "").map((i) => (
              <div
                key={i.id}
                className={`p-2 mb-4 bg-white rounded shadow-sm text-sm relative ${
                  i.status === "done" ? "line-through text-gray-400" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <h6>
                    <b>
                      {i.title.length > 20
                        ? i.title.slice(0, 20) + "..."
                        : i.title}
                    </b>
                  </h6>
                  {i.status !== "done" ? (
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, i.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  ) : (
                    " "
                  )}
                </div>

                <div className="flex gap-2 pt-3 pb-1">
                  <span className="text-lg">
                    <FiAlignLeft />
                  </span>
                  <span className="text-xl">
                    <CiClock2 />
                  </span>
                  <span> {formatDate(i?.date)}</span>
                </div>

                <Menu
                  id="long-menu"
                  MenuListProps={{ "aria-labelledby": "long-button" }}
                  anchorEl={anchorEl}
                  open={activeTaskId === i.id && Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {["unassigned", "todo", "in_progress", "in_review"]
                    .filter((type) => type !== i.types)
                    .map((newType) => (
                      <button
                        key={newType}
                        className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                        onClick={() => handleMoveTask(i, newType)}
                      >
                        {newType.replace("_", " ").toUpperCase()}
                      </button>
                    ))}
                  {i.types === "in_review" && (
                    <button
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-green-600"
                      onClick={() => handleDoneTask(i)}
                    >
                      DONE
                    </button>
                  )}
                </Menu>
              </div>
            ))}
          </div>
        ) : (
          <h4 className="text-center text-xl p-4">No Tasks</h4>
        )}
      </div>
    </div>
  );
}
