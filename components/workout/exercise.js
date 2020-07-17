import styles from './exercise.module.css';
import { exerciseData } from '../../database/database.js';
import { MdDelete } from 'react-icons/md';
import { getExerciseList } from '../../utils/api.js';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.setExercise = this.setExercise.bind(this);
        this.setTime = this.setTime.bind(this);
        this.remove = this.remove.bind(this);

        this.state = { exerciseList: [] };

    }

    componentDidMount() {

        getExerciseList().then(data => {

            this.setState({ exerciseList: data });
            console.log(this.state.exerciseList);

        });
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
            exercise,
            time
        } = this.props;

        console.log("state", this.state);
        const { exerciseList } = this.state;
        console.log('exerlsitl', exerciseList);

        return <div className={styles.exercise}>
            <label className={styles.labelled}>
                <span className={styles.label}>Exercise name:</span>
                <select onChange={this.setExercise} value={exercise} className={styles.input}>
                    {exerciseList.map((exerciseThing) => {
                        return <option key={exerciseThing.id} value={exerciseThing.id}>{exerciseThing.exerciseDatum.name}</option>
                    })}
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
