import React from "react"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Jumbotron, Button, Image } from "react-bootstrap"
import "./App.css"

firebase.initializeApp({
  apiKey: "AIzaSyD_PKvd7ag-k-N-Rvu3KbSsLqfLG_92PaY",
  authDomain: "react-firebase-auth-ace44.firebaseapp.com"
})

class App extends React.Component {
  state = {
    isSignedIn: false
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
    var user = firebase.auth().currentUser

    if (user) {
      this.setState({ isSignedIn: true })
    } else {
      this.setState({ isSignedIn: false })
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <Jumbotron>
              <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
              <Button onClick={() => firebase.auth().signOut()}>
                Sign out
              </Button>
            </Jumbotron>

            <Image
              alt="profile"
              src={firebase.auth().currentUser.photoURL}
              circle
            />
          </span>
        ) : (
          <span>
            <Jumbotron>
              <h1>Sign In</h1>
            </Jumbotron>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </span>
        )}
      </div>
    )
  }
}

export default App
