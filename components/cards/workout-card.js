import styles from './workout-card.module.css';
import { MdNotificationsNone } from 'react-icons/md';
import { formatDateTime } from '../../utils/datetime.js';
import Link from 'next/link';


import { AiFillFire } from 'react-icons/ai';
import { MdQueryBuilder } from 'react-icons/md';
import {FiCircle} from 'react-icons/fi'; // circle outline
import {FaCircle} from 'react-icons/fa'; // filled in circle

export default class WorkoutCard extends React.Component {
    render() {
        const {
            workoutId,
            displayName,
            workoutDatum = {},
        } = this.props
        const {
            name = 'Unknown Workout',
            creator = 'Anonymous',
            intensity = 3,
            calories = 0,
            length = 0,
            dueBy = [],
        } = workoutDatum

        // add circles accordingly
        let intensityScale = [];
        let count = 0;
        while (count < intensity)
        {
            intensityScale.push(<FaCircle className={styles.icon}/>);
            count++;
        }
        while (count < 5)
        {
            intensityScale.push(<FiCircle className={styles.icon}/>);
            count++;
        }

        return <div className={styles.card}>
            {/* Could put the image here if there needs to be one */}
            <div className={styles.metaWrapper}>
                <h2 className={styles.name}>
                    <Link href='/workout/[workoutid]' as={`/workout/${workoutId}`}>
                        <a>{name}</a>
                    </Link>
                </h2>
                <div className={styles.creator}>
                    <Link href='/user/[userid]' as={`/user/${creator}`}>
                        <a>{displayName}</a>
                    </Link>
                </div>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <MdQueryBuilder className={styles.icon} />
                    <p className={styles.label}>{`${length} min`}</p>
                </div>
                <div className={styles.info}>
                    <AiFillFire className={styles.icon} />
                    <p className={styles.label}>{`${calories} cal`}</p>
                </div>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    
                <p className={styles.label}>{`Intensity`}</p>
                    {intensityScale}
                </div>
            </div>
            <div className={styles.infoWrapper}>
                {/* Do by: this is used for schedules */
                    this.props.dueBy ?
                        (<div className={styles.infoLineEntry}>
                            <h3 className={styles.infoLineTitle}>Due By</h3>
                            <div className={styles.infoValue}>
                                {formatDateTime(new Date(...dueBy))}
                            </div>
                        </div>)
                        : <></>
                }
            </div>
        </div>
    }
}


WorkoutCard.getInitialProps = async () => {
    const { groupid } = query;
    const groupDatum = await fetch(`http://localhost:3000/api/group/${groupid}`, {
        method: 'GET'
    }).then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))

    return { groupid, groupDatum };
};