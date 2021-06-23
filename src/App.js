import React, { useEffect, useState } from "react";
import PostCard from "./components/PostsTemplate/PostCard";
import Navbar from "./components/NavbarTemplate/Navbar";
import { auth, db } from "./firebase";

function App() {
  const [postData, setpostData] = useState([]);
  const [user,setUser] = useState(null);
  const [theme,setTheme]=useState(()=>{
    const val=localStorage.getItem('mode');
    return val ? val:'light';
  });

  useEffect(()=>{
    localStorage.setItem('mode',theme);
    document.body.dataset.theme=theme;
  },[theme])

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      }else{
        setUser(null);
      }
    })
    return ()=>{
      unsubscribe();
    }
  },[user])

  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setpostData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
    
  function modeChanger(){
    setTheme(theme==='light'?'dark':'light');
  }

  return (
    <div>
      <Navbar userAvailable={user} logout={()=>auth.signOut()} modeChange={()=>modeChanger()} modeTheme={theme}/> 
      <div>
        {postData.map(({ id, post }) => {
          return (
            <PostCard
              key={id}
              postId={id}
              user={user}
              profileImg={post.profileImg}
              profileName={post.profileName}
              postImg={post.postImg}
              caption={post.caption}
              likes={post.likes}
            />
          );
        })}
      </div>
      <p className="credits_span">Made by <strong>Aryan Gupta</strong></p>
    </div>
  );
}

export default App;
