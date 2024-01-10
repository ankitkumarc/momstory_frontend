import { useState, useContext } from "react";
import { motion } from "framer-motion";
import noteContext from '../context/notes/noteContext';
import storyPandaLogo from '../images/storypandalogo.jpeg';

const Carousel = ({ items, showAlert }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const context = useContext(noteContext);
    const { isComplete } = context;

    const slideVariants = {
        hiddenRight: { x: "100%", opacity: 0 },
        hiddenLeft: { x: "-100%", opacity: 0 },
        visible: { x: "0", opacity: 1, transition: { duration: 1 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
    };

    const slidersVariants = {
        hover: { scale: 1.2, backgroundColor: "#ff00008e" },
    };

    const dotsVariants = {
        initial: { y: 0 },
        hover: { scale: 1.1, transition: { duration: 0.2 } },
    };

    const handleNext = async () => {
        setDirection("right");
        setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 === items.length) {
                if (!isComplete) showAlert("Please wait!!. Generating story next page", "warning");
                return prevIndex;
            }
            return prevIndex + 1;
        });
    };

    const handlePrevious = () => {
        setDirection("left");
        setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? 0 : prevIndex - 1));
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center mt-4 md:flex-row mx-4">
                <div className="w-full md:w-2/3 h-[auto] space-y-4">
                    <div className="overflow-hidden flex flex-col border border-gray-300 rounded-lg ">
                        <div className="w-full md:flex justify-between">
                            <div className="w-full md:w-[50%] z-[1000] flex justify-center items-center" style={{ backgroundColor: "#ff34002b" }}>
                                <motion.img
                                    alt="ai_generated_image"
                                    key={currentIndex}
                                    src={`data:image/jpeg;base64,${items[currentIndex].image}`}
                                    initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
                                    animate="visible"
                                    exit="exit"
                                    variants={slideVariants}
                                    className="w-full md:rounded-l-md shadow-md"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-4 font-xl text-base font-medium bg-white md:mt-5 flex flex-col justify-between">
                                <div>
                                    <h6 className="text-justify mx-4 text-2xl" style={{ fontFamily: "Droid Sans", fontWeight: currentIndex === 0 ? 'bold' : 'normal' }}>{items[currentIndex].text}</h6>
                                </div>
                                {currentIndex === 0 && (
                                    <div className='flex justify-center items-center'>
                                        <img src={storyPandaLogo} alt="storyPandaLogo" className="w-10 h-10" />
                                        <h1 className='font-bold' style={{ color: "#00b8a9" }}>StoryPanda</h1>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full flex-row md:flex-col">
                        {items.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`w-3 h-3 rounded-full mx-2 cursor-pointer ${currentIndex === index ? 'bg-red-500' : 'bg-red-200'
                                    }`}
                                onClick={() => handleDotClick(index)}
                                initial="initial"
                                animate={currentIndex === index ? 'animate' : ''}
                                whileHover="hover"
                                variants={dotsVariants}
                            ></motion.div>
                        ))}
                    </div>
                    <div className="flex justify-center space-x-4 h-20 items-center flex-row">
                        <motion.div
                            variants={slidersVariants}
                            whileHover="hover"
                            className="cursor-pointer p-2 rounded-full"
                            onClick={handlePrevious}
                        >
                            <svg height="20" viewBox="0 96 960 960" width="20">
                                <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                            </svg>
                        </motion.div>


                        <motion.div
                            variants={slidersVariants}
                            whileHover="hover"
                            className="cursor-pointer p-2 rounded-full"
                            onClick={handleNext}
                        >
                            <svg height="20" viewBox="0 96 960 960" width="20">
                                <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                            </svg>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Carousel;
