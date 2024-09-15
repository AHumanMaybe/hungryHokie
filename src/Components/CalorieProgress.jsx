function CalorieProgress(){
    return(
    <>
        <div className="relative size-60">
            <svg className="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="1" strokeDasharray="100 100" strokeLinecap="round"></circle>

                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-prim" strokeWidth="2.5" strokeDasharray="30.3 100" strokeLinecap="round"></circle>
            </svg>

            <div className="absolute top-12 start-1/2 transform -translate-x-1/2 text-center">
                <span className="text-lg font-bold text-text">1000/3000 kcals</span>
            </div>
        </div>
    </>)
}

export default CalorieProgress;