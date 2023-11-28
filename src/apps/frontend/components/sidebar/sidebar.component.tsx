import React from "react";
import Addtodo from "./addtask";
import ToggleButtons from "./togglebuttons";
import { statusFiltersEnum, timelineFiltersEnum } from "../../types/task.types";

export default function Sidebar():React.ReactElement {
  const username = localStorage.getItem('username');

  const statusFilters = ['all', 'completed', 'active'] as statusFiltersEnum[];
  const timelineFilters = ['today', 'overdue', 'upcoming'] as timelineFiltersEnum[];

  return (
    <div className="sidebar--container">
        <h4 className="sidebar__text">Hello,</h4>
        <h3 className="sidebar__text">{username}</h3>
        <p className="sidebar__text">Manage all your tasks here!</p>
        <div className="sidebar__divider__line"></div>
        <h3 className="sidebar__text">Filters</h3>
        <ToggleButtons filtersArray={statusFilters} buttonsfor="status"/>
        <ToggleButtons filtersArray={timelineFilters} buttonsfor="timeline"/>
        <div className="sidebar__divider__line"></div>
        <h3 className="sidebar__text">Add Todo</h3>
        <div>
         <Addtodo/>
        </div>
    </div>
  )
}
