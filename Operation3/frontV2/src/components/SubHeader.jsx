import donutProfil from '../assets/donutwhite.png'

const SubHeader = () => {
    return (
        <div class="bg-white  dark:bg-gray-800  shadow">
        <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div class="flex-1 min-w-0">

                    <div class="flex items-center">
                        <img class="hidden h-40 w-auto rounded-full sm:block" src={donutProfil} alt="" />
                        <div>
                            <img class=" rounded-full sm:hidden" src={donutProfil} alt="" />
                            <div class="flex items-center">
                                <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:leading-9 sm:truncate">Good morning, Dev</h1>
                            </div>
                            <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                <dt class="sr-only">Rank</dt>
                                <dd class="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>

                                    Rank 10
                                </dd>
                                <dt class="sr-only">Organisations</dt>
                                <dd class="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">

                                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                                    </svg>
                                    Green Hands, Fresh'air, 3 more ...
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    {/* <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Supply</button> */}
                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Up Rank</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default SubHeader;