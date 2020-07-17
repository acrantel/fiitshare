import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import GroupSidebar from '../../components/group/group-sidebar.js';
import GroupMainSection from '../../components/group/group-main-section.js';
import ErrorPage from '../../components/error.js';
import { getGroup } from '../../utils/api.js';
import styles from '../page.module.css';

function Group({ error, groupid, groupDatum }) {
    return <div className={styles.pageWrapper}>
        <Header current={'groups'} />
        <div className={`${styles.pageContent} group-page`}>
            {error ? <ErrorPage error={error} /> : <>
                <GroupSidebar groupId={groupid} groupDatum={groupDatum} />
                <GroupMainSection groupId={groupid} groupDatum={groupDatum} />
            </>}
        </div>
    </div>
}

Group.getInitialProps = async ({ query }) => {
    const { groupid } = query;
    try {
        const groupDatum = await getGroup(groupid);
        return { groupid, groupDatum };
    } catch ({ message: error }) {
        return { error };
    }
};
export default Group