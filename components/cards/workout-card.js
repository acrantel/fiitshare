import styles from './workout-card.module.css';
import { MdNotificationsNone } from 'react-icons/md';

export default class WorkoutCard extends React.Component {
    render() {
        const {
            workoutId,
            workoutDatum = {},
        } = this.props
        const {
            name = 'Unknown Workout',
            creator = 'Anonymous',
            intensity = 'Intense!',
            calories = 0,
            length = 0
        } = workoutDatum
        return <div className={styles.card}>
            {/* Could put the image here if there needs to be one */}
            <div className={styles.metaWrapper}>
                <h2 className={styles.name}>
                    <a href={`#TODO-workout-${workoutId}`}>{name}</a>
                </h2>
                <div className={styles.creator}>
                    <a href={`#TODO-user-${creator}`}>{creator}</a>
                </div>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.infoEntry}>
                    <h3 className={styles.infoTitle}>Intensity</h3>
                    <div className={styles.infoValue}>{intensity}</div>
                </div>
                <div className={styles.infoEntry}>
                    <h3 className={styles.infoTitle}>Calories</h3>
                    <div className={styles.infoValue}>{calories}</div>
                </div>
                <div className={styles.infoEntry}>
                    <h3 className={styles.infoTitle}>Time</h3>
                    <div className={styles.infoValue}>{`${length} min.`}</div>
                </div>
                {/* Do by: this is used for schedules */
                this.props.dueBy === null ?
                    <div></div> :
                    <div className={styles.infoEntry}>
                        <h3 className={styles.infoTitle}>Due By</h3>
                        <div className={styles.infoValue}>{`${this.props.dueBy}`}</div>
                    </div>
                }

            </div>
        </div>
    }
}