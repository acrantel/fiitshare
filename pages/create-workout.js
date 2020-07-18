import Header from '../components/header.js';
import CreateWorkout from '../components/workout/create-workout.js';
import styles from './page.module.css';

export default class CreateWorkoutPage extends React.Component {
    render() {
        const { userId, userDatum } = this.props;
        return <div className={styles.pageWrapper}>
            <Header current={'workouts'} userId={userId} userDatum={userDatum} />
            <div className={styles.pageContent}>
               <CreateWorkout userId={this.props.userId} />
            </div>
        </div>;
    }
}
