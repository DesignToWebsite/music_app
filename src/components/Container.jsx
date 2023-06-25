import React from "react";
import Nav from "./Nav";
import Music from "./Music";

function Container({setN_P_songs, setLibraryHandler, songs,  music, setMusic, loading, next_previous_songs}) {
  return (
    <div className="container">
        <Nav  setLibraryHandler={setLibraryHandler}  />
        {loading && <Music setN_P_songs={setN_P_songs} songs={songs} music={music} setMusic={setMusic}  next_previous_songs={next_previous_songs} />}
    </div>
  );
}

export default Container;
