import React, { useEffect, useState } from "react";
import PostCard from "./components/PostsTemplate/PostCard";
import Navbar from "./components/NavbarTemplate/Navbar";
import { auth, db } from "./firebase";
import "dotenv/config";

console.log(process.env);

function App() {
  const [postData, setpostData] = useState([]);
  const [user,setUser] = useState(null);
  const [theme,setTheme]=useState(()=>{
    const val=localStorage.getItem('mode');
    if(val){
      return val;
    }else{
      const darkThemeCheck=window.matchMedia("(prefers-color-scheme:dark)");
      console.log(darkThemeCheck);
      if(darkThemeCheck.matches){
        return 'dark';
      }else{
        return 'light';
      }
    }
  });

  useEffect(()=>{
    document.addEventListener('contextmenu',(e)=>{
      e.preventDefault();
    })
  },[]);
  
  useEffect(()=>{
    localStorage.setItem('mode',theme);
    document.body.dataset.theme=theme;
  },[theme])

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        localStorage.setItem('isLogged',true);
        setUser(authUser);
      }else{
        localStorage.removeItem('isLogged');
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
