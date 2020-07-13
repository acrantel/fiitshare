import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import styles from '../../pages/page.module.css';

function WorkoutVideo({ workoutID }) {
    return <div>
        <Header />
        <div className={styles.workoutvidContainer}>
            <div className={styles.videoStatusBar}>

            </div>
            <div className={styles.videoCurrentExercise}>

            </div>
        </div>
        </div>
}

export default WorkoutVideo