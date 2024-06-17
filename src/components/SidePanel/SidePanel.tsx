import React from 'react'
import "./sidepanel.css"

const SidePanel = () => {
  return (
    <>
      <div className="sidepanel-container">

        <div className="option">
          <span className="material-symbols-outlined">person_search</span>
          <p className="m-0">Subjects</p>
        </div>
        <div className="option">
          <span className="material-symbols-outlined">menu_book</span>
          <p className="m-0">Startup Information</p>
        </div>
        <div className="option">
          <span className="material-symbols-outlined">local_library</span>
          <p className="m-0">Study Information</p>
        </div>
        <div className="option">
          <span className="material-symbols-outlined">local_library</span>
          <p className="m-0">Protocol / ICF</p>
        </div>
        <div className="option">
          <span className="material-symbols-outlined">group</span>
          <p className="m-0">Study Team</p>
        </div>
      </div>
    </>
  )
}
export default SidePanel;