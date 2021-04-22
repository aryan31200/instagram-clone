import React from "react";
import "./post-stylesheets/postCaption-styles.css";

function PostCaption(props){
    return(
        <div className="Post-caption">
            <a href="#profile">
                <strong>{props.profileName}</strong>
            </a>
            <span> {props.caption}</span>
        </div>
    )
}

export default PostCaption;