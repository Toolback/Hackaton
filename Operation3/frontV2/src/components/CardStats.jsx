const CardStats = ({img, title, data, destination}) => {
    return(
        <div class="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg">
        <div class="p-5">
            <div class="flex items-center">
                <div class="flex-shrink-0">

                    <svg class="h-6 w-6 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d={img} />
                    </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                    <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd>
                            <div class="text-lg font-medium text-gray-900 dark:text-gray-100">{data}</div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        {destination != 0 ? (
                    <div class="bg-gray-50 dark:bg-gray-800 px-5 py-3">
                    <div class="text-sm">
                        <a href="#" class="font-medium text-green-500 hover:text-green-400"> View all </a>
                    </div>
                </div>
        ):(<></>)
        }

    </div>
    )
}

export default CardStats;