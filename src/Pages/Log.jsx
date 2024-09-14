import { useState } from "react";
import CalorieProgress from "../Components/CalorieProgress";
import IntakeMetrics from "../Components/IntakeMetrics";
import LogObject from "../Components/LogObject";
import StandardButton from "../Components/StandardButton";
import WeightMetric from "../Components/WeightMetric";

function Log(){

    const [currentMetric, setCurrentMetric] = useState(0)

    const metricNext = () => {
        setCurrentMetric((prevIndex) => (prevIndex + 1) % metricCards.length)
    }   

    const metricCards = [
        <IntakeMetrics metricNext={metricNext}/>,
        <WeightMetric metricNext={metricNext}/>
    ]

    



    const datePrev = () => {

    }

    const dateNext = () => {

    }

    return(
    <>
        <div className="flex flex-row w-full h-screen bg-bg p-4 space-x-4">
            <div className="flex flex-col h-full w-1/2 space-y-2">
                <div className="flex flex-row w-full h-2/3 border font-bold hover:shadow">
                        
                        {metricCards[currentMetric]}
                        
                </div>
                <div className="flex flex-row w-full h-1/3 bg-sec rounded hover:shadow">
                    <div className="flex w-2/3 items-center justify-center font-bold text-cw text-3xl">September 10, 2024</div>
                    <div className="flex flex-col h-full w-1/3 items-center justify-around">
                        <StandardButton text="< Prev" handleClick={datePrev}/>
                        <StandardButton text="Next >" handleClick={dateNext}/>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-col h-full w-1/2 justify-center items-center border-l hover:shadow">
                <div className="flex w-full justify-center items-center font-semibold text-2xl border-b">Today's Log</div>
                <div className="flex flex-col overflow-y-scroll w-full h-5/6 items-center">
                    <LogObject/>
                    <LogObject/>
                    <LogObject/>
                    <LogObject/>
                    <LogObject/>
                    <LogObject/>
                </div>
                
            </div>
        </div>
    </>)
}

export default Log;