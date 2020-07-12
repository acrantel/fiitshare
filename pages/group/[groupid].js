import { useRouter } from 'next/router';
import Header from '../../components/header.js';
import GroupSidebar from '../../components/group/group-sidebar.js';
import GroupMainSection from '../../components/group/group-main-section.js';

export default function Group() {
    const router = useRouter()
    let { groupid } = router.query
    console.log(groupid);
    groupid = 'group1'; // TODO FIX THIS (navigation broken?)
    return <div>
        <Header />
        <div className='group-page'>
            <GroupSidebar groupID={groupid}/> 
            <GroupMainSection groupID={groupid}/>
        </div>
    </div>
}