import {GiTiedScroll} from 'react-icons/gi' 


const DailyActions = () => {
    return(
        <div>
  <div class="flow-root mt-6">
    <ul role="list" class="-my-5 divide-y divide-gray-200">
      <li class="py-4">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <GiTiedScroll class="h-8 w-8 rounded-full dark:text-gray-200"  alt="quest icon" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">Quest 1</p>
            <p class="text-sm text-gray-500 truncate">@Type</p>
          </div>
          <div>
            <a href="#" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"> View </a>
          </div>
        </div>
      </li>

      <li class="py-4">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
          <GiTiedScroll class="h-8 w-8 rounded-full dark:text-gray-200"  alt="quest icon" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">Quest 2</p>
            <p class="text-sm text-gray-500 truncate">@Type</p>
          </div>
          <div>
            <a href="#" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"> View </a>
          </div>
        </div>
      </li>

      <li class="py-4">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
          <GiTiedScroll class="h-8 w-8 rounded-full dark:text-gray-200"  alt="quest icon" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">Quest 3</p>
            <p class="text-sm text-gray-500 truncate">@Type</p>
          </div>
          <div>
            <a href="#" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"> View </a>
          </div>
        </div>
      </li>

      <li class="py-4">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
          <GiTiedScroll class="h-8 w-8 rounded-full dark:text-gray-200"  alt="quest icon" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">Quest 4</p>
            <p class="text-sm text-gray-500 truncate">@Type</p>
          </div>
          <div>
            <a href="#" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"> View </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
  {/* <div class="mt-6">
    <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> View all </a>
  </div> */}
</div>
    )
}

export default DailyActions;