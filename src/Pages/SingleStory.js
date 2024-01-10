import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdOutlineRecordVoiceOver, MdOutlineVoiceOverOff } from 'react-icons/md';
import Share from '../Components/Share';
import StarRating from '../Components/StarRating';
import storyPandaLogo from '../images/storypandalogo.jpeg';

const SingleStory = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const { stories, getStories, isSpeaking, setIsSpeaking, isLoaded, setIsLoaded } = context;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [audioElement, setAudioElement] = useState(null);
    let story = Array.isArray(stories) ? stories.filter((item) => item._id === path) : [];

    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoaded === 1) {
            setTimeout(() => {
                // if (story[0].rating !== -1)
                window.location.reload();
                setIsLoaded(true);
            }, 5000); // Set the delay as needed (1 seconds in this case)
        }
    }, [story.length]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, [isLoaded]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getStories();
        } else {
            navigate('/login');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggle = () => {
        if (isSpeaking) {
            if (audioElement) {
                audioElement.pause();
            }
        } else {
            if (audioElement) {
                audioElement.play();
            }
            setIsSpeaking(true);
        }
        setIsSpeaking(false);
    };

    // const handleSpeak = () => {
    //     if (audioElement) {
    //         audioElement.pause();
    //         audioElement.remove();
    //     }

    //     const newAudioElement = story[0].description[currentIndex].voice;
    //     setAudioElement(newAudioElement);
    //     if (isSpeaking) {
    //         if (newAudioElement) {
    //             newAudioElement.play();
    //         }
    //     }
    // };

    const slideVariants = {
        hiddenRight: {
            x: '100%',
            opacity: 0,
        },
        hiddenLeft: {
            x: '-100%',
            opacity: 0,
        },
        visible: {
            x: '0',
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };

    const slidersVariants = {
        hover: {
            scale: 1.2,
            backgroundColor: '#ff00008e',
        },
    };

    const dotsVariants = {
        initial: {
            y: 0,
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    const handleNext = () => {
        setDirection('right');
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === story[0].description.length ? prevIndex : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setDirection('left');
        setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? 0 : prevIndex - 1));
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };


    return (
        <>{loading ? (
            <div className='mx-auto w-[100%] font-4xl font-bold mt-4' style={{ color: "#00b8a9" }}>Loading...</div>
        ) : story.length === 0 ? (
            <div className='mx-auto w-[100%] font-4xl font-bold mt-4' style={{ color: "#00b8a9" }}>Loading... Please Wait!!
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center mt-4 md:flex-row mx-4">
                <div className="w-full md:w-2/3 h-[auto] space-y-4">
                    <div className="overflow-hidden flex flex-col border border-gray-300 rounded-lg ">
                        <div className="w-full md:flex justify-between">
                            <div className="w-full md:w-[50%] z-[1000] flex justify-center items-center" style={{ backgroundColor: "#ff34002b" }}>
                                <motion.img
                                    alt="ai_generated_image"
                                    key={currentIndex}
                                    src={story[0].description[currentIndex].image}
                                    initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
                                    animate="visible"
                                    exit="exit"
                                    variants={slideVariants}
                                    className="w-full md:rounded-l-md shadow-md"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-4 font-xl text-base font-medium bg-white md:mt-5 flex flex-col justify-between">
                                <div>
                                    <h6 className="text-justify mx-4 text-2xl" style={{ fontFamily: "Droid Sans", fontWeight: currentIndex === 0 ? 'bold' : 'normal' }}>
                                        {story[0].description[currentIndex].text}
                                    </h6>
                                </div>
                                {currentIndex === 0 && (
                                    <div className='flex justify-center items-center'>
                                        <img src={storyPandaLogo} alt="storyPandaLogo" className="w-10 h-10" />
                                        <h1 className='font-bold' style={{ color: "#00b8a9" }}>StoryPanda</h1>
                                    </div>
                                )}
                                {currentIndex === story[0].description.length - 1 && (
                                    <div className='flex justify-center items-center'>
                                        <h1 className='font-bold text-[1.5rem]'>THE END</h1>
                                    </div>
                                )}
                            </div>


                        </div>
                    </div>
                    <div className="flex justify-center w-full flex-row md:flex-col">
                        {story[0].description.map((_, index) => (
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

                        <div className="cursor-pointer p-2 rounded-full">
                            {isSpeaking ? (
                                <MdOutlineRecordVoiceOver className="h-6 w-6" onClick={handleToggle} />
                            ) : (
                                <MdOutlineVoiceOverOff className="h-6 w-6" onClick={handleToggle} />
                            )}
                        </div>

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
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex flex-row item-center justify-center">
                            <Share />
                        </div>

                        <div className='mt-4'>
                            <StarRating description={story[0].description}
                                title={story[0].title}
                                id={story[0]._id}
                                rating={story[0].rating}
                                showAlert={props.showAlert} />
                        </div>
                    </div>
                </div>
            </div>

        )
        }

        </>);
};

export default SingleStory;
