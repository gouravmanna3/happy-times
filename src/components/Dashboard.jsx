import React from 'react';
import Popup from 'reactjs-popup';
import { Modal, Button } from 'react-bootstrap';
import { minions } from '../assets/images/minions.gif';
import { play } from '../assets/images/play.gif';
import Confetti from 'react-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataOverview from './DataOverview';
import audio from '../assets/audio/harleysInHawaii.mp3';

import './Dashboard.css';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      showConfetti: true,
      playMusic: false
    }
    this.audioRef = React.createRef();
    this.audioRef.current = new Audio(audio);
  }

  componentDidMount() {
    // console.log('Helllo')
    // let speech = new SpeechSynthesisUtterance('Hello Likhitha');
    // window.speechSynthesis.speak(speech);
    
  }

  textToSpeech = (text) => {
    let speech = new SpeechSynthesisUtterance(text);
    speech.text = text;
    window.speechSynthesis.speak(speech);
  }

  handleClose = () => {
    this.setState({show: false, showConfetti: false})
  };

  handleShow = () => {
    this.setState({show: true})
  };

  getWelcomeModal = () => {
    const { show } = this.state;
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
        {/* {this.textToSpeech('Hello World')} */}
          <Modal.Title>Welcome Likhitha</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <img src={require('../assets/images/minions.gif')} alt="hi_minions" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  onMusicEnd = () => {
    this.setState({playMusic: false});
  }

  onPlayMusic = () => {
    this.setState(prevState => ({
      playMusic: !prevState.playMusic
    }), () => {  
    if(this.state.playMusic) {
      this.audioRef.current.play();
    } else {
      this.audioRef.current.pause();
    }
    });
    this.audioRef.current.onended = this.onMusicEnd;
  }

  render() {
    const { innerWidth: width, innerHeight: height } = window;
    const { showConfetti, playMusic } = this.state;
    return ( 
      <div>
        {/* {showConfetti &&
          <Confetti
            width={width}
            height={height}
            style={{zIndex: '2000'}}
          />
        }
        {this.getWelcomeModal()} */}
        <section className="banner">
          <div className="container">
            <div className="banner-text">
              <p>Happiness has 9 letters but mine has 8</p>
               
              {
                playMusic ?
                    <>
                    <button className="button-85" role="button" onClick={this.onPlayMusic}>
                      Pause music
                      <FontAwesomeIcon className="play-icon" icon="fa-solid fa-pause" />
                    </button>
                    <img className="music-playing" src={require('../assets/images/play.gif')} alt="music_playing" />
                  </>
                :
                  <button className="button-85" role="button" onClick={this.onPlayMusic}>
                    Play music
                    <FontAwesomeIcon className="play-icon" icon="fa-solid fa-play" />
                  </button>
              }
              
            </div>
          </div>
        </section>
        <DataOverview />
        
      </div>
    )
  }
}

export default Dashboard