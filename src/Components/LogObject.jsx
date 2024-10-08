function LogObject(){

    const food = 'banana'
    const calories = '100'
    const protein= '20'
    const carb = '20'
    const fat = '20'

    let servings = 1

    const increment = () => {
        servings += 1
    }

    return(
    <div className="flex flex-row w-full min-h-28 border-b border-dc justify-center items-center hover:bg-dc">
        <div className="flex flex-col w-5/6 max-w-5/6 overflow-x-auto justify-center items-start font-semibold text-text text-lg">{food}: {calories}kcal, {protein}g, {carb}g, {fat}g</div>
        <div className="flex flex-col space-y-2">
            <div className="flex w-8 h-8 font-bold rounded-full bg-prim text-cw cursor-pointer text-center text-xl items-center justify-center hover:opacity-80" onClick={increment}>+</div>
            <div className="flex justify-center">{servings}</div>
            <div className="flex w-8 h-8 font-bold rounded-full bg-prim text-cw cursor-pointer text-center text-xl items-center justify-center hover:opacity-80" onClick={increment}>-</div>
        </div>
    </div>)
}

export default LogObject;