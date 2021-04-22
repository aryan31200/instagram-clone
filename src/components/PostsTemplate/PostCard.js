import React from "react";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostEngagement from "./PostEngagement";
import "./postStyles.css";

function PostCard(data){
    return(
        <article className="Post">
            <div><PostHeader profileImg={data.profileImg} profileName={data.profileName} /></div>
            <div><PostImage postImg={data.postImg} /></div>
            <div><PostEngagement postLikes={data.likes}/></div>
            <div><PostCaption profileName={data.profileName} caption={data.caption} /></div>
        </article>
    )
}

export default PostCard;