import React, { useState, useRef , useEffect} from "react";

export default function Music({setN_P_songs, songs, next_previous_songs,  music, setMusic}){
  
  const [intervalId, setIntervalId] = useState(null);

  const audioRef = useRef(null);

  if(music.played){
    audioRef.current.play();
  }
  //select the audio duration
  const handleLoadedMetadata = () => {
    setMusic(prevMusic => ({
      ...prevMusic,
      duration: audioRef.current.duration,
    }));
  };
  
  //change the audio current time base on the input value
  function setDuration_handler(e) {
    const currentTime = parseFloat(e.target.value);
    setMusic(prevMusic => ({
      ...prevMusic,
      currentTime: currentTime,
    }));
    audioRef.current.currentTime = currentTime;
  }

  //play / pause / replay the audio
  function play_btn_handler() {
    setMusic(prevMusic => ({
      ...prevMusic,
      played: !prevMusic.played,
    }));

    if (music.played) {
      audioRef.current.pause();
      clearInterval(intervalId);
    } else {
      audioRef.current.play();
      const interval = setInterval(() => {
        setMusic(prevMusic => {
          const new_current_time = prevMusic.currentTime + 1;
          //replay the audio
          if (new_current_time > music.duration) {
            console.log("bigger");
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            return {
              ...prevMusic,
              currentTime: 0,
            };            
          }
          else{
            return{
              ...prevMusic,
              currentTime: new_current_time,
            }
          }
        })


      }, 1000);
      setIntervalId(interval);
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  function time_style(time) {
    let h = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = Math.floor(time % 60);
  
    // Add leading zeros if necessary
    const formattedMin = min.toString().padStart(2, '0');
    const formattedSec = sec.toString().padStart(2, '0');
  
    if (h !== 0) {
      return `${h}:${formattedMin}:${formattedSec}`;
    } else if (min !== 0) {
      return `${min}:${formattedSec}`;
    } else {
      return `${sec}`;
    }
  }
  
  function previous_next_Handler(id, icon) {
    let item_id = 0;
    // const new_song = songs.filter((song, item) => {
    //   if (song.id == id) {
    //     item_id = item;
    //     return true;
    //   }
    //   return false;
    // });
    songs.forEach((element, index) => {
      if (element.id == id) {
        item_id = index;
      }
    });
    let current_audio = item_id;
    let next_audio = 0;
    let previous_audio = 0 ;
    if(icon == 'prev'){
       current_audio = item_id > 1 ? item_id - 1 : songs.length - 1;
       next_audio = item_id;
       previous_audio = current_audio - 1 ;
    }else if(icon == 'next'){
       current_audio = item_id < songs.length - 1 ? item_id + 1 : 0;
       next_audio = current_audio + 1;
       previous_audio = item_id ;
    }
    // p2 p1 c n1 n2
    // useEffect(())
    setN_P_songs([songs[current_audio], 
                  songs[next_audio], 
                  songs[previous_audio]]);
    
    setMusic({
      duration: 0,
      played: true,
      currentTime: 0,
    });
    console.log(item_id, id, songs.length)
    console.log(next_previous_songs)
  }

  //img bg
  const overlayStyle = {
    backgroundImage: `linear-gradient(to right, ${next_previous_songs[0].color[0]} , ${next_previous_songs[0].color[1]} )`,
  };


  return(
      <div className="music">
      <div className="info">
        <div className="cover">
          <img
          src={next_previous_songs[0].cover}  alt=""
          />
        </div>
        <div className="name">
          <h2>{next_previous_songs[0].name}</h2>
          <p>{next_previous_songs[0].artist}</p>
        </div>
      </div>
      <div className="music_player">
        <div className="start">
          <span>{time_style(music.currentTime)}</span>
        </div>
        <div className="control">
          <input
            type="range"
            max={music.duration}
            value={music.currentTime}
            name="music_control"
            id="music_control"
            onChange={setDuration_handler}
            style={overlayStyle}
          />
        </div>
        <div className="end">
          <span>{time_style(music.duration)}</span>
        </div>
      </div>
      <div className="music_control">
        <div className="previous_icon" onClick={()=> previous_next_Handler(next_previous_songs[0].id, 'prev')}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div onClick={play_btn_handler} className="play_icon">
          <i className={`fa-solid fa-pause ${music.played ? '' : 'hide'}`}></i>
          <i className= {`fa-solid fa-play ${music.played ? 'hide' : ''}`}></i>
        </div>
        <div className="next_icon" onClick={()=>previous_next_Handler(next_previous_songs[0].id, 'next')}>
          <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>
      <audio ref={audioRef} onLoadedMetadata={handleLoadedMetadata} src={next_previous_songs[0].audio}></audio>

    </div>
  )
}