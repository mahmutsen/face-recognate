import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognation from './components/FaceRecognation/FaceRecognation'

import './App.css';

const particlesOptions={
  "particles": {
  "number": {
      "value": 100
  },
  "size": {
      "value": 3
  }
},
"interactivity": {
  "events": {
      "onhover": {
          "enable": true,
          "mode": "repulse"
      }
  }
}}

const initialState = {
  input: '',
  imageUrl: '',
  boxRegion: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id : data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateBoxRegion = (data) => {
    const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const height = Number(img.height);
    const width = Number(img.width);
    return {
      topRow : height * boundingBox.top_row,
      rightCol : width - (width * boundingBox.right_col),
      bottomRow : height - (height * boundingBox.bottom_row),
      leftCol : width * boundingBox.left_col
    }  
  }

  setBoxRegion = (boxRegion) => {
    this.setState({boxRegion: boxRegion});
    console.log(this.state.boxRegion);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/imageurl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        input:this.state.input
      })
    }).then(res => res.json())
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log);
        }
        this.setBoxRegion(this.calculateBoxRegion(response));
      })
      .catch( err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Particles params = {particlesOptions} className = "particles" />
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {
          this.state.route === 'home' 
            ? <div>
                <Logo />
                <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
                <ImageLinkForm 
                  onInputChange = {this.onInputChange} 
                  onPictureSubmit = {this.onPictureSubmit}/>
                <FaceRecognation boxRegion = {this.state.boxRegion} imageUrl = {this.state.imageUrl}/>
             </div>
            : (
              this.state.route === 'signin'
              ? <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/> 
              : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
              )   
        }  
      </div>
    );
  }  
}

export default App;
