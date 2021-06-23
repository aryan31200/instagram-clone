import React , { useState } from 'react';           

import {db , storage} from '../../firebase';
import firebase from 'firebase';
import "./imgUploadStyle.css";

function ImgUpload({onClose,show,username,profImg,mail}) {
    const [caption , setCaption] = useState('');
    const [likesnum,setLikes] = useState(0); 
    const [image, setImage] = useState(null);
    const [progress,setProgress] = useState(0);

    const userHandle=username.replace(/ /g,"_").toLowerCase();

    const handleChange = (e) =>{
        var file=e.target.files[0];
        //console.log(e.target.files[0]);
        if(file){
            var ext=file.name.match(/\.([^.]+)$/)[1];
            switch(ext){
                case 'jpg':
                case 'JPG':
                case 'JPEG':
                case 'jpeg':
                case 'bmp':
                case 'BMP':
                case 'png':
                case 'PNG':
                    setImage(file);
                    break;
                default:
                    alert("File type not supported \nOnly .jpg, .bmp, .png allowed");
                    file="";
                    setImage(null);
            }  
        }
    }

    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
                if(progress===100){
                    onClose();
                    enableScrolling();
                }
            },
            (error) =>{
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        postImg : url,
                        profileName : userHandle,
                        likes:likesnum,
                        profileImg: profImg,
                        userMail : mail
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                    setLikes(null);
                });
            }
        )
    }
    function enableScrolling(){
        window.onscroll=function(){};
    }
    function disableScrolling(){
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    }
    if(!show){
        return null;
    }else{
        disableScrolling();
    }
    return (
        <div 
            className="modal" 
            onClick={()=>{
                onClose();
                setImage(null);
                enableScrolling();
            }}
        >
            <div className="modal-content"  onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <span className="header-span">Post Image:</span>
                    <button className="close-button" onClick={()=>{
                        onClose();
                        setImage(null);
                        enableScrolling();
                    }}>
                        <svg height="20" width="20">
                            <line x1="5" y1="5" x2="15" y2="15" style={{stroke:"var(--caption-font-color)",strokeWidth:3}} />
                            <line x1="15" y1="5" x2="5" y2="15" style={{stroke:"var(--caption-font-color)",strokeWidth:3}} />
                        </svg>
                    </button>
                </div>
                <div className='ImageUpload'> 
                    <input type = "file" accept="image/bmp, image/png, image/jpeg" onChange = {handleChange} />
                    <input className="caption_input" type = "text" placeholder = "Enter a Caption" onChange={event => setCaption(event.target.value)} />
                    <progress className= 'ImageUpload__progress' value ={progress} max="100" />
                    <button className="upload_button" onClick={handleUpload} disabled={image===null && "true"} style={image===null?{cursor:"not-allowed"}:{cursor:"pointer"}}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImgUpload;