import {useState} from 'react'
import './App.css';
import AudioAnalyser from './components/AudioAnalyser/AudioAnalyser.component'

const App = () => {

  const [audio, setAudio] = useState()
  const getMicrophone = async () => { //metoda używająca getUserMedia Api aby uzyskać dostep do mikrofonu i ustawić przekazywanie danych audio do stanu, jeżeli taki dostęp się otrzyma.
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    setAudio(audio)
  }

  const stopMicrophone = () => { // metoda zatrzymująca pobieranie dźwieku z mikorofunu i przekazywanie go do stanu
    audio.getTracks().forEach(track => track.stop());
    setAudio(null)
  }

  const toggleMicrophone = () => { // włączanie i wyłączanie mikrofonu
    if(audio) {
      stopMicrophone()
    } else {
      getMicrophone()
    }
  }

  return (
      <div className="App">
        <h1>SOUND VISUALIZER</h1>
          <div className="controls">
            <button onClick={toggleMicrophone}>
              {
                audio ? 'Stop Microphone' : 'Get Microphone'
              }
            </button>
          </div>
          {
            audio ? <AudioAnalyser audio={audio} /> : ''
          }
      </div>
  )
}

export default App;
