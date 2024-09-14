import StandardButton from "./StandardButton";
import CalorieProgress from "./CalorieProgress";

function IntakeMetrics({metricNext}){
    return(<>
            <div className="flex flex-col h-full w-1/2 justify-around">
                            <div className="flex w-full justify-center items-center">Today's Intake</div>
                            <div className="flex w-full justify-center items-center"><CalorieProgress/></div>
                        </div>
                <div className="flex flex-col h-full w-1/2 justify-around">
                    <div>
                        Protein
                        <div>64g</div>
                    </div>
                    <div>
                        Carbs
                        <div>64g</div>
                    </div>
                    <div>
                        Fat
                        <div>64g</div>
                    </div>
                    <StandardButton text="Next >" handleClick={metricNext}/>
                </div>
    </>)
}

export default IntakeMetrics;