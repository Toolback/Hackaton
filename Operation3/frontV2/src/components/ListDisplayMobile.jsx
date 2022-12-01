const ListDisplayMobile = ({img, title, data, ts}) => {
    return (<>
            <li>
                <a href="#" class="block px-4 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                        <span class="flex-1 flex space-x-2 truncate">

                            <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d={img} clip-rule="evenodd" />
                            </svg>
                            <span class="flex flex-col text-gray-500 text-sm truncate">
                                <span class="truncate">{title}</span>
                                <span><span class="text-gray-900 dark:text-gray-100 font-medium">{data}</span> </span>
                                <time datetime="2020-07-11">{ts}</time>
                            </span>
                        </span>

                        <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </a>
            </li>



        {/* <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200" aria-label="Pagination">
            <div class="flex-1 flex justify-between">
                <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"> Previous </a>
                <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"> Next </a>
            </div>
        </nav> */}
        </>)
}

export default ListDisplayMobile;