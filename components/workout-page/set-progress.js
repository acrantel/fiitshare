import styles from './set-progress.module.css';

export default class SetProgress extends React.Component {
    render() {
        const {
            sets,
            set
        } = this.props;
        const labels = [];
        for (let i = 1; i <= sets; i++) {
            labels.push(<div
                className={`${styles.label} ${i === set ? styles.current : ''}`}
                key={i.toString()}
            >{`Set ${i}`}</div>);
        }
        return <div className={styles.meter}>
            <div className={styles.meterComplete} style={{
                width: set / sets * 100 + '%'
            }} />
            {labels}
        </div>;
    }
}
