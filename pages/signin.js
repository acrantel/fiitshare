
import { auth, db } from '../database/firestore.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from '../pages/page.module.css';

class SignIn extends React.Component {

    constructor(props)
{
    super(props);
    this.state = {createEmail: '', createPassword: '', email: '', password: ''};

    this.handleSignInGoogle = this.handleSignInGoogle.bind(this);
    this.handleSignInEmailPassword = this.handleSignInEmailPassword.bind(this);
    this.handleCreateEmailPassword = this.handleCreateEmailPassword.bind(this);
    this.handleCreateEmailChange = this.handleCreateEmailChange.bind(this);
    this.handleCreatePasswordChange = this.handleCreatePasswordChange.bind(this);

    //this.postNewUser = this.postNewUser.bind(this);
}

    handleSignInGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth.signInWithPopup(provider)
            .then(() => {
                alert('Signed in successfully.');
            })
            .catch(err => {
                alert('Oops, something went wrong, check your console.');
                console.log(err);
            });
    }

    handleCreateEmailChange = (e) => {
        this.setState({createEmail: e.target.value});
    }
    handleCreatePasswordChange = (e) => {
        this.setState({createPassword: e.target.value });
    }
    handleCreateEmailPassword = () => {
        console.log(this.state.createEmail);
        console.log(this.state.createPassword);
        auth.createUserWithEmailAndPassword(this.state.createEmail, this.state.createPassword).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode + errorMessage);
        });
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    handleSignInEmailPassword = () => {
        console.log("todo, sign in with email pass");
    }

    handleLogout = () => {
        auth.signOut().then(function () {
            alert('Logout successful.');
        }).catch(function (error) {
            alert('Oops, something went wrong, check your console.');
            console.log(err);
        });
    }

    render() {
        return <div className={styles.pageWrapper}>
            <h1 className={styles.headingWrapper}>Welcome to Firebase Authentication in Next.js!</h1>
            <div className={styles.contentWrapper}>
                <div className={styles.signInSection}>
                    <button onClick={this.handleSignInGoogle}>Sign in using Google</button>
                </div>
                <div className={styles.signInSection}>
                    <button onClick={this.handleCreateEmailPassword}>Create an account</button>
                </div>
                <div className={styles.signInSection}>
                    <label>Email: </label>
                    <input type="text" onChange={this.handleCreateEmailChange} placeholder="Enter your email"></input>
                    <label>Password: </label>
                    <input type="text" onChange={this.handleCreatePasswordChange} placeholder="Enter your password"></input>
                    
                    <button onClick={this.handleCreateEmailPassword}>Create account</button>
                </div>

                <div className={styles.signInSection}>
                    <label>Email: </label>
                    <input type="text" onChange={this.handleEmailChange} placeholder="Enter your email"></input>
                    <label>Password: </label>
                    <input type="text" onChange={this.handlePasswordChange} placeholder="Enter your password"></input>
                    
                    <button onClick={this.handleSignInEmailPassword}>Sign in</button>
                </div>


                <div className={styles.signInSection}>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div></div>
    }
}



export default SignIn;