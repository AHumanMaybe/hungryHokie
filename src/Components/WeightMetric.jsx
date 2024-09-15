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
                <div>{localStorage.getItem('currWeight')}lbs</div>
            </div>
            <div>
                Current Height
                <div>{localStorage.getItem('height')}in</div>
            </div>
                <div>
                    Current Age
                    <div>{localStorage.getItem('age')}</div>
                </div>
            <StandardButton text="Next >" handleClick={metricNext}/>
        </div>

    </>)

}

export default WeightMetric;