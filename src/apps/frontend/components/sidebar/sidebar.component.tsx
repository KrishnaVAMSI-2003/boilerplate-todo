import React from "react";
import Addtodo from "./addtask";
import ToggleButtons from "./togglebuttons";


export default function Sidebar():React.ReactElement {

  return (
    <div className="sidebar--container">
        <h3>about</h3>
        <div className="sidebar__divider__line"></div>
        <h3>filters</h3>
        <ToggleButtons />
        <ToggleButtons/>
        <div className="sidebar__divider__line"></div>
        <h3>add todo</h3>
        <div>
         <Addtodo/>
        </div>
    </div>
  )
}
