import { useState, useEffect } from "react";
import CalorieProgress from "../Components/CalorieProgress";
import IntakeMetrics from "../Components/IntakeMetrics";
import LogObject from "../Components/LogObject";
import StandardButton from "../Components/StandardButton";
import WeightMetric from "../Components/WeightMetric";

function Log() {
    const [logData, setLogData] = useState([]);
    
    // State for tracking total intake values
    const [totals, setTotals] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    });

    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    const getLog = (timestamp) => {
        
        fetch(`http://18.189.31.236:8000/get_log?username=${localStorage.getItem("username")}&secret_token=${localStorage.getItem("secret_token")}&timestamp=${timestamp}`)
            .then(response => response.json())
            .then(data => {
                setLogData(data);
                calculateTotals(data); // Calculate totals after setting logData
                console.log(data);
            });
    };

    useEffect(() => {
        getLog(currentTimestamp);
    }, [currentTimestamp]);  // Fetch log data on component mount

    // Function to calculate totals for calories, protein, carbs, and fat
    const calculateTotals = (data) => {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;

        data.forEach(entry => {
            if (entry.data) {
                entry.data.forEach(item => {
                    totalCalories += parseFloat(item.kcal) || 0;   // Convert to number
                    totalProtein += parseFloat(item.prot) || 0;    // Convert to number
                    totalCarbs += parseFloat(item.carbs) || 0;     // Convert to number
                    totalFat += parseFloat(item.fat) || 0;         // Convert to number
                });
            }
        });

        setTotals({
            calories: totalCalories,
            protein: totalProtein,
            carbs: totalCarbs,
            fat: totalFat
        });
    };

    const [currentMetric, setCurrentMetric] = useState(0);

    const metricNext = () => {
        setCurrentMetric((prevIndex) => (prevIndex + 1) % metricCards.length);
    };

    const metricCards = [
        <IntakeMetrics metricNext={metricNext} totals={totals} />,
        <WeightMetric metricNext={metricNext} />
    ];

    const handleDatePrev = () => {
        const newTimestamp = currentTimestamp - 86400;  // Adjust the decrement value to match your needs
        setCurrentTimestamp(newTimestamp);
        setIsNextButtonDisabled(false);  // Ensure the "Next" button is enabled when going back
    };

    const handleDateNext = () => {
        const newTimestamp = currentTimestamp + 86400;  // Adjust the increment value to match your needs
        const now = Math.floor(Date.now() / 1000);

        if (newTimestamp > now) {
            setIsNextButtonDisabled(true);
        } else {
            setCurrentTimestamp(newTimestamp);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        return date.toLocaleDateString('en-US', options); // Customize locale if needed
    };

    return (
        <>
            <div className="flex flex-row w-full h-screen bg-bg p-4 space-x-4 text-txt">
                <div className="flex flex-col h-full w-1/2 space-y-2 cursor-default">
                    <div className="flex flex-row w-full h-2/3 border border-bg2 font-bold hover:shadow">
                        {metricCards[currentMetric]}
                    </div>
                    <div className="flex flex-row w-full h-1/3 bg-sec rounded hover:shadow cursor-default">
                        <div className="flex w-2/3 items-center justify-center font-bold text-cw text-3xl">{formatDate(currentTimestamp)}</div>
                        <div className="flex flex-col h-full w-1/3 items-center justify-around">
                            <StandardButton text="< Prev" handleClick={handleDatePrev} />
                            <StandardButton text="Next >" handleClick={handleDateNext} disabled={isNextButtonDisabled} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full w-1/2 justify-center items-center border border-bg2 hover:shadow cursor-default">
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
