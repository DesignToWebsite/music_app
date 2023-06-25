import React from "react";
import { useState, useEffect } from "react";
import "../assets/sass/main.css";
import { v4 as uuidv4 } from "uuid";
import chillHop from "../data/util";
import Container from "./Container";
import Library from "./Library";

function App() {
  const [library_open, setLibrary_open] = React.useState(false);
  const [next_previous_songs, setN_P_songs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [music, setMusic] = useState({
    duration: 0,
    played: false,
    currentTime: 0,
  });
  let id_music = 0;
  //set the data
  // useEffect(() => {
  //   setSongs(chillHop());
  //   setN_P_songs([chillHop()[0], chillHop()[1], chillHop()[chillHop().length-1]]);
  // }, []);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      const data =  chillHop(); // Fetch the data
      setSongs(data);
      setN_P_songs([data[0], data[1], data[data.length - 1]]);
      setLoading(true); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);


  //open or close library container
  function setLibraryHandler(){
    if(library_open){
        setLibrary_open(false);
    }else{
        setLibrary_open(true);
    }
  }

  return (
    <div className="home_page">
      <Container
        music={music}
        setMusic={setMusic}
        library_open={library_open}
        setLibrary_open={setLibrary_open}
        next_previous_songs={next_previous_songs}
        loading={loading}
        songs={songs}
        setN_P_songs={setN_P_songs}
        setLibraryHandler={setLibraryHandler}
      />

      <Library
        next_previous_songs={next_previous_songs}
        setN_P_songs={setN_P_songs}
        setMusic={setMusic}
        library_open={library_open}
        songs={songs}
        loading={loading}
        setLibraryHandler={setLibraryHandler}
        id_music={id_music}
      />
    </div>
  );
}

export default App;
