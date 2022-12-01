import { useContext } from 'react';

import {GiConfirmed, GiInvertedDice1} from 'react-icons/gi' 
import { AppRouteStoreContext } from '../StoreAppRouter'


const ColumnsWImg = ({img, title, description, rule, destination}) => {
    const { dispatchAppRoute } = useContext(AppRouteStoreContext);


    const handleSeeMore= async() => {
        let dDataAppRoute = destination
        await dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute });
    }
    return (
        <li>
        <a href="#" onClick={() => handleSeeMore()}className="block hover:bg-gray-50">
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={img} alt="" />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-4 md:gap-4">
                        <div>
                            <p className="text-sm font-medium text-indigo-600  dark:text-blue-400 truncate">{title}</p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">

                                {/* <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg> */}
                                <span className="truncate">{description}</span>
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div>
                                <p className="text-sm text-gray-900 dark:text-gray-400">
                                    Rule
                                </p>
                                <p className="mt-2 max-w-xs flex items-center text-sm text-gray-500">
                                    {rule}
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div>
                                <p className="text-sm text-gray-900 dark:text-gray-500">
                                    Started :
                                    <time className="dark:text-gray-400" datetime="2020-01-07"> January 7, 2020</time>
                                </p>
                                <p className="text-sm text-gray-900 dark:text-gray-500">
                                    End at :
                                    <time className="dark:text-gray-400" datetime="2020-01-07"> January 7, 2020</time>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">

                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        {/* <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /> */}
                                    <GiConfirmed/>
                                    </svg>
                                    In current cycle
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        {/* <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /> */}
                                    <GiConfirmed/>
                                    </svg>
                                    Subscribed for next cycle
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div>
                                <p className="text-sm text-gray-900 dark:text-gray-400">
                                    Details
                                </p>

                                <p className="mt-2 flex items-center text-sm text-gray-500">

                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        {/* <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /> */}
                                        <GiInvertedDice1/>
                                    </svg>
                                    Entry Cost
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">

                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        {/* <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /> */}
                                        <GiInvertedDice1/>
                                    </svg>
                                    Total Gain
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">

                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        {/* <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /> */}
                                        <GiInvertedDice1/>
                                    </svg>
                                    Total Participants
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div >

                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </a>
    </li>


    )
}

export default ColumnsWImg;