import React, { Component } from 'react'
import Header from '../../components/header.js';
import styles from '../page.module.css';
import UserChart from '../../components/user/user-chart.js';
import DashboardRight from '../../components/groups-sidebar.js';
import { getUser } from '../../utils/api.js';

function randomGradient() {
    const channels = Array.from('rgbrgb', () => Math.floor(Math.random() * 256));
    return `linear-gradient(${
        Math.random() * 360
        }deg, rgb(${
        channels.slice(0, 3).join(',')
        }), rgb(${
        channels.slice(3).join(',')
        }))`;
}

function User({ userid, userDatum }) {
    const {
        cover_picture,
        picture,
        name,
        calories,
        time_spent,
        completed_workouts,
        this_week
    } = userDatum;
    return <div className={styles.pageWrapper}>
        <Header />
        <div className={styles.pageContent}>
            <div className={styles.profileContainerSmaller}>
                <div className={styles.profileImageContainer}>
                    <div className={styles.profileCoverImgContainer}>
                        <img
                            className={styles.profileCoverImg}
                            src={cover_picture}
                            style={{ backgroundImage: randomGradient() }}
                        />
                        <div className={styles.profilePicImgContainer}>
                            <img className={styles.profilePicImg} src={picture} />
                        </div>
                    </div>
                </div>

                <div className={styles.profileSectionContainer}>
                    <h2 className={styles.profileContainerLeft}>{name}</h2>
                    <div className={styles.profileContainerRight}>
                        <div className={styles.profileSectionTitle}>
                            <h1 className='section-title'><span>Stats</span></h1>
                        </div>
                        <div className={styles.profileHeaderText}>
                            <p className={styles.profileTextTitle}>Calories</p>
                            <p className={styles.profileTextDes}>{calories}</p>
                        </div>
                        <div className={styles.profileHeaderText}>
                            <p className={styles.profileTextTitle}>Time</p>
                            <p className={styles.profileTextDes}>{time_spent}</p>
                        </div>
                        <div className={styles.profileHeaderText}>
                            <p className={styles.profileTextTitle}>Workouts</p>
                            <p className={styles.profileTextDes}>{completed_workouts}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.profileSectionContainer}>
                    {this_week ? <div className={styles.profileContainerLeft}>
                        <h1 className='section-title'><span>Activity</span></h1>
                        <p className={styles.profileTextTitle}>This week: 5 workouts</p>
                        <UserChart valArr={this_week.activity} type='time' />
                        <h1 className='section-title'><span>Calories</span></h1>
                        <p className={styles.profileTextTitle}>This week: 300 calories</p>
                        <UserChart valArr={this_week.calories} type='' />
                    </div> : <div className={styles.profileContainerLeft}>
                            No activity in the past week. :(
                        </div>}
                    <div className={styles.profileContainerRight}>
                        <DashboardRight userId={userid} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

User.getInitialProps = async ({ query }) => {
    const { userid } = query;
    const userDatum = await getUser(userid);
    return { userid, userDatum };
};

export default User
