import { useContext } from 'react';

import { BsGearFill } from 'react-icons/bs';
import { ImHome2 } from 'react-icons/im';
import { RiAuctionFill } from 'react-icons/ri';
import { FaPowerOff } from 'react-icons/fa';
import {CgCardSpades} from 'react-icons/cg' 
import {GiScrollQuill, GiBlackBook, GiCherish, GiCharacter, GiChatBubble, GiInfo, GiSwapBag} from 'react-icons/gi' 

import { AppRouteStoreContext } from '../StoreAppRouter'



const SideBar = () => {





  return (
        // <div className="h-screen w-16 flex flex-col justify-center
    //               bg-white dark:bg-gray-900 shadow-lg">
                    
    // + fixed
    <div className=" h-auto min-h-screen  w-16 flex flex-col justify-center 
                  bg-white dark:bg-gray-900 shadow-lg">
                    

        <SideBarIcon icon={<GiScrollQuill size="28" />} text = 'Quests' destination = 'quests'/>
        <SideBarIcon icon={<GiCherish size="22"/>} text = 'Dao' destination = 'quests' />
        {/* <SideBarIcon icon={<GiSwapBag size="20"/>} text = 'Market' destination = 'quests'/>
        <SideBarIcon icon={<GiBlackBook size="20"/>} text = 'Content' destination = 'quests'/> */}

        <SideBarIcon icon={<GiCharacter size="20"/>} text = 'Dashboard' destination = 'dashboard'/>


        <Divider />
        <SideBarIcon icon={<GiInfo size="20"/>} text = 'Infos' destination = 'quests'/>

        <SideBarIcon icon={<GiChatBubble size="20"/>} text = 'Chat' destination = 'quests'/>
        <SideBarIcon icon={<FaPowerOff size="22"/>} text = 'Log Out' destination = 'quests' />
    </div>
  );
};

const SideBarIcon = ({ icon, text, destination }) => {
  const { dispatchAppRoute } = useContext(AppRouteStoreContext);

  const DispatchDashboard = async () => {
    let dDataAppRoute = destination
    await dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute });
  }
  return (  
  <div onClick={() => DispatchDashboard()} className="sidebar-icon group">
  {icon}
  <span className="sidebar-tooltip invisible group-hover:visible">
    {text}
  </span>
</div>)

};


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;