import { useRouter, withRouter } from 'next/router';
import Header from '../../components/header.js';
import GroupSidebar from '../../components/group/group-sidebar.js';
import GroupMainSection from '../../components/group/group-main-section.js';

function Group({ groupid }) {
    return <div>
        <Header current={'groups'} />
        <div className='group-page'>
            <GroupSidebar groupId={groupid} />
            <GroupMainSection groupId={groupid} />
        </div>
    </div>
}

Group.getInitialProps = async ({ query }) => {
    const { groupid } = query;
    return { groupid };
};
export default Group