import Header from '../../components/header.js';
import styles from '../page.module.css';

function Workout({ workoutid }) {
    return <div className={styles.pageWrapper}>
        <Header />
        <div className={styles.pageContent}>
            {`This is the temporary workout page for ${workoutid}. Try it out one day; it's good for you!`}
        </div>
    </div>;
}

Workout.getInitialProps = async ({ query }) => {
    const { workoutid } = query;
    return { workoutid };
};
export default Workout
