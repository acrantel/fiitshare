import styles from './create-workout.module.css';
import { MdAdd } from 'react-icons/md';
import Exercise from './exercise.js';
import { exerciseData } from '../../database/database.js';
import { newWorkout } from '../../utils/api.js';
import Router from 'next/router';

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
        this.changeName = this.changeName.bind(this);
        this.changeSets = this.changeSets.bind(this);
        this.changeCalories = this.changeCalories.bind(this);
        this.createWorkout = this.createWorkout.bind(this);
        this.state = {
            exercises: [newExercise(0)],
            nextKey: 1,
            name: '',
            sets: 1,
            calories: 0
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
    
    changeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    
    changeSets(e) {
        this.setState({
            sets: +e.target.value
        })
    }
    
    changeCalories(e) {
        this.setState({
            calories: +e.target.value
        })
    }

    async createWorkout() {
        const { name, sets, calories, exercises } = this.state;
        const exerciseId = [];
        const times = [];
        let totalTime = 0;
        for (const {exercise, time} of exercises) {
            exerciseId.push(exercise);
            times.push(time);
            totalTime += time;
        }
        const workout = {
            calories,
            creator: this.props.userId,
            exercises: { exerciseId, time: times },
            intensity: 1, // TODO
            length: totalTime * sets,
            name,
            sets
        };
        const { workoutId } = await newWorkout(workout);
        Router.push('/workout/[workoutid]', `/workout/${workoutId}`);
    }
    
    render() {
        const { exercises, name, sets, calories } = this.state;
        return <div className={styles.wrapper}>
            <h1 className='section-title'><span>Create a new workout</span></h1>
            <div className={styles.headerWrapper}>
                <div className={styles.leftWrapper}>
                    <label className={styles.inputWrapper}>
                        {'Name: '}
                        <input
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={this.changeName}
                        />
                    </label>
                    <label className={styles.inputWrapper}>
                        {'Number of sets: '}
                        <input
                            type="number"
                            className={styles.input}
                            value={sets}
                            onChange={this.changeSets}
                        />
                    </label>
                    <label className={styles.inputWrapper}>
                        {'Calories: '}
                        <input
                            type="number"
                            className={styles.input}
                            value={calories}
                            onChange={this.changeCalories}
                        />
                    </label>
                </div>
                <div className={styles.rightWrapper}>
                    <button onClick={this.createWorkout} className='button'>Create</button>
                </div>
            </div>
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
