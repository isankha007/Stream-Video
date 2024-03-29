import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import VideoPlayer from './Componets/VideoPlayer';

function App() {
  const [videoId,setVideoId] = useState(null)

  function playVideo(e, videoId){
    e.preventDefault()
    setVideoId(videoId)
  }
  return (
    <div className="App">
      {videoId && <VideoPlayer videoId={videoId}>
        </VideoPlayer>}<br/>
        <button onClick={(e)=>{playVideo(e,'v1')}}>Play video 1</button>
        <button onClick={(e)=>{playVideo(e,'v2')}}>Play video 2</button>
        <button onClick={(e)=>{playVideo(e,'v3')}}>Play video 3</button>

    </div>
  );
}

export default App;
