import { useContext } from 'react';
import { AppRouteStoreContext } from '../StoreAppRouter'


import heroQuestImg from '../assets/QuestHeroImg.png'
import ColumnsWImg from '../components/ColumnsWImg';
import DailyActions from '../components/DailyActions';

import twitterQuestImg from '../assets/socialMedia/Twitter_Bird.svg'
const Quests = () => {
  const { dispatchAppRoute } = useContext(AppRouteStoreContext);

  const handleCreateNewQuest= async() => {
    let dDataAppRoute = "createNewQuest"
    await dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute });
}
  return (
    // <div className='flex flex-col w-screen justify-center items-center bg-gray-200 dark:bg-gray-800'>
    <main class="flex-1 pb-8 dark:bg-gray-800 ">

      {/* <div className='flex justify-center items-center dark:text-white'> */}
      <div class="mt-8 ">

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 items-center">

            <h5 className='font-spaceMono overflow-hidden dark:text-gray-100'>
              Join quests and complete daily check-ins to earn $Less tokens,<br />proving you have a sustainable daily life.<br />Sometimes a challenge is all we need <br />to pay a little extra attention to our behavior, <br />so that it's aligned with what our planet can provide us with. <br />Let's hold each other accountable.
            </h5>
            <img className=" overflow-hidden" src={heroQuestImg} alt='' />
          </div>

        </div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 items-center">

            <div className="flex flex-col items-center p-2 px-20 overflow-hidden">
              <h2 className="font-grape text-bold text-2xl p-2 dark:text-white" >Special Quest</h2>
              <DailyActions />
            </div>

            <div className="flex flex-col items-center p-2 px-20 overflow-hidden">
              <h2 className="font-grape text-bold text-2xl p-2 dark:text-white" >Bonus Quest</h2>
              <DailyActions />
            </div>

          </div>

        </div>

        <div className="flex justify-center pt-4">


          <div className="flex flex-col">
            <h2 className="font-grape text-bold text-2xl p-2 dark:text-white">Main Quests</h2>

            <div className="bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                <ColumnsWImg
                  img={twitterQuestImg}
                  title="Twitter Quest"
                  description="Focus on value, not quantity"
                  rule="Tweet less than your 6 month weekly average for 4 consecutive week."
                  destination="twitterQuestDetails"
                />


              </ul>
              <div class="mt-6">
                <a href="#" onClick={() => handleCreateNewQuest()} class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50">➕ Create Quest </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};





export default Quests;