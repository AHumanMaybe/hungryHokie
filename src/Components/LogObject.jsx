function LogObject({ data }){

    const food = data.food
    const calories = data.kcal
    const protein= data.prot
    const carb = data.carbs
    const fat = data.fat

    let servings = 1

    const increment = () => {
        servings += 1
    }

    return(
    <div className="flex flex-row w-full min-h-28 border-b border-bg2 justify-center items-center hover:bg-dc">
        <div className="flex flex-col w-5/6 max-w-5/6 overflow-x-auto justify-center items-start font-semibold text-text text-lg">{food}: {calories}kcal, {protein}g, {carb}g, {fat}g</div>
    </div>)
}

export default LogObject;