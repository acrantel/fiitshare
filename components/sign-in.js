import React, { Component } from 'react';
import styles from './sign-in.module.css';
import Tabs from './tabs.js';

export default class SignIn extends React.Component {
    render() {
        const {
            onSignInGoogle,
            newAccountEmail,
            newAccountPassword,
            onChangeNewAccountEmail,
            onChangeNewAccountPassword,
            onNewAccount,
            signInEmail,
            signInPassword,
            onChangeSignInEmail,
            onChangeSignInPassword,
            onSignIn,
            error,
            loading
        } = this.props;
        return <div className={styles.wrapper}>
            <div className={styles.section}>
                <button onClick={onSignInGoogle} disabled={loading}>
                    Sign in using Google
                </button>
            </div>
            <span className={styles.or}>or</span>
            <Tabs>
                <div label="Create an account">
                    <form className={styles.section} onSubmit={onNewAccount}>
                        <label>
                            Email:
                            <input
                                type="text"
                                onChange={onChangeNewAccountEmail}
                                placeholder="Enter your email"
                                value={newAccountEmail}
                                disabled={loading}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                onChange={onChangeNewAccountPassword}
                                placeholder="Enter your password"
                                value={newAccountPassword}
                                disabled={loading}
                            />
                        </label>
                        
                        <input
                            type="submit"
                            value="Create account"
                            className="button"
                            disabled={loading}
                        />
                    </form>
                </div>
                <div label="Sign in">
                    <form className={styles.section} onSubmit={onSignIn}>
                        <label>
                            Email:
                            <input
                                type="text"
                                onChange={onChangeSignInEmail}
                                placeholder="Enter your email"
                                value={signInEmail}
                                disabled={loading}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                onChange={onChangeSignInPassword}
                                placeholder="Enter your password"
                                value={signInPassword}
                                disabled={loading}
                            />
                        </label>
                        
                        <input
                            type="submit"
                            value="Sign in"
                            className="button"
                            disabled={loading}
                        />
                    </form>
                </div>
            </Tabs>
            {error !== null ? <div className={styles.error}>
                {error}
            </div> : null}
        </div>;
    }
}
