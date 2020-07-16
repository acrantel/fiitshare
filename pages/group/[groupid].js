import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import GroupSidebar from '../../components/group/group-sidebar.js';
import GroupMainSection from '../../components/group/group-main-section.js';

function Group({ groupid, groupDatum }) {
    return <div>
        <Header />
        <div className='group-page'>
            <GroupSidebar groupId={groupid} groupDatum={groupDatum} />
            <GroupMainSection groupId={groupid} groupDatum={groupDatum} />
        </div>
    </div>
}

Group.getInitialProps = async ({ query }) => {
    const { groupid } = query;
    const groupDatum = await fetch(`http://localhost:3000/api/group/${groupid}`, {
        method: 'GET'
    }).then(res => res.ok ? res.json() : Promise.reject(new Error(res.status)))

    const groupSchedule = groupDatum['schedule']

    return { groupid, groupDatum };
};
export default Group