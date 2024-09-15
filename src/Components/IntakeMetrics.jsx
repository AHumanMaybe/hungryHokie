import StandardButton from "./StandardButton";
import CalorieProgress from "./CalorieProgress";

function IntakeMetrics({metricNext, totals}){
    return(<>
            <div className="flex flex-col h-full w-1/2 justify-around">
                            <div className="flex w-full justify-center items-center">Today's Intake</div>
                            <div className="flex w-full justify-center items-center"><CalorieProgress totals={totals}/></div>
                        </div>
                <div className="flex flex-col h-full w-1/2 justify-around">
                    <div>
                        Protein
                        <div>{Math.round(totals.protein)}g</div>
                    </div>
                    <div>
                        Carbs
                        <div>{Math.round(totals.carbs)}g</div>
                    </div>
                    <div>
                        Fat
                        <div>{Math.round(totals.fat)}g</div>
                    </div>
                    <StandardButton text="Next >" handleClick={metricNext}/>
                </div>
    </>)
}

export default IntakeMetrics;