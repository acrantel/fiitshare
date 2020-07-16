import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import GroupSidebar from '../../components/group/group-sidebar.js';
import GroupMainSection from '../../components/group/group-main-section.js';
import { getGroup } from '../../utils/api.js';

function Group({ groupid, groupDatum }) {
    return <div>
        <Header current={'groups'} />
        <div className='group-page'>
            <GroupSidebar groupId={groupid} groupDatum={groupDatum} />
            <GroupMainSection groupId={groupid} groupDatum={groupDatum} />
        </div>
    </div>
}

Group.getInitialProps = async ({ query }) => {
    const { groupid } = query;
    const groupDatum = await getGroup(groupid);
    return { groupid, groupDatum };
};
export default Group