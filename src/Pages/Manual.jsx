function Manual(){

    return(
        <>

            <div className="flex flex-row w-full h-screen bg-bg p-4 space-x-4">

                <div className="flex flex-col h-full w-1/2 justify-center items-center border hover:shadow">

                    <div className="flex w-full justify-center items-center font-semibold text-2xl border-b">Manual Log Input</div>
                    <div className="flex flex-col overflow-y-scroll w-full h-5/6 items-center">
                        <form>
                            
                        </form>
                    </div>

                </div>

            </div>
        
        </>
    )
    
}

export default Manual;