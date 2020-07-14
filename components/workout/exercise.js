import styles from './exercise.module.css';
import { exerciseData } from '../../database/database.js';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.setExercise = this.setExercise.bind(this);
        this.setTime = this.setTime.bind(this);
    }
    
    setExercise(e) {
        this.props.onSetExercise(this.props.exerciseKey, e.target.value);
    }
    
    setTime(e) {
        const [hour, minute] = e.target.value.split(':').map(Number);
        this.props.onSetTime(this.props.exerciseKey, hour, minute);
    }
    
    render() {
        const {
            exercise,
            hour,
            minute
        } = this.props;
        return <div className={styles.exercise}>
            <label className={styles.labelled}>
                <span className={styles.label}>Exercise name</span>
                <select onChange={this.setExercise} value={exercise} className={styles.input}>
                    {Object.entries(exerciseData).map(([id, { name }]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
            </label>
            <label className={styles.labelled}>
                <span className={styles.label}>Time to do this</span>
                <input
                    type="time"
                    onChange={this.setTime}
                    value={`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
                    className={styles.input}
                />
            </label>
        </div>;
    }
}
