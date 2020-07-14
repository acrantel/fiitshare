import styles from './exercise.module.css';
import { exerciseData } from '../../database/database.js';
import { MdDelete } from 'react-icons/md';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.setExercise = this.setExercise.bind(this);
        this.setTime = this.setTime.bind(this);
        this.remove = this.remove.bind(this);
    }
    
    setExercise(e) {
        this.props.onSetExercise(this.props.exerciseKey, e.target.value);
    }
    
    setTime(e) {
        const [hour, minute] = e.target.value.split(':').map(Number);
        this.props.onSetTime(this.props.exerciseKey, hour, minute);
    }
    
    remove() {
        this.props.onRemove(this.props.exerciseKey);
    }
    
    render() {
        const {
            exercise,
            hour,
            minute
        } = this.props;
        return <div className={styles.exercise}>
            <label className={styles.labelled}>
                <span className={styles.label}>Exercise name:</span>
                <select onChange={this.setExercise} value={exercise} className={styles.input}>
                    {Object.entries(exerciseData).map(([id, { name }]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
            </label>
            <label className={styles.labelled}>
                <span className={styles.label}>Time to do this:</span>
                <input
                    type="time"
                    onChange={this.setTime}
                    value={`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
                    className={styles.input}
                />
            </label>
            <button onClick={this.remove} className={`button icon-btn ${styles.remove}`}>
                <MdDelete />
            </button>
        </div>;
    }
}
