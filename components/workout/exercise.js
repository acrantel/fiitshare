import styles from './exercise.module.css';
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
        this.props.onSetTime(this.props.exerciseKey, +e.target.value);
    }
    
    remove() {
        this.props.onRemove(this.props.exerciseKey);
    }
    
    render() {
        const {
            exerciseData,
            exercise,
            time
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
                    type="number"
                    value={time}
                    onChange={this.setTime}
                    className={styles.input}
                />
                <span className={styles.units}>second(s)</span>
            </label>
            <button onClick={this.remove} className={`button icon-btn ${styles.remove}`}>
                <MdDelete />
            </button>
        </div>;
    }
}
