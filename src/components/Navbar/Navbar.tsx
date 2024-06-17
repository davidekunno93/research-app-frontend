import { useEffect, useRef, useState } from 'react'
import "./navbar.css"

const Navbar = () => {
  // [imports]

  // [onload]

  // [other functions]

  // [elements]
  // navigation dropdown
  const [navDropDownOpen, setNavDropDownOpen] = useState<boolean>(false);
  const navDropDownRef = useRef<HTMLInputElement>(null);
  const navDropDownPointerRef = useRef<HTMLInputElement>(null);
  const hideOnClickOutsideNavDropDown = (e: any) => {
    if (navDropDownRef.current && !navDropDownRef.current.contains(e.target)) {
      if (navDropDownPointerRef.current && !navDropDownPointerRef.current.contains(e.target)) {
        setNavDropDownOpen(false);
      }
    }
  }
  useEffect(() => {
    window.addEventListener('click', hideOnClickOutsideNavDropDown, true);
    return () => window.removeEventListener('click', hideOnClickOutsideNavDropDown, true);
  }, [])
  // profile dropdown
  const [profileDropDownOpen, setProfileDropDownOpen] = useState<boolean>(false);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="https://imgur.com/KRDXlir.png" alt="navbar-icon" className="img-fitHeight" />
      </div>

      <div className="navbar-navigations">
        <div className="option">
          <p className="m-0">AnaptysBio</p>
        </div>
        <div className="option">
          <p className="m-0">Biogen</p>
        </div>
        <div className="option">
          <p className="m-0">BMS</p>
        </div>
        <div className="option">
          <p className="m-0">Gout</p>
        </div>
        <div className="option">
          <p className="m-0">M23</p>
        </div>
        <div className="option">
          <p className="m-0">Solstice</p>
        </div>
        <div ref={navDropDownRef} className={`navigations-dropdown ${navDropDownOpen ? "shown" : "hidden"}`}>
          <div className="option">
            <p className="m-0">CVAY</p>
          </div>
          <div className="option">
            <p className="m-0">CAINR</p>
          </div>
          <div className="option">
            <p className="m-0">CAINC</p>
          </div>
          <div className="option">
            <p className="m-0">VIVID</p>
          </div>
          <div className="option">
            <p className="m-0">PREDICT</p>
          </div>
        </div>
      </div>
      <span ref={navDropDownPointerRef} onClick={() => setNavDropDownOpen(dropDownOpen => !dropDownOpen)} className={`material-symbols-outlined pointer td-2 ${navDropDownOpen && "rotate-180"}`}>
        keyboard_arrow_down
      </span>

      <div onClick={() => setProfileDropDownOpen(profileDropDownOpen => !profileDropDownOpen)} className="navbar-profile">
        <div className="profile-img">

        </div>
        <div className="profile-name">
          <p className="m-0">John Smith</p>
        </div>
        <div className={`profile-dropDown ${profileDropDownOpen ? "shown" : "hidden"}`}>
          <div className="option">
            <div className="material-symbols-outlined">
              settings
            </div>
            <p className="m-0">Account Settings</p>
          </div>
          <div className="option">
            <div className="material-symbols-outlined">
              logout
            </div>
            <p className="m-0">Sign out</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar;