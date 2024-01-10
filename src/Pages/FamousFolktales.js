/* eslint-disable no-useless-concat */
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CustomCarousel from './CustomCarousel';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";
import folktale from "../images/65798f831377cea67cb9ea3d_folktales5.png"
import age from "../images/6579557d57853c7313a2eed9_age1.png";
import style from "../images/65794767f62b39715f064c12_style1.png";
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "../Components/layouts/Footer";

const FamousFolktales = (props) => {
    const [field, setField] = useState({ folktale: "panchtantra", age: '3', style: "anime" });
    const [carousalItems, setCarousalItems] = useState([]);
    const [isLoading, setIsLoading] = useState(0);
    const [resultText, setResultText] = useState('');
    const [isLogin, setIsLogin] = useState();
    const resultRef = useRef();
    let array = [];

    const navigate = useNavigate();
    const context = useContext(noteContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
        else {
            setIsLogin(false);
        }
    }, []);

    const { addStory, setIsComplete } = context;

    const API_KEY = process.env.REACT_APP_API_KEY_OPEN_AI;

    useEffect(() => {
        resultRef.current = resultText;
    }, [resultText]);


    const generateImage = async (content, ind, last) => {
        try {
            if (content.length > 3 && !last) {

                const engineId = 'stable-diffusion-v1-6'
                const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
                const apiKey = process.env.REACT_APP_API_KEY_DREAMSTUDIO;

                if (!apiKey) throw new Error('Missing Stability API key.')

                const response = await fetch(
                    `${apiHost}/v1/generation/${engineId}/text-to-image`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Bearer ${apiKey}`,
                        },
                        body: JSON.stringify({
                            text_prompts: [
                                {
                                    text: content,
                                    weight: 1,
                                },
                                {
                                    text: "disfigure, blurry, nude, darkness, fog, bad anatomy, bad proportions, hazy, boring, distorted, poorly drawn, written language, unattractive, watermark, ugly, low contrast, monochrome, solid background, weird colors, multiple angles, bad anatomy, incomplete, grainy, abstract, amputated, pixelated, out of frame, cropped, gloomy, text, comment",
                                    weight: -1,
                                }
                            ],
                            cfg_scale: 7,
                            height: 1024,
                            width: 1024,
                            steps: 30,
                            samples: 1,
                            style: field.style,
                        }),
                    }
                )


                if (!response.ok) {
                    throw new Error(`Non-200 response: ${await response.text()}`)
                }

                const responseData = await response.json();
                const base64ImageData = responseData.artifacts[0].base64;

                if (base64ImageData && base64ImageData.length > 0) {
                    let newItem = { image: base64ImageData, text: content, voice: content };
                    array.push(newItem);
                    setCarousalItems((prev) => [...prev, newItem]);
                    setIsLoading(false);
                }
            } else if (last) {
                let newItem = { image: array[0].image, text: content, voice: content };
                array.push(newItem);
                setCarousalItems((prev) => [...prev, newItem]);
                setIsComplete(true);
                props.showAlert("Congrats Story is Generated", "success")
                await addStory(array[0].text, array, -1);
                setIsLoading(0);
            }
        } catch (error) {
            props.showAlert("Error in generating Story!!", "error")
            setIsLoading(false);
        }
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const generateImagesForParagraphs = async (paragraphs) => {
        try {
            for (let i = 0; i < paragraphs.length; i++) {
                await generateImage(paragraphs[i], i, i === paragraphs.length - 1);
                setIsLoading(2);
            }
            await delay(1000);
        } catch (error) {
            props.showAlert("Error in generating Story!!", "error")
        } finally {
            setIsLoading(0);
        }
    };


    const handleSubmit = async (event) => {
        if (isLoading === 0) {
            if (!isLogin) {
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
                return;
            }

            event.preventDefault();
            const prompt = `Retell a story from the fable ${field.folktale} for ${field.age} years old, maximum size is 500 words long. Story begins with a title and end with a moral message followed by "The End". Divide the story in 5 paragraphs. dont label the paragraphs`;

            try {
                if (prompt !== "") {
                    setIsLoading(1);
                    setResultText("");
                    let paragraphs = [];

                    const systemMessage = {
                        "role": "system", "content": prompt,
                    }
                    const apiRequestBody = {
                        "model": "gpt-3.5-turbo",
                        "messages": [
                            systemMessage,

                        ]
                    }
                    console.log(apiRequestBody)
                    await fetch("https://api.openai.com/v1/chat/completions",
                        {
                            method: "POST",
                            headers: {
                                "Authorization": "Bearer " + API_KEY,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(apiRequestBody)
                        }).then((data) => {
                            return data.json();
                        }).then((data) => {
                            console.log(data.choices[0].message.content);
                            let textVal = data.choices[0].message.content;

                            paragraphs = textVal.split('\n\n');
                            console.log(paragraphs);
                            generateImagesForParagraphs(paragraphs);
                        });
                } else {
                    return;
                }
            } catch (error) {
                return;

            }

        }
        else return;
    };


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setField((field) => ({
            ...field, [name]: value
        }))
    }


    return (

        <div className="flex justify-center items-center flex-col">
            <div className="mx-auto mb-8">
                <div className="md:mt-[4rem] bg-[#fff] flex flex-col justify-center items-center">
                    <div className="flex justify-center text-start items-center w-[100%]">
                        <div className="font-bold text-3xl md:text-[2.375rem] text-[#00b8a9] pt-3">Choose Your Folktale</div>
                    </div>
                    {!isLogin && <div className="flex justify-center mt-[0.125rem] text-start items-center w-[100%]">
                        <div className="font-medium text-[0.9rem] text-[#333] pt-0">Please <Link to={'/signup'}><b>sign up</b> </Link>to Create & Save Stories</div>
                    </div>}
                    <div className="flex justify-center items-center flex-wrap mt-4 mx-[10rem] max-w-[940px]">
                        <div className="w-[220px] h-[270px] text-[16px] transform-style preserve-3d rounded-2xl font-exo text-sm transform translate3d(0, 0, 40px) translate(0) shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#f8f3d4" }}>
                            <img
                                src={folktale}
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center z-50 text-semibold text-[16px] flex items-center justify-center w-[70%] " style={{ backgroundColor: "#f8f3d4" }}>

                                <select
                                    id="folktale"
                                    name="folktale"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full font-bold text-[16px] flex items-center justify-center" style={{ backgroundColor: "#f8f3d4" }}
                                >
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="panchtantra">Folktale</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="Aesop's fables">Aesop's fables</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="Panchtantra">Panchtantra</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="The Jataka Tales">The Jataka Tales</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="La Fontaine's Fables">
                                        La Fontaine's Fables
                                    </option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="Grimm's Fairy Tales">
                                        Grimm's Fairy Tales
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[220px] h-[270px] text-[16px] transform-style preserve-3d rounded-2xl font-exo text-sm transform translate3d(0, 0, 40px) translate(0) shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#f4c4d7" }}>
                            <img
                                src={age}  // Replace with your actual image URL
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center z-50 text-semibold text-[16px] flex items-center justify-center w-[70%] " style={{ backgroundColor: "#f4c4d7" }}>

                                <select
                                    id="age"
                                    name="age"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full font-semibold text-[16px] flex items-center justify-center" style={{ backgroundColor: "#f4c4d7" }}
                                >
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="0-1">Age</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="0-1">0-1 years</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="2">2 years</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="3">3 years</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="4">4 years</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="5">5 years</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="6">6 years</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="7">7 years</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="8-11"> {'>'}7 years</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[220px] h-[270px] text-[16px] transform-style preserve-3d rounded-2xl font-exo text-sm transform translate3d(0, 0, 40px) translate(0) shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#d2dff2" }}>
                            <img
                                src={style}  // Replace with your actual image URL
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center z-50 text-semibold text-[16px] flex items-center justify-center w-[70%] " style={{ backgroundColor: "#d2dff2" }}>

                                <select
                                    id="style"
                                    name="style"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full font-semibold text-[16px] flex items-center justify-center" style={{ backgroundColor: "#d2dff2" }}
                                >
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="cartoon">Style</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="comic-book">Comic book</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="low-poly">Low poly</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="anime">Anime</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="craft-clay">Craft clay</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="neon-punk">Neon punk</option>
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="fantasy-art">Fantasy art</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-row space-x-4'>
                        <button className="min-w-60 w-[12rem] object-contain bg-red rounded-2 self-end items-start mt-3 mb-10 py-[0.55rem] text-16 font-bold" style={{ backgroundColor: "#f6416c", color: "white" }} onClick={handleSubmit}>Create Your Folktale</button></div>
                </div>
                {isLoading === 1 && (
                    <div className="flex justify-center items-center font-bold mx-5 h-[60vh]">
                        <CircularProgress className="mr-4" /> Hang on! Just 20 seconds
                    </div>)}
                {
                    carousalItems.length !== 0 && isLoading === 2 && carousalItems[0]?.image !== undefined ? (
                        <div className="flex flex-col">
                            <CustomCarousel items={carousalItems} showAlert={props.showAlert} />
                        </div>
                    ) : carousalItems[0]?.image === "" ? (
                        props.showAlert("Error in generating Story!!", "error")
                    ) : null
                }
                <Footer />
            </div >

        </div>
    )
}

export default FamousFolktales
