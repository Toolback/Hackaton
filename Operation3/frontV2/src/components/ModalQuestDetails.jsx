import {GiCrossMark} from 'react-icons/gi' 


const ModalQuestDetails = () => {
  return (
    <main class="flex w-screen justify-center items-center  p-8 dark:bg-gray-800 ">

      <div className="bg-white dark:bg-gray-700 max-w-5xl shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Twitter Quest Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Focus on value, not quantity.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Details</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week.</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Rule</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">Tweet less than your 6 month weekly average for 4 consecutive week.</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Started</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">January 7, 2022</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">End at / New Cycle</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">March 7, 2022</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Quest Gain</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">1000 $Usdc</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Less Reward</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">10 $Less</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Total Participants</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">100</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Waiting list Subscribed</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">150</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Items Drops</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">

                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate"> Blue Topping </span>
                      <span className="mr-2 flex-1 w-0 truncate"> Rare </span>

                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> View Details </a>
                    </div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">

                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate"> Blue Bird </span>
                      <span className="mr-2 flex-1 w-0 truncate"> Legendary </span>

                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> View Details </a>
                    </div>
                  </li>
                  
                </ul>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Prerequist</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">To automatically participate in the next quest, you need to</dd>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">- Supply at least the Entry Cost Amount</dd>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">- Subscribe to the quest you want !</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Your Status</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">In Waiting List : <GiCrossMark/></dd>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">In Actual Cycle :<GiCrossMark/></dd>

            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Your Balance</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">0 / 10 Usdc</dd>
            </div>


            <button type="button" class="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Subscribe</button>
            <button type="button" class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">My Stats</button>


          </dl>
        </div>
      </div>
    </main>
  )
}

export default ModalQuestDetails;