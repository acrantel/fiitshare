import styles from './create-workout.module.css';
import { MdAdd } from 'react-icons/md';
import Exercise from './exercise.js';
import { newWorkout, getExerciseData } from '../../utils/api.js';
import Router from 'next/router';

function newExercise(key, exerciseData) {
    const exerciseIds = Object.keys(exerciseData);
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
        this.changeIntensity = this.changeIntensity.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeSets = this.changeSets.bind(this);
        this.changeCalories = this.changeCalories.bind(this);
        this.createWorkout = this.createWorkout.bind(this);
        this.state = {
            exerciseData: {},
            exercises: [],
            nextKey: 0,
            intensity: 1,
            name: '',
            sets: 1,
            calories: 0
        };
    }
    
    async componentDidMount() {
        const exerciseData = await getExerciseData();
        this.setState({
            exerciseData,
            exercises: this.state.exercises.length === 0
                ? [newExercise(this.state.nextKey, exerciseData)]
                : this.state.exercises,
            nextKey: this.state.nextKey + 1
        });
    }
    
    addExercise() {
        this.setState({
            exercises: [
                ...this.state.exercises,
                // Give each exercise a unique key
                newExercise(this.state.nextKey, this.state.exerciseData)
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
    
    changeIntensity(e) {
        this.setState({
            intensity: +e.target.value
        });
    }
    
    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    
    changeSets(e) {
        this.setState({
            sets: +e.target.value
        });
    }
    
    changeCalories(e) {
        this.setState({
            calories: +e.target.value
        });
    }

    async createWorkout() {
        const { intensity, name, sets, calories, exercises } = this.state;
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
            intensity,
            length: totalTime * sets,
            name,
            sets
        };
        const { workoutId } = await newWorkout(workout);
        Router.push('/workout/[workoutid]', `/workout/${workoutId}`);
    }
    
    render() {
        const {
            exerciseData,
            exercises,
            intensity,
            name,
            sets,
            calories
        } = this.state;
        return <div className={styles.wrapper}>
            <h1 className='section-title'><span>Create a new workout</span></h1>
            <div className={styles.headerWrapper}>
                <div className={styles.leftWrapper}>
                    <label className={styles.inputWrapper}>
                        Name:
                        <input
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={this.changeName}
                        />
                    </label>
                    <label className={styles.inputWrapper}>
                        Number of sets:
                        <input
                            type="number"
                            className={styles.input}
                            value={sets}
                            onChange={this.changeSets}
                        />
                    </label>
                    <label className={styles.inputWrapper}>
                        Calories:
                        <input
                            type="number"
                            className={styles.input}
                            value={calories}
                            onChange={this.changeCalories}
                        />
                    </label>
                    <label className={styles.inputWrapper}>
                        Intensity:
                        <input
                            type="range"
                            min="1"
                            max="5"
                            className={styles.input}
                            value={intensity}
                            onChange={this.changeIntensity}
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
                    exerciseData={exerciseData}
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
