import React from "react";
import "./post-stylesheets/postCaption-styles.css";

function PostCaption(props){
    return(
        <div className="Post-caption">
            <button>
                <span style={{fontWeight:600}}>{props.profileName}</span>
            </button>
            <span> {props.caption}</span>
        </div>
    )
}

export default PostCaption;