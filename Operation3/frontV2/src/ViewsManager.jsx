// import "../css/community/CommunityPage.css";
import { useContext } from 'react'

import { AppRouteStoreContext } from './StoreAppRouter'

import TopNavigation from "./components/TopNavigation";
import SideBar from "./components/SideBar";

import Quests from "./pages/Quests";
import Dashboard from "./pages/Dashboard";
import Content from "./pages/Content";
import Dao from "./pages/Dao";
import Login from './pages/Login';
import ModalQuestDetails from './components/ModalQuestDetails';
import ModalCreateQuest from './components/ModalCreateQuest';


const ViewsManager = () => {
    const { stateAppRoute } = useContext(AppRouteStoreContext);
    const { destination } = stateAppRoute; // Fetch from store

    const generateAppViews = () => {
        switch (destination) {
            case 'login':
                return <Login />
                
            case 'quests':
                return <div>
                    <TopNavigation destination={destination} />
                    <div className="flex">
                        <SideBar destination={destination} />
                        <Quests destination={destination} />
                    </div>
                </div>
            case 'dashboard':
                return <div>
                    <TopNavigation destination={destination} />
                    <div className="flex">
                        <SideBar destination={destination} />
                        <Dashboard destination={destination} />
                    </div>
                </div>


            case 'content':
                return <div>
                    <TopNavigation destination={destination} />
                    <div className="flex">
                        <SideBar destination={destination} />
                        <Content destination={destination} />
                    </div>
                </div>

            case 'dao':
                return <div>
                    <TopNavigation destination={destination} />
                    <div className="flex">
                        <SideBar destination={destination} />
                        <Dao destination={destination} />
                    </div>
                </div>

            case'twitterQuestDetails': 
                return <div>
                <TopNavigation destination={destination} />
                <div className="flex">
                    <SideBar destination={destination} />
                    <ModalQuestDetails destination={destination} />
                </div>
            </div>

            case'createNewQuest': 
                return <div>
                <TopNavigation destination={destination} />
                <div className="flex">
                    <SideBar destination={destination} />
                    <ModalCreateQuest destination={destination} />
                </div>
            </div>


            default:
                break;
        }
    }

    return (
        <>
            {generateAppViews()}
        </>
    )
}

export default ViewsManager;