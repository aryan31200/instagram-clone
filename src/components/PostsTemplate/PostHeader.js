import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import "./post-stylesheets/postHeader-styles.css";


function PostHeader(props){
    return(
        <header>
            <div className="Post-user">
                <a href="#profile">
                    <div className="Post-user-avatar">
                        <img alt="profileImage" src={props.profileImg} />
                    </div>
                </a>
                <a href="#profile">
                    <div className="Post-user-nickname">
                        <span>{props.profileName}</span>
                    </div>
                </a>
                <div className="Post-menu-option">
                    <a href="#post-menu" className="font-icons">
                        <svg height="16" viewBox="0 0 48 48" width="16">
                            <circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle>
                            <circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle>
                            <circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle>
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default PostHeader;