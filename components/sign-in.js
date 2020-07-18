import React, { Component } from 'react';
import styles from './sign-in.module.css';
import Tabs from './tabs.js';

export default class SignIn extends React.Component {
    render() {
        const {
            onSignInGoogle,
            name,
            onName,
            email,
            onEmail,
            password,
            onPassword,
            passwordAgain,
            onPasswordAgain,
            onCreateAccount,
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
                    <form className={styles.section} onSubmit={onCreateAccount}>
                        <label>
                            Name:
                            <input
                                type="text"
                                onChange={onName}
                                placeholder="Enter your full name"
                                value={name}
                                disabled={loading}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                onChange={onEmail}
                                placeholder="Enter your email"
                                value={email}
                                disabled={loading}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                onChange={onPassword}
                                placeholder="Enter your password"
                                value={password}
                                disabled={loading}
                            />
                        </label>
                        <label>
                            Password again:
                            <input
                                type="password"
                                onChange={onPasswordAgain}
                                placeholder="Enter your password again"
                                value={passwordAgain}
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
                                onChange={onEmail}
                                placeholder="Enter your email"
                                value={email}
                                disabled={loading}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                onChange={onPassword}
                                placeholder="Enter your password"
                                value={password}
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
