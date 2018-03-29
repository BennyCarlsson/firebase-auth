import React from "react"
import "./App.css"
import firebase from "firebase"

class App extends React.Component {
  componentDidMount = () => {
    var app = firebase.initializeApp({
      apiKey: "AIzaSyD_PKvd7ag-k-N-Rvu3KbSsLqfLG_92PaY",
      authDomain: "react-firebase-auth-ace44.firebaseapp.com"
    })
    console.log("app", app)
  }
  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user
        // ...
        console.log("token", token)
        console.log("user", result.user)
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
      })
  }
  render() {
    return (
      <div className="App">
        <button onClick={() => this.login()}>Login</button>
      </div>
    )
  }
}

export default App
