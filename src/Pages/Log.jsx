import { useState, useEffect } from "react";
import CalorieProgress from "../Components/CalorieProgress";
import IntakeMetrics from "../Components/IntakeMetrics";
import LogObject from "../Components/LogObject";
import StandardButton from "../Components/StandardButton";
import WeightMetric from "../Components/WeightMetric";

function Log(){

    const [logData, setLogData] = useState([])

    const getLog = () => {

        const timestamp = Math.floor(Date.now() / 1000)

        fetch(`http://18.189.31.236:8000/get_log?username=${localStorage.getItem("username")}&secret_token=${localStorage.getItem("secret_token")}&timestamp=${timestamp}`)
        .then(response => response.json())
        .then(data => {setLogData(data)
            console.log(data)
        })
    }

    useEffect(() => {
        getLog()
    }, [])

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

    return (
        <>
            <div className="flex flex-row w-full h-screen bg-bg p-4 space-x-4 text-txt">
                <div className="flex flex-col h-full w-1/2 space-y-2">
                    <div className="flex flex-row w-full h-2/3 border border-bg2 font-bold hover:shadow">
                        {metricCards[currentMetric]}
                    </div>
                    <div className="flex flex-row w-full h-1/3 bg-sec rounded hover:shadow">
                        <div className="flex w-2/3 items-center justify-center font-bold text-cw text-3xl">September 10, 2024</div>
                        <div className="flex flex-col h-full w-1/3 items-center justify-around">
                            <StandardButton text="< Prev" handleClick={datePrev} />
                            <StandardButton text="Next >" handleClick={dateNext} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full w-1/2 justify-center items-center border-l border-bg2 hover:shadow">
                    <div className="flex w-full justify-center items-center font-semibold text-2xl border-b border-bg2">Today's Log</div>
                    <div className="flex flex-col overflow-y-scroll w-full h-5/6 items-center">
                        {/* Map over logData and access the nested 'data' array for each item */}
                        {logData.length > 0 ? (
                            logData.map((entry, entryIndex) => (
                                entry.data && entry.data.length > 0 ? (
                                    entry.data.map((item, itemIndex) => (
                                        <LogObject key={`${entryIndex}-${itemIndex}`} data={item} />
                                    ))
                                ) : (
                                    <div key={entryIndex}>No log data available for this entry.</div>
                                )
                            ))
                        ) : (
                            <div>No log data available</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Log;