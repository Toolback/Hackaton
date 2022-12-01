const ListDisplayDesktop = () => {
    return (
        <tr class="bg-white dark:bg-gray-700">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex">
                    <a href="#" class="group inline-flex space-x-2 truncate text-sm">

                        <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        <p class="text-gray-500 truncate group-hover:text-gray-900">Twitter Quest Succeed</p>
                    </a>
                </div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                <span class="text-gray-900 dark:text-gray-100 font-medium">20,000 </span>
                USDC
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"> success </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                <time datetime="2020-07-11">July 11, 2020</time>
            </td>
        </tr>
    )
}

export default ListDisplayDesktop;