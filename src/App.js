import React from "react";
import userData from "./userData";
import PostCard from "./components/PostsTemplate/PostCard";
import Navbar from "./components/NavbarTemplate/Navbar";
import { db } from "./firebase";

function App(){

    return(
        <div>
            <Navbar />
            {userData.map((props) => {
                return(
                    <PostCard
                        key={props.id}
                        profileImg={props.profileImg}
                        profileName={props.profileName}
                        postImg={props.postImg}
                        caption={props.caption}
                        likes={props.likes}
                    />
                );
            })}
        </div>
    );
}

export default App;
