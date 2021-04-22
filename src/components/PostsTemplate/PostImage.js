import React from "react";
import "./post-stylesheets/postImage-styles.css";

function PostImage(props){
    return(
        <div className="Post-image">
            <div className="Post-image-bg">
                <img alt="Icon Living" src={props.postImg} />
            </div>
        </div>
    )
}

export default PostImage;