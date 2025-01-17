// MusicPlayer.tsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);


    // Toggle play/pause
    const togglePlay = () => setIsPlaying(!isPlaying);
    
    const nextSong = () => {
        // Logic to go to the next song
    };

    const backSong = () => {
        // Logic to go to the previous song
    };

    return (
        <div style={{ width: "200px", margin: "0 auto", textAlign: "center", height: "200px" }}>
        {/* Player Container */}
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
            backgroundColor: "#434342",
            padding: "20px",
            borderRadius: "15px",
            color: "#fff",
            }}
        >
            {/* Music Visualizer
            <motion.div
            className="visualizer"
            initial={{ opacity: 0. }}
            animate={{
                scale: isPlaying ? [1, 1.2, 1] : 1,
                opacity: isPlaying ? [0.8, 1, 0.8] : 0.8,
            }}
            transition={{
                duration: 1,
                repeat: Infinity,
            }}
            style={{
                width: "50px",
                height: "50px",
                margin: "0 auto 20px",
                backgroundColor: "#ffd700",
                borderRadius: "50%",
            }}
            /> */}
            
            {/* Back Song Button */}
            <motion.button
                whileTap={{ scale: 1 }}
                onClick={backSong}
                whileHover={{ color: "black", backgroundColor: "#e8dfa5"}}
                animate={{ scale: 1.3 }} // Change scale at rest
                style={{
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "100%",
                color: "#fff",
                width: "30px",
                height: "30px",
                fontSize: "16px",
                cursor: "pointer",
                marginRight: "20px",
            }}
            >
                {"\u23EE"}
            </motion.button>


            {/* Play/Pause Button */}
            <motion.button
            whileTap={{ scale: 1 }}
            onClick={togglePlay}
            whileHover={{ color: "black", backgroundColor: "#e8dfa5" }}
            animate={{ scale: 1.3 }} // Change scale at rest
            style={{
                backgroundColor: "transparent",
                border: "20",
                borderRadius: "50%",
                color: "#fff",
                width: "30px",
                height: "30px",
                fontSize: "16px",
                cursor: "pointer",
                marginRight: "10px",
                }}
            >
            {isPlaying ? "\u23F8" : "\u25B6"}
            </motion.button>


            {/* Next Song Button */}
            <motion.button
                whileTap={{ scale: 1.2 }}
                onClick={nextSong}
                whileHover={{ color: "black", backgroundColor: "#e8dfa5"}}
                animate={{ scale: 1.3 }} // Change scale at rest
                style={{
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "50%",
                color: "#fff",
                width: "30px",
                height: "30px",
                fontSize: "16px",
                cursor: "pointer",
                marginLeft: "10px",
                }}
            >
                {"\u23ED"}
                
            </motion.button>
            {/* Progress Bar */}
            <motion.div
            className="progress-bar"
            style={{
                marginTop: "25px",
                marginRight: "20px",
                marginLeft: "20px",
                height: "15px",
                backgroundColor: "#666",
                borderRadius: "3px",
                overflow: "auto",
            }}
            >
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{
                duration: 1, // Song duration (in seconds)
                ease: "linear",
                repeat: isPlaying ?  0 : 0,
                }}
                style={{
                height: "15px",
                backgroundColor: "#fff",
                }}
            />
            </motion.div>
        </motion.div>
        </div>
    );
};

export default MusicPlayer;
