import React, { useState } from "react";
import { signInWithGoogle } from "../../firebase";
import "./navbarStyle.css";
import lightmodeimg from "./nav-logo.png";
import darkmodeimg from "./nav-dark-mode-logo.png";
import googleLogo from "./transparent-gif.gif";
import ImgUpload from "../ImageUpload/ImgUpload";

function Navbar(props) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  var newClass=close?"":"exit";

  return (
    <div className="outer-div">
      <nav className="navbar">
        <div className="menu">
          <div className="item item-left">
            <button>
              <img className="logo" alt="Instagram-logo" src={props.modeTheme==="dark"?darkmodeimg:lightmodeimg} />
            </button>
          </div>
          <div className="item item-center">
            <input className="search_bar" type="text" placeholder="Search" />
          </div>
          <div className="item item-right">
            <div className="right-buttons">
              {props.userAvailable === null ? (
                <button className="inlogger" onClick={signInWithGoogle}>
                  <img className="logo2" alt="" src={googleLogo} />
                  <span className="login">Login</span>
                </button>
              ) : (
                <>
                  <button onClick={() => {setOpen(prev=>!prev); setClose(prev=>!prev); newClass=close?"":"exit"; console.log(open,close)}}>
                    <img
                      className="pfp"
                      alt=""
                      src={props.userAvailable.photoURL}
                    />
                  </button>
                  <button onClick={() => setShow(true)}>
                    <svg className="right-icon" width="30" height="30">
                      <circle
                        cx="15"
                        cy="15"
                        r="14"
                        stroke="var(--caption-font-color)"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <line
                        x1="15"
                        y1="7"
                        x2="15"
                        y2="23"
                        style={{ stroke: "var(--caption-font-color)", strokeWidth: 1.5 }}
                      />
                      <line
                        x1="7"
                        y1="15"
                        x2="23"
                        y2="15"
                        style={{ stroke: "var(--caption-font-color)", strokeWidth: 1.5 }}
                      />
                    </svg>
                  </button>
                  <ImgUpload
                    onClose={() => setShow(false)}
                    show={show}
                    username={props.userAvailable.displayName}
                    profImg={props.userAvailable.photoURL}
                    mail={props.userAvailable.email}
                  />

                  <div className={"dropdown-content "+ newClass}>
                    <span style={{ fontWeight: 600 }}>Signed in as:</span>
                    <br />
                    <span>
                      {props.userAvailable.displayName
                        .replace(/ /g, "_")
                        .toLowerCase()}
                    </span>
                    <p style={{fontWeight: 600,paddingBottom:"10px",borderBottom:"1px solid var(--border-color)"}}>Dark Mode
                    <label className="switch">
                      <input className="themeToggle" type="checkbox" defaultChecked={props.modeTheme==="dark"?true:false} onChange={()=>props.modeChange()}/>
                      <div></div>
                    </label>
                    </p>
                    
                    <button className="outlogger" onClick={props.logout}>
                      <span className="logout">Logout</span>
                    </button>
                  </div>
                  
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
