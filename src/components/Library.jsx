import React from "react";

export default function Library({
  library_open,
  songs,
  setMusic,
  setN_P_songs,
  setLibraryHandler
}) {
  
  function change_current_audio(id) {
    let item_id = 0;
    const new_song = songs.filter((song, item) => {
      if (song.id == id) {
        item_id = item;
        return true;
      }
      return false;
    });

    let next_audio = item_id < songs.length - 1 ? item_id + 1 : 0;
    let previous_audio = item_id > 0 ? item_id - 1 : songs.length - 1;
    setN_P_songs([new_song[0], songs[next_audio], songs[previous_audio]]);
    setMusic({
      duration: 0,
      played: true,
      currentTime: 0,
    });
  }

  return (
    <div className={`library_container ${library_open ? "open_library" : ""} `}>
        <div onClick={setLibraryHandler} className="close">X</div>
      <h2>Library</h2>
      <div className="list">
        {songs.map((music) => (
          <div
            key={music.id}
            className="item"
            onClick={() => change_current_audio(music.id)}
          >
            <div className="img">
              <img src={music.cover} alt="" />
            </div>
            <div className="info">
              <h3>{music.name}</h3>
              <p>{music.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
