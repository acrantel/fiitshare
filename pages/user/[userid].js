import Header from '../../components/header.js';
import styles from '../page.module.css';

function User({ userid }) {
    return <div className={styles.pageWrapper}>
        <Header />
        <div className={styles.pageContent}>
            {`This is the temporary user page for ${userid}. You should meet them one day; they're really nice!`}
        </div>
    </div>;
}

User.getInitialProps = async ({ query }) => {
    const { userid } = query;
    return { userid };
};
export default User
