import { auth, db } from '../database/firestore.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from '../pages/page.module.css';
import SignInComponent from '../components/sign-in.js';
import withAuth, { AuthHeader } from '../helpers/withAuth.js';
import Router from 'next/router';

export class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordAgain: '',
            error: null,
            loading: false
        };
    }
    
    componentDidMount() {
        // Don't show if signed in
        if (this.props.userId) {
            Router.push('/');
        }
    }

    handleSignInGoogle = async () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.setState({
            error: '',
            loading: true
        });
        try {
            await auth.signInWithPopup(provider);
            this.handleAuthenticated();
        } catch (error) {
            this.handleAuthError(error);
        }
    };

    handleCreateAccount = async (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.passwordAgain) {
            this.setState({
                error: 'Passwords do not match.'
            });
            return;
        }
        this.setState({
            error: '',
            loading: true
        });
        try {
            await auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
            await this.props.updateUser({ name: this.state.name });
            this.handleAuthenticated();
        } catch (error) {
            this.handleAuthError(error);
        }
    };

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    };
    
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    };
    
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };
    
    handlePasswordAgainChange = (e) => {
        this.setState({
            passwordAgain: e.target.value,
            error: this.state.password === e.target.value
                ? null
                : 'Passwords do not match.'
        });
    };
    
    handleSignIn = async (e) => {
        e.preventDefault();
        this.setState({
            error: '',
            loading: true
        });
        try {
            await auth.signInWithEmailAndPassword(this.state.email, this.state.password);
            this.handleAuthenticated();
        } catch (error) {
            this.handleAuthError(error);
        }
    };
    
    handleAuthenticated() {
        this.setState({
            loading: false
        });
    }
    
    handleAuthError({ code, message }) {
        console.error (code, message);
        this.setState({
            error: message,
            loading: false
        });
    }

    render() {
        const {
            name,
            email,
            password,
            passwordAgain,
            error,
            loading
        } = this.state;
        return <div className={styles.pageWrapper}>
            <AuthHeader current="sign-in" />
            <div className={styles.pageContent} style={{ alignItems: 'center' }}>
                <SignInComponent
                    onSignInGoogle={this.handleSignInGoogle}
                    name={name}
                    onName={this.handleNameChange}
                    email={email}
                    onEmail={this.handleEmailChange}
                    password={password}
                    onPassword={this.handlePasswordChange}
                    passwordAgain={passwordAgain}
                    onPasswordAgain={this.handlePasswordAgainChange}
                    onCreateAccount={this.handleCreateAccount}
                    onSignIn={this.handleSignIn}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>;
    }
}

export default withAuth(SignIn);
