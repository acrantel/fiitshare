import Header from '../../components/header.js';
import styles from '../page.module.css';
import {userData} from '../../database/database.js';
import UserChart from '../../components/user/user-chart.js';
import  DashboardRight from '../../components/groups-sidebar.js';

function User({ userid }) {
    fetch(`http://localhost:3000/api/user/${userid}`,{
        method: 'POST',
        body: {
            test: 'adsdf'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log('asdf');
            console.log(res.status);
        }
    })
    .then((data) => {
        console.log('received data back: ', data);
    })
    return <div className={styles.pageWrapper}>
        <Header />
        <div className={styles.pageContent}>
            <div className={styles.profileContainerSmaller}>
                <div className={styles.profileImageContainer}>
                    <div className={styles.profileCoverImgContainer}>
                        <img className={styles.profileCoverImg} src={userData[userid].cover_picture} />
                        <div className={styles.profilePicImgContainer}>
                            <img className={styles.profilePicImg} src={userData[userid].picture} />
                        </div>
                    </div>
                    </div>

                    <div className={styles.profileSectionContainer}>
                        <h2 className={styles.profileContainerLeft}>{userData[userid].name}</h2>
                        <div className={styles.profileContainerRight}>
                            <div className={styles.profileSectionTitle}>
                                <h1 className='section-title'><span>Stats</span></h1>
                            </div>
                            <div className={styles.profileHeaderText}>
                                <p className={styles.profileTextTitle}>Calories</p>
                                <p className={styles.profileTextDes}>{userData[userid].calories}</p>
                            </div>
                            <div className={styles.profileHeaderText}>
                                <p className={styles.profileTextTitle}>Time</p>
                                <p className={styles.profileTextDes}>{userData[userid].time_spent}</p>
                            </div>
                            <div className={styles.profileHeaderText}>
                                <p className={styles.profileTextTitle}>Workouts</p>
                                <p className={styles.profileTextDes}>{userData[userid].completed_workouts}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.profileSectionContainer}>
                        <div className={styles.profileContainerLeft}>
                            <h1 className='section-title'><span>Activity</span></h1>
                            <p className={styles.profileTextTitle}>This week: 5 workouts</p>
                            <UserChart valArr={userData[userid].this_week.activity} type='time'/>
                            <h1 className='section-title'><span>Calories</span></h1>
                            <p className={styles.profileTextTitle}>This week: 300 calories</p>
                            <UserChart valArr={userData[userid].this_week.calories} type=''/>
                        </div>
                        <div className={styles.profileContainerRight}>
                            <DashboardRight userId={userid} />
                        </div>
                    </div>
                </div>
            </div>
        
    </div>;
}
User.getInitialProps = async ({ query }) => {
    const { userid } = query;
    return { userid };
};



export default User
