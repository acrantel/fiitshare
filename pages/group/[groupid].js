import { useRouter, withRouter } from 'next/router';
import GroupSidebar from '../../components/group/group-sidebar.js';
import GroupMainSection from '../../components/group/group-main-section.js';
import ErrorPage from '../../components/error.js';
import { getGroupData } from '../../utils/api.js';
import styles from '../page.module.css';
import { AuthHeader } from '../../helpers/withAuth.js';

function Group({ error, groupid, groupDatum, scheduledWorkouts, users }) {
    return <div className={styles.pageWrapper}>
        <AuthHeader current={'groups'} />
        <div className={`${styles.pageContent} group-page`}>
            {error ? <ErrorPage error={error} /> : <>
                <GroupSidebar groupDatum={groupDatum} />
                <GroupMainSection groupId={groupid} scheduledWorkouts={scheduledWorkouts} groupDatum={groupDatum} users={users}/>
            </>}
        </div>
    </div>
}

Group.getInitialProps = async ({ query }) => {
    const { groupid } = query;
    try {
        const { groupDatum, scheduledWorkouts, users } = await getGroupData(groupid);
        return { groupid, groupDatum, scheduledWorkouts, users };
    } catch ({ message: error }) {
        return { error };
    }
};
export default Group;
