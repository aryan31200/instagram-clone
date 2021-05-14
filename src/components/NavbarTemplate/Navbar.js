import React, { useState } from "react";
import { signInWithGoogle } from "../../firebase";
import "./navbarStyle.css";
import img from "./nav-logo.png";
import googleLogo from "./transparent-gif.gif";
import ImgUpload from "../ImageUpload/ImgUpload";

function Navbar(props) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="outer-div">
      <nav className="navbar">
        <div className="menu">
          <div className="item item-left">
            <button>
              <img className="logo" alt="Instagram-logo" src={img} />
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
                  <button onClick={() => setOpen(prev=>!prev)}>
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
                        stroke="black"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <line
                        x1="15"
                        y1="7"
                        x2="15"
                        y2="23"
                        style={{ stroke: "black", strokeWidth: 1.5 }}
                      />
                      <line
                        x1="7"
                        y1="15"
                        x2="23"
                        y2="15"
                        style={{ stroke: "black", strokeWidth: 1.5 }}
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

                  {open && (
                    <div style={open?{display:"block"}:{display:"none"}} className="dropdown-content">
                      <span style={{ fontWeight: 600 }}>Signed in as:</span>
                      <br />
                      <span>
                        {props.userAvailable.displayName
                          .replace(/ /g, "_")
                          .toLowerCase()}
                      </span>{" "}
                      <hr color="#dbdbdb" size="1" />
                      <button className="outlogger" onClick={props.logout}>
                        <span className="logout">Logout</span>
                      </button>
                    </div>
                  )}
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
