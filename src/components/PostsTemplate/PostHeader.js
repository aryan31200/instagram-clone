import React from "react";
import "./post-stylesheets/postHeader-styles.css";

function PostHeader(props) {
  // const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="Post-user">
        <button
          // onMouseOver={() => setOpen(true)}
          // onMouseOut={() => setOpen(false)}
        >
          <div className="Post-user-avatar">
            <img alt="profileImage" src={props.profileImg} />
          </div>
        </button>

        {/* {open && (
          <div className="dropdown-content">
            <span style={{ fontWeight: 600 }}>Signed in as:</span>
            <br />
          </div>
        )} */}

        <button>
          <div className="Post-user-nickname">
            <span>{props.profileName}</span>
          </div>
        </button>

        {/* <div className="Post-menu-option">
          <a href="#post-menu" className="font-icons">
            <svg height="16" viewBox="0 0 48 48" width="16">
              <circle
                clipRule="evenodd"
                cx="8"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="24"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="40"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
            </svg>
          </a>
        </div> */}
        
      </div>
    </header>
  );
}

export default PostHeader;
