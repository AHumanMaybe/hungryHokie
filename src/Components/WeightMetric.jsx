import StandardButton from "./StandardButton";
import CalorieProgress from "./CalorieProgress";
import WeightTimeGraph from "./WeightTimeGraph";

function WeightMetric({metricNext}){

    return(<>
    
        <div className="flex flex-col h-full w-1/2 justify-around">
                            <div className="flex w-full justify-center items-center">Weight Change</div>
                            <div className="flex w-full justify-center items-center"><WeightTimeGraph/></div>
        </div>
        <div className="flex flex-col h-full w-1/2 justify-around">
            <div>
                Current Weight
                <div>64lbs</div>
            </div>
            <div>
                Current Height
                <div>64ft</div>
            </div>
                <div>
                    Current Age
                    <div>64</div>
                </div>
            <StandardButton text="Next >" handleClick={metricNext}/>
        </div>

    </>)

}

export default WeightMetric;