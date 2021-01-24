// Ten komponent jest odpowiedzialny stricte za analizę przepływu dźwięku przy pomocy WEB AUDIO API i przechowywanie danych z analizy w stanie.
// Pasmo dźwiękowe przekazywane jest do tego komponentu za pomocą props z komponentu rodzica.

// 1: Gdy komponent zostanie zamontowany  ustawiane są obiekty WEB AUDI API.

import {useState, useEffect, useRef} from 'react'

// import { Component } from 'react'

// class AudioAnalyser extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { audioData: new Uint8Array(0) };
//         this.tick = this.tick.bind(this);
//       }

    
//     tick() {
//         this.analyser.getByteTimeDomainData(this.dataArray);
//         this.setState({ audioData: this.dataArray });
//         this.rafId = requestAnimationFrame(this.tick);
//       }

//     componentDidMount() {
//         this.audioContext = new (window.AudioContext ||
//           window.webkitAudioContext)();
//         this.analyser = this.audioContext.createAnalyser();
//         this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
//         this.source = this.audioContext.createMediaStreamSource(this.props.audio);
//         this.source.connect(this.analyser);
//         this.rafId = requestAnimationFrame(this.tick);
//       }

//       componentWillUnmount() {
//         cancelAnimationFrame(this.rafId);
//         this.analyser.disconnect();
//         this.source.disconnect();
//       }

//       render() {
//         return <textarea value={this.state.audioData} />;
//       }
// }

// export default AudioAnalyser;

const AudioAnalyser = ({audio}) => {
    const [audioData, setAudioData] = useState(new Uint8Array(0))
    let audioContext = useRef();
    let analyser = useRef();
    let dataArray;
    let source = useRef();
    let rafId = useRef();

    useEffect( () => {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)(); // tworzymy nowy audioContext. Safari obłsługuje tylko wersję z webkitem...
        analyser.current = audioContext.current.createAnalyser();
        dataArray = new Uint8Array(analyser.current.frequencyBinCount);
        source.current = audioContext.current.createMediaStreamSource(audio)
        source.current.connect(analyser.current)
        rafId.current = requestAnimationFrame(tick);
        console.log('effectss')

        return () => {
            cancelAnimationFrame(rafId.current)
            analyser.current.disconnect();
            source.current.disconnect();
        }
    }, [audio])
    
    const tick = () => {
        console.log('tick')
        analyser.current.getByteTimeDomainData(dataArray);
        setAudioData(dataArray)
        requestAnimationFrame(tick)
    }

    return (
        <textarea value={audioData} />
    )
}

export default AudioAnalyser


// const AudioAnalyser = ({audio}) => {
//     console.log(audio)
//     const [audioData, setAudioData] = useState()

//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const analyser = audioContext.createAnalyser();
//     let dataArray;
//     const source = audioContext.createMediaStreamSource(audio)

//     const tick = () => {
//         console.log('im called')
//         analyser.getByteTimeDomainData(dataArray)
//         setAudioData(dataArray)
//         console.log(dataArray)
//     }

//     useEffect(() => {
//         source.connect(analyser)
//         dataArray = new Uint8Array(analyser.frequencyBinCount);
//         const rafId = requestAnimationFrame(tick)

//         return () => {
//             analyser.disconnect();
//             source.disconnect();
//         }
//     },[])

//     return (
//         <textarea value={audioData} />
//     )
// }

// export default AudioAnalyser