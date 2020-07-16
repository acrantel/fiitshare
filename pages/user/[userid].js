import React, { Component } from 'react'
import Header from '../../components/header.js';
import styles from '../page.module.css';
import { userData } from '../../database/database.js';
import UserChart from '../../components/user/user-chart.js';
import DashboardRight from '../../components/groups-sidebar.js';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.pageContent}>
        <div className={styles.profileContainerSmaller}>
          <div className={styles.profileImageContainer}>
            <div className={styles.profileCoverImgContainer}>
              <img className={styles.profileCoverImg} src={this.props.userDatum.cover_picture} />
              <div className={styles.profilePicImgContainer}>
                <img className={styles.profilePicImg} src={this.props.userDatum.profile_picture} />
              </div>
            </div>
          </div>

          <div className={styles.profileSectionContainer}>
            <h2 className={styles.profileContainerLeft}>{this.props.userDatum.name}</h2>
            <div className={styles.profileContainerRight}>
              <div className={styles.profileSectionTitle}>
                <h1 className='section-title'><span>Stats</span></h1>
              </div>
              <div className={styles.profileHeaderText}>
                <p className={styles.profileTextTitle}>Calories</p>
                <p className={styles.profileTextDes}>{this.props.userDatum.calories}</p>
              </div>
              <div className={styles.profileHeaderText}>
                <p className={styles.profileTextTitle}>Time</p>
                <p className={styles.profileTextDes}>{this.props.userDatum.time_spent}</p>
              </div>
              <div className={styles.profileHeaderText}>
                <p className={styles.profileTextTitle}>Workouts</p>
                <p className={styles.profileTextDes}>{this.props.userDatum.completed_workouts}</p>
              </div>
            </div>
          </div>

          <div className={styles.profileSectionContainer}>
            <div className={styles.profileContainerLeft}>
              <h1 className='section-title'><span>Activity</span></h1>
              <p className={styles.profileTextTitle}>This week: 5 workouts</p>
              <UserChart valArr={this.props.userDatum.this_week.activity} type='time' />
              <h1 className='section-title'><span>Calories</span></h1>
              <p className={styles.profileTextTitle}>This week: 300 calories</p>
              <UserChart valArr={this.props.userDatum.this_week.calories} type='' />
            </div>
            <div className={styles.profileContainerRight}>
              <DashboardRight userId={this.props.userid} />
            </div>
          </div>
        </div>
      </div>

    </div>;
  }
}

User.getInitialProps = async ({ query }) => {
  const { userid } = query;
  console.log(userid);
  const userDatum = await fetch(`http://localhost:3000/api/user/${userid}`, {
    method: 'GET'
  })
    .then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))
  return { userid, userDatum };
};

export default User
