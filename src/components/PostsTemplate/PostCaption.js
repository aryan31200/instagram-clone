import React from "react";
import "./post-stylesheets/postCaption-styles.css";

function PostCaption(props){
    return(
        <div className="Post-caption">
            <button>
                <span className="post-user-nickname">{props.profileName}</span>
            </button>
            <span> {props.caption}</span>
        </div>
    )
}

export default PostCaption;