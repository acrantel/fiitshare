import Header from '../components/header.js';
import CreateWorkout from '../components/workout/create-workout.js';
import styles from './page.module.css';

export default class CreateWorkoutPage extends React.Component {
    render() {
        return <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.pageContent}>
               <CreateWorkout />
            </div>
        </div>;
    }
}
