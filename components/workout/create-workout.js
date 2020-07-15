import styles from './create-workout.module.css';
import { MdAdd } from 'react-icons/md';
import Exercise from './exercise.js';
import { exerciseData } from '../../database/database.js';

function newExercise(key) {
    const exerciseIds = Object.keys(exerciseData)
    return {
        key: key,
        exercise: exerciseIds[Math.floor(Math.random() * exerciseIds.length)],
        time: 10
    };
}

export default class CreateWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.addExercise = this.addExercise.bind(this);
        this.setExercise = this.setExercise.bind(this);
        this.setTime = this.setTime.bind(this);
        this.removeExercise = this.removeExercise.bind(this);
        this.changeSets = this.changeSets.bind(this);
        this.state = {
            exercises: [newExercise(0)],
            nextKey: 1,
            sets: 1
        };
    }
    
    addExercise() {
        this.setState({
            exercises: [
                ...this.state.exercises,
                // Give each exercise a unique key
                newExercise(this.state.nextKey)
            ],
            nextKey: this.state.nextKey + 1
        });
    }
    
    setExercise(exerciseKey, exerciseId) {
        this.setState({
            exercises: this.state.exercises.map(exercise => {
                if (exercise.key !== exerciseKey) return exercise;
                return {
                    ...exercise,
                    exercise: exerciseId
                };
            })
        });
    }
    
    setTime(exerciseKey, seconds) {
        this.setState({
            exercises: this.state.exercises.map(exercise => {
                if (exercise.key !== exerciseKey) return exercise;
                return {
                    ...exercise,
                    time: seconds
                };
            })
        });
    }
    
    removeExercise(exerciseKey) {
        this.setState({
            exercises: this.state.exercises
                .filter(exercise => exercise.key !== exerciseKey)
        });
    }
    
    changeSets(e) {
        this.setState({
            sets: +e.target.value
        })
    }
    
    render() {
        const { exercises, sets } = this.state;
        return <div className={styles.wrapper}>
            <label className={styles.setWrapper}>
                {'Number of sets: '}
                <input
                    type="number"
                    className={styles.sets}
                    value={sets}
                    onChange={this.changeSets}
                />
            </label>
            {exercises.map(({ key, exercise, time }) => (
                <Exercise
                    key={key.toString()}
                    exerciseKey={key}
                    exercise={exercise}
                    time={time}
                    onSetExercise={this.setExercise}
                    onSetTime={this.setTime}
                    onRemove={this.removeExercise}
                />
            ))}
            <div className={styles.buttonWrapper}>
                <button onClick={this.addExercise} className='button icon-btn'><MdAdd /></button>
            </div>
        </div>;
    }
}
