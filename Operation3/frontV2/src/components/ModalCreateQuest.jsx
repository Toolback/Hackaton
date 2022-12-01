const ModalCreateQuest = () => {
  return (
    <main class="flex flex-col w-screen justify-center items-center  p-8 dark:bg-gray-800 ">

      {/* <div className='flex justify-center items-center dark:text-white'> */}
      <div className="bg-white dark:bg-gray-700 max-w-5xl  shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Quest Proposal</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">It's time to detail what you care about! </p>
        </div>
        <form className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <label className="text-sm font-medium text-gray-500">Quest Name</label>
              <input type="input" className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Slogan</dt>
              <input type="input" className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Quest Details</dt>
              <input type="input" className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 sm:row-span-3" />
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Rule</dt>
              <input type="input" className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Duration</dt>
              <input type="input" className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Entry Cost</dt>
              <input type="input" className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">More</dt>
              <input type="input" className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
            </div>

            {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Items Drops</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">

                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                    </svg>
                    <span className="ml-2 flex-1 w-0 truncate"> resume_back_end_developer.pdf </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Download </a>
                  </div>
                </li>
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">

                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                    </svg>
                    <span className="ml-2 flex-1 w-0 truncate"> coverletter_back_end_developer.pdf </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Download </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}



          </div>
        </form>
      </div>
          <div className="flex justify-center mt-2">
            <button type="button" class="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Send Quest</button>
            <button type="button" class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Cancel</button>
          </div>
    </main>
  )
}

export default ModalCreateQuest;