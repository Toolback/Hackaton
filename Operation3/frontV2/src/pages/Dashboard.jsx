// import { useState } from 'react';

import CardStats from "../components/CardStats";
import ListDisplayDesktop from "../components/ListDisplayDesktop";
import ListDisplayMobile from "../components/ListDisplayMobile";
import SubHeader from "../components/SubHeader";

// TODO : Add Inventory Container under Overview - Caroussel of user's items to equip his nft 
const Dashboard = () => {
    return (
        <main class="flex-1 pb-8 dark:bg-gray-800 ">

            <SubHeader />



            <div class="mt-8 ">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-lg leading-6 font-medium text-gray-900 dark:text-white ">Overview</h2>
                    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        <CardStats
                            img="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            title="Usdc balance"
                            data="110"
                            destination={0}
                        />

                        <CardStats
                            img="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            title="Less balance"
                            data="30"
                            destination={0}
                        />

                        <CardStats
                            img="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            title="Less to Up Rank"
                            data="80"
                            destination={0}
                        />

                        <CardStats
                            img="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            title="Monthly Expense"
                            data="10 Usdc"
                            destination={0}
                        />
                    </div>
                    
                </div>

                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-lg leading-6 font-medium text-gray-900 dark:text-white ">Quests Joined</h2>
                    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">


                        <CardStats
                            img="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            title="TwitterQuest Cost :"
                            data="10 Usdc"
                            destination={0}
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-2">
            <button type="button" class="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Supply</button>
            <button type="button" class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Withdraw</button>
          </div>

                <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 dark:text-white sm:px-6 lg:px-8">Recent activity</h2>


                <div class="shadow sm:hidden dark:bg-gray-700">
                    <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">

                        <ListDisplayMobile
                            img="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            title="Twitter Quest Succeed"
                            data="20,000 USDC"
                            status={true}
                            ts="July 11, 2020"
                        />

                        <ListDisplayMobile
                            img="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            title="Twitter Quest Succeed"
                            data="20,000 USDC"
                            status={true}
                            ts="July 11, 2020"
                        />

                        <ListDisplayMobile
                            img="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            title="Twitter Quest Succeed"
                            data="20,000 USDC"
                            status={true}
                            ts="July 11, 2020"
                        />
                    </ul>

                    <nav class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200" aria-label="Pagination">
                        <div class="flex-1 flex justify-between">
                            <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:text-gray-500"> Previous </a>
                            <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 hover:text-gray-500"> Next </a>
                        </div>
                    </nav>
                </div>


                <div class="hidden sm:block">
                    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col mt-2">
                            <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Transaction</th>
                                            <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Amount</th>
                                            <th class="hidden px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block" scope="col">Status</th>
                                            <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <ListDisplayDesktop />

                                    </tbody>
                                </table>

                                <nav class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                                    <div class="hidden sm:block">
                                        <p class="text-sm text-gray-700 dark:text-gray-200">
                                            Showing
                                            <span class="font-medium"> 1 </span>
                                            to
                                            <span class="font-medium"> 10 </span>
                                            of
                                            <span class="font-medium"> 20 </span>
                                            results
                                        </p>
                                    </div>
                                    <div class="flex-1 flex justify-between sm:justify-end">
                                        <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                                        <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};





export default Dashboard;