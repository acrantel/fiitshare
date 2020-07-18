import { auth, db } from '../database/firestore.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from '../pages/page.module.css';
import SignInComponent from '../components/sign-in.js';
import Header from '../components/header.js';
import withAuth from '../helpers/withAuth.js';

const AuthHeader = withAuth(Header, { header: true });

class SignIn extends React.Component {

    constructor(props)
{
    super(props);
    this.state = {
        createEmail: '',
        createPassword: '',
        email: '',
        password: '',
        error: null,
        loading: false
    };

    this.handleSignInGoogle = this.handleSignInGoogle.bind(this);
    this.handleSignInEmailPassword = this.handleSignInEmailPassword.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCreateEmailPassword = this.handleCreateEmailPassword.bind(this);
    this.handleCreateEmailChange = this.handleCreateEmailChange.bind(this);
    this.handleCreatePasswordChange = this.handleCreatePasswordChange.bind(this);
}

    handleSignInGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.setState({
            error: '',
            loading: true
        });
        auth.signInWithPopup(provider)
            .then(() => {
                console.log('Signed in successfully.');
                this.setState({
                    loading: false
                });
            })
            .catch(err => {
                console.log('Oops, something went wrong, check your console.');
                console.log(err);
                this.setState({
                    error: err.message,
                    loading: false
                });
            });
    }

    handleCreateEmailChange = (e) => {
        this.setState({createEmail: e.target.value});
    }
    handleCreatePasswordChange = (e) => {
        this.setState({createPassword: e.target.value });
    }
    handleCreateEmailPassword = (e) => {
        e.preventDefault();
        this.setState({
            error: '',
            loading: true
        });
        auth.createUserWithEmailAndPassword(this.state.createEmail, this.state.createPassword).then(() => {
            this.setState({
                loading: false
            });
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode + errorMessage);
            this.setState({
                error: errorMessage,
                loading: false
            });
        });
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    handleSignInEmailPassword = (e) => {
        e.preventDefault();
        this.setState({
            error: '',
            loading: true
        });
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.setState({
                loading: false
            });
        }).catch((error) => {
            console.error (error.code + error.message);
            this.setState({
                error: error.message,
                loading: false
            });
        });
    }

    render() {
        const {
            createEmail,
            createPassword,
            email,
            password,
            error,
            loading
        } = this.state;
        return <div className={styles.pageWrapper}>
            <AuthHeader current="sign-in" />
            <div className={styles.pageContent} style={{ alignItems: 'center' }}>
                <SignInComponent
                    onSignInGoogle={this.handleSignInGoogle}
                    newAccountEmail={createEmail}
                    newAccountPassword={createPassword}
                    onChangeNewAccountEmail={this.handleCreateEmailChange}
                    onChangeNewAccountPassword={this.handleCreatePasswordChange}
                    onNewAccount={this.handleCreateEmailPassword}
                    signInEmail={email}
                    signInPassword={password}
                    onChangeSignInEmail={this.handleEmailChange}
                    onChangeSignInPassword={this.handlePasswordChange}
                    onSignIn={this.handleSignInEmailPassword}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>;
    }
}



export default SignIn;