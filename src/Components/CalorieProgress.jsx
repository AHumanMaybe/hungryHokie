function CalorieProgress(){
    return(
    <>
        <div class="relative size-60">
            <svg class="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="1" stroke-dasharray="100 100" stroke-linecap="round"></circle>

                <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-prim" stroke-width="2.5" stroke-dasharray="30.3 100" stroke-linecap="round"></circle>
            </svg>

            <div class="absolute top-12 start-1/2 transform -translate-x-1/2 text-center">
                <span class="text-lg font-bold text-text">1000/3000 kcals</span>
            </div>
        </div>
    </>)
}

export default CalorieProgress;