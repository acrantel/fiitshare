import styles from './create-workout.module.css';
import { MdAdd } from 'react-icons/md';
import Exercise from './exercise.js';
import { exerciseData } from '../../database/database.js';

function newExercise(key) {
    const exerciseIds = Object.keys(exerciseData)
    return {
        key: key,
        exercise: exerciseIds[Math.floor(Math.random() * exerciseIds.length)],
        time: [0, 0]
    };
}

export default class CreateWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.addExercise = this.addExercise.bind(this);
        this.setExercise = this.setExercise.bind(this);
        this.setTime = this.setTime.bind(this);
        this.state = {
            exercises: [newExercise(0)],
            nextKey: 1
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
                }
            })
        })
    }
    
    setTime(exerciseKey, hour, minute) {
        this.setState({
            exercises: this.state.exercises.map(exercise => {
                if (exercise.key !== exerciseKey) return exercise;
                return {
                    ...exercise,
                    time: [hour, minute]
                }
            })
        })
    }
    
    render() {
        const { exercises } = this.state;
        return <div className={styles.wrapper}>
            {exercises.map(({ key, exercise, time: [hour, minute] }) => (
                <Exercise
                    key={key.toString()}
                    exerciseKey={key}
                    exercise={exercise}
                    onSetExercise={this.setExercise}
                    onSetTime={this.setTime}
                    hour={hour}
                    minute={minute}
                />
            ))}
            <div className={styles.buttonWrapper}>
                <button onClick={this.addExercise}><MdAdd /></button>
            </div>
        </div>;
    }
}
