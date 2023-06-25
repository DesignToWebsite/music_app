import React from "react";

export default function Nav({setLibraryHandler}){
    
    return(
        <div className="nav">
            <div className="logo">
                <a href="#">Waves</a>
            </div>
            <div className="library_btn">
                <button onClick={setLibraryHandler}>
                    Library 
                    <i className="fa-solid fa-music"></i>
                </button>
            </div>
        </div>
    )
}