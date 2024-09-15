import { motion } from "framer-motion";

function CalorieProgress({ totals }) {
    // Calculate the percentage of calories over the goal
    const percentage = Math.round((totals.calories / 3000) * 100);

    return (
        <>
            <div className="relative size-60">
                <svg className="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    {/* Background circle */}
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="1" strokeDasharray="100 100" strokeLinecap="round"></circle>

                    {/* Animated circle */}
                    <motion.circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-current text-prim"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="100 100"
                        initial={{ strokeDasharray: "0 100" }} // Start with 0
                        animate={{ strokeDasharray: `${percentage} 100` }} // Animate to the calculated percentage
                        transition={{ duration: 1.5, ease: "easeInOut" }} // Duration and ease of the animation
                    />
                </svg>

                <div className="absolute top-12 start-1/2 transform -translate-x-1/2 text-center">
                    <span className="text-lg font-bold text-text">{Math.round(totals.calories)}/3000 kcals</span>
                </div>
            </div>
        </>
    );
}

export default CalorieProgress;
