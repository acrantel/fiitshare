import Header from '../../components/header.js';
import styles from '../page.module.css';

function User({ userid }) {
    fetch(`http://localhost:3000/api/user/${userid}`,{
        method: 'POST',
        body: {
            test: 'adsdf'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log('asdf');
            console.log(res.status);
        }
    })
    .then((data) => {
        console.log('received data back: ', data);
    })
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
