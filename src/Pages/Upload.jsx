import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Upload(){

    const navigate = useNavigate()

    const goManual = () => {
        navigate("/manual")
    }

    const [file, setFile] = useState(null)
    const handleFileChange = async (event)=>{
        const selectedFile = event.target.files[0]

        setFile(selectedFile)

        if (selectedFile) {
            try {
                
                console.log('good')
            }catch (err) {
                console.log('Error : ', err)
            }
            
        }
        
    };


    return(
        <>
            <div className="flex flex-col w-full h-screen bg-bg justify-center items-center space-y-6">
                <div className="font-semibold text-6xl">Select an Image to <span className="bg-gradient-to-r from-prim to-sec text-transparent bg-clip-text">Log.</span></div>
                {/* Upload Button */}
                <motion.div
                    className="flex justify-center items-center text-center bg-prim rounded-xl h-8 w-32 font-semibold text-xl text-cw shadow-lg shadow-prim cursor-pointer"
                    initial={{ y: -100, opacity: 0 }}  // Start position (above the screen)
                    animate={{ y: 0, opacity: 1 }}     // Final position (fall into place)
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.0 }}  // Customize the falling effect
                    whileHover={{ y: -10 }}  // Moves the button up on hover
                >
                    upload
                </motion.div>

                {/* Manual Button */}
                <motion.div
                    className="flex justify-center items-center text-center bg-sec rounded-xl h-8 w-32 font-semibold text-xl text-cw shadow-lg shadow-sec cursor-pointer"
                    initial={{ y: -100, opacity: 0 }}  // Start position (above the screen)
                    animate={{ y: 0, opacity: 1 }}     // Final position (fall into place)
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.0 }}  // Customize the falling effect
                    whileHover={{ y: -10 }}  // Moves the button up on hover
                    onClick={goManual}
                >
                    manual
                </motion.div>
            </div>
        </>
    )
}

export default Upload;