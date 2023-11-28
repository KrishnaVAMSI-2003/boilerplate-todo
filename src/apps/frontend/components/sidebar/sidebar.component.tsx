import React from "react";
import Addtodo from "./addtask";
import ToggleButtons from "./togglebuttons";


export default function Sidebar():React.ReactElement {
  const username = localStorage.getItem('username');

  return (
    <div className="sidebar--container">
        <h4 className="sidebar__text">Hello,</h4>
        <h3 className="sidebar__text">{username}</h3>
        <p className="sidebar__text">Manage all your tasks here!</p>
        <div className="sidebar__divider__line"></div>
        <h3 className="sidebar__text">Filters</h3>
        <ToggleButtons />
        <ToggleButtons/>
        <div className="sidebar__divider__line"></div>
        <h3 className="sidebar__text">Add Todo:-</h3>
        <div>
         <Addtodo/>
        </div>
    </div>
  )
}
