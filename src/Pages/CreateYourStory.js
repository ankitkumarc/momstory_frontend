/* eslint-disable no-useless-concat */
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CustomCarousel from './CustomCarousel';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";
import life_lesson from "../images/657937766134bbcf78e36c38_lifelesson3.png";
import character from "../images/character.png";
import theme from "../images/65794b51ff176efeace26482_themes1.png";
import style from "../images/65794767f62b39715f064c12_style1.png";
import age from "../images/6579557d57853c7313a2eed9_age1.png";
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "../Components/layouts/Footer";
import Dropdown from 'react-multilevel-dropdown';
import { LuCheckCheck } from "react-icons/lu";
import "../Styles/dropdown.css";

const FamousFolktales = (props) => {
    const [field, setField] = useState({ life_lesson: "kindness", theme: 'adventure', age: '0-8 years', style: 'cartoon' });
    const [carousalItems, setCarousalItems] = useState([]);
    const [isLoading, setIsLoading] = useState(0);
    const [resultText, setResultText] = useState('');
    const [isLogin, setIsLogin] = useState();
    const [char, setChar] = useState("");
    const [customChar, setCustomChar] = useState("");
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
    // console.log(API_KEY);

    useEffect(() => {
        resultRef.current = resultText;
    }, [resultText]);



    const generateImage = async (content, ind, last) => {
        // console.log(content);
        try {
            if (content.length > 3 && !last) {

                const engineId = 'stable-diffusion-v1-6'
                const apiHost = 'https://api.stability.ai'
                // const apiKey = ""
                const apiKey = process.env.REACT_APP_API_KEY_DREAMSTUDIO;
                // console.log(apiKey)

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
                                    text: "disfigure, blurry, nude, darkness, fog, bad anatomy, bad proportions, hazy, boring, distorted, poorly drawn, written language, unattractive, watermark, ugly, low contrast, monochrome, solid background, weird colors, multiple angles, bad anatomy, incomplete, grainy, abstract, amputated, pixelated, out of frame, cropped, gloomy",
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
        for (let i = 0; i < paragraphs.length; i++) {
            await generateImage(paragraphs[i], i, i === paragraphs.length - 1);
            setIsLoading(2);
        }
        await delay(1000);
    };


    const handleSubmit = async (event) => {
        if (isLoading === 0) {
            if (!isLogin) {
                navigate('/login');
                return;
            }

            if (char.length === 0) {
                props.showAlert("Please Select Character", 'warning');
                return;
            }

            event.preventDefault();
            const prompt = `generate a fun and entertaining story with ${field.theme} theme with ${char.join(', ')} which teaches ${field.life_lesson} to a ${field.age} year old. It should be maximum 250 words long. Story should start with a title, end with a moral message with "The End". Divide it into paragraphs with approximately 100 words each without label. No profanity`;
            // console.log(prompt);
            try {
                if (prompt !== "") {
                    setIsLoading(1);
                    setResultText("");
                    let paragraphs = [];

                    const systemMessage = {
                        "role": "system", "content": prompt,
                    }
                    const apiRequestBody = {
                        "model": "gpt-3.5-turbo-16k-0613",
                        "messages": [
                            systemMessage,

                        ]
                    }
                    // console.log(apiRequestBody)
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
                            // console.log(data.choices[0].message.content);
                            let textVal = data.choices[0].message.content;

                            paragraphs = textVal.split('\n\n');
                            // console.log(paragraphs);
                            generateImagesForParagraphs(paragraphs);
                        });
                } else {
                }
            } catch (error) {
                props.showAlert("Error in generating Story!!", "error")
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

    const handleChangeChar = (e) => {
        const selectedValue = e.target.getAttribute('value');
        if (e.target.name === 'customChar') {
            if (customChar === "") {
                props.showAlert("Please write your custom Character", 'warning');
            }
            else {
                setChar(customChar);
            }
        }
        else {
            setChar(prevChar => {
                if (prevChar.includes(selectedValue)) {
                    return prevChar.filter(value => value !== selectedValue);
                } else {
                    // If the value is not present, add it
                    if (char.length === 3) {
                        props.showAlert("You Can Select max 3 options from Character", 'warning');
                        return prevChar;
                    }
                    return [...prevChar, selectedValue];
                }
            });
        }
    };

    const handleCustomChar = (e) => {
        setCustomChar(e.target.value);
    }


    return (
        <div className="flex justify-center items-center flex-col">
            <div className=" mb-8 mx-auto">
                <div className="md:mt-[4rem] bg-[#fff] flex flex-col justify-center items-center">
                    <div className="flex justify-center text-start items-center w-[100%]">
                        <div className="font-bold text-3xl md:text-[2.375rem] text-[#00b8a9] pt-3">Create Your Story</div>
                    </div>
                    <div className="flex justify-center mt-[0.625rem] text-start items-center w-[100%]">
                        <div className="font-bold text-2xl md:text-[1.75rem] text-[#333] pt-3">Personalize Your Story</div>
                    </div>
                    {!isLogin && <div className="flex justify-center mt-[0.125rem] text-start items-center w-[100%]">
                        <div className="font-medium text-[0.9rem] text-[#333] pt-0">Please <Link to={'/signup'}><b>sign up</b> </Link>to Create & Save Stories</div>
                    </div>}
                    <div className="flex justify-center items-center flex-wrap mt-4 mx-[10rem] max-w-[940px]">
                        <div className="w-[220px] h-[270px] transform-style  rounded-2xl font-exo text-sm   shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#f8f3d4" }}>
                            <img
                                src={life_lesson}  // Replace with your actual image URL
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center  text-[16px] text-semibold flex items-center justify-center w-[70%] " style={{ backgroundColor: "#f8f3d4" }}>

                                <select
                                    id="life_lesson"
                                    name="life_lesson"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full font-semibold flex items-center justify-center" style={{ backgroundColor: "#f8f3d4" }}
                                >
                                    <option className="font-semibold mb-2" style={{ backgroundColor: "white" }} value="Kindness">Life Lesson</option>
                                    <option className="font-semibold" style={{ backgroundColor: "white" }} value="kindness">Kindness</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="patience">Patience</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="happiness">Happiness</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="gratitude">Gratitute</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="honesty">Honesty</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="respect">Respect</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="responsibility">Responsibility</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="problem-solving">Problem Solving</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="perseverence">Perseverence</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="respect-for-diversity">Respect for diversity</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="resilience">Resilience</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="sharing-is-caring">Sharing is Caring</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[220px] h-[270px] text-[16px] transform-style  rounded-2xl font-exo text-sm   shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#bbded6" }}>
                            <img
                                src={character}  // Replace with your actual image URL
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center  text-semibold  flex items-center justify-center w-[70%]" style={{ backgroundColor: "#bbded6" }}>
                                <Dropdown className="mt-1 z-1000 p-2 w-full text-[16px] font-bold flex items-center justify-start" style={{ backgroundColor: "#bbded6" }} title="Character">
                                    <Dropdown.Item className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2 px-4 w-full text-[16px] font-bold flex items-center justify- center">
                                        Automobile
                                        <Dropdown.Submenu position="right" className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2  w-auto text-[16px] font-bold flex items-center justify- center">
                                            <Dropdown.Item value="car" onClick={handleChangeChar}> {char.includes('car') && <LuCheckCheck className="mr-2" />}Car</Dropdown.Item>
                                            <Dropdown.Item value="aeroplane" onClick={handleChangeChar}> {char.includes('aeroplane') && <LuCheckCheck className="mr-2" />}Aerolpane</Dropdown.Item>
                                            <Dropdown.Item value="train" onClick={handleChangeChar}> {char.includes('train') && <LuCheckCheck className="mr-2" />}Train</Dropdown.Item>
                                            <Dropdown.Item value="excavator" onClick={handleChangeChar}> {char.includes('excavator') && <LuCheckCheck className="mr-2" />}Excavator</Dropdown.Item>
                                            <Dropdown.Item value="dumptruck" onClick={handleChangeChar}> {char.includes('dumptruck') && <LuCheckCheck className="mr-2" />}Dumptruck</Dropdown.Item>
                                            <Dropdown.Item value="helicopter" onClick={handleChangeChar}> {char.includes('helicopter') && <LuCheckCheck className="mr-2" />}Helicopter</Dropdown.Item>
                                            <Dropdown.Item value="jet-plane" onClick={handleChangeChar}> {char.includes('jet-plane') && <LuCheckCheck className="mr-2" />}Jet Plane</Dropdown.Item>
                                        </Dropdown.Submenu>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2 px-4 w-full text-[16px] font-bold flex items-center justify- center">
                                        Animals
                                        <Dropdown.Submenu position="right" className="transform-style rounded-2xl font-exo text-sm mt-1 p-2 w-auto text-[16px] font-bold flex items-center justify- center">
                                            <Dropdown.Item value="panda" onClick={handleChangeChar}> {char.includes('panda') && <LuCheckCheck className="mr-2" />}Panda</Dropdown.Item>
                                            <Dropdown.Item value="tiger" onClick={handleChangeChar}> {char.includes('tiger') && <LuCheckCheck className="mr-2" />}Tiger</Dropdown.Item>
                                            <Dropdown.Item value="elephant" onClick={handleChangeChar}> {char.includes('elephant') && <LuCheckCheck className="mr-2" />}Elephant</Dropdown.Item>
                                            <Dropdown.Item value="bunny" onClick={handleChangeChar}> {char.includes('bunny') && <LuCheckCheck className="mr-2" />}Bunny</Dropdown.Item>
                                            <Dropdown.Item value="mouse" onClick={handleChangeChar}> {char.includes('mouse') && <LuCheckCheck className="mr-2" />}Mouse</Dropdown.Item>
                                            <Dropdown.Item value="butterfly" onClick={handleChangeChar}> {char.includes('butterfly') && <LuCheckCheck className="mr-2" />}Butterfly</Dropdown.Item>
                                            <Dropdown.Item value="giraffe" onClick={handleChangeChar}> {char.includes('giraffe') && <LuCheckCheck className="mr-2" />}Giraffe</Dropdown.Item>
                                            <Dropdown.Item value="caterpiller" onClick={handleChangeChar}> {char.includes('caterpiller') && <LuCheckCheck className="mr-2" />}Caterpiller</Dropdown.Item>
                                        </Dropdown.Submenu>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="transform-style flex-wrap rounded-2xl font-exo text-sm mt-1 p-2 px-4 w-full text-[16px] font-bold flex items-center justify- center">
                                        Family
                                        <Dropdown.Submenu position="right" className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2 w-auto text-[16px] font-bold flex items-center justify- center">
                                            <Dropdown.Item value="mummy" onClick={handleChangeChar}> {char.includes('mummy') && <LuCheckCheck className="mr-2" />}Mummy</Dropdown.Item>
                                            <Dropdown.Item value="dad/papa" onClick={handleChangeChar}> {char.includes('dad/papa') && <LuCheckCheck className="mr-2" />}Dad/Papa</Dropdown.Item>
                                            <Dropdown.Item value="sister" onClick={handleChangeChar}> {char.includes('sister') && <LuCheckCheck className="mr-2" />}Sister</Dropdown.Item>
                                            <Dropdown.Item value="brother" onClick={handleChangeChar}> {char.includes('brother') && <LuCheckCheck className="mr-2" />}Brother</Dropdown.Item>
                                        </Dropdown.Submenu>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2 px-4 w-full text-[16px] font-bold flex items-center justify- center">
                                        Superheroes
                                        <Dropdown.Submenu position="right" className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2 px-4 w-auto text-[16px] font-bold flex items-center justify- center">
                                            <Dropdown.Item value="superman" onClick={handleChangeChar}> {char.includes('superman') && <LuCheckCheck className="mr-2" />}Superman</Dropdown.Item>
                                            <Dropdown.Item value="spiderman" onClick={handleChangeChar}> {char.includes('spiderman') && <LuCheckCheck className="mr-2" />}Spiderman</Dropdown.Item>
                                            <Dropdown.Item value="hulk" onClick={handleChangeChar}> {char.includes('hulk') && <LuCheckCheck className="mr-2" />}Hulk</Dropdown.Item>
                                            <Dropdown.Item value="wonder-women" onClick={handleChangeChar}> {char.includes('wonder-women') && <LuCheckCheck className="mr-2" />}Wonder Women</Dropdown.Item>
                                            <Dropdown.Item value="ironmen" onClick={handleChangeChar}> {char.includes('ironmen') && <LuCheckCheck className="mr-2" />}Ironmen</Dropdown.Item>
                                            <Dropdown.Item value="batman" onClick={handleChangeChar}> {char.includes('batman') && <LuCheckCheck className="mr-2" />}Batman</Dropdown.Item>
                                            <Dropdown.Item value="captain-america" onClick={handleChangeChar}> {char.includes('captain-america') && <LuCheckCheck className="mr-2" />}Captain America</Dropdown.Item>
                                            <Dropdown.Item value="black-panther" onClick={handleChangeChar}> {char.includes('black-panther') && <LuCheckCheck className="mr-2" />}Black Panther</Dropdown.Item>
                                        </Dropdown.Submenu>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2 px-4 w-full text-[16px] font-bold flex items-center justify- center">
                                        Mystical Characters
                                        <Dropdown.Submenu position="right" className="transform-style rounded-2xl font-exo text-sm mt-1 w-auto text-[16px] font-bold flex items-center justify- center">
                                            <Dropdown.Item value="unicorn" onClick={handleChangeChar}> {char.includes('unicorn') && <LuCheckCheck className="mr-2" />} Unicorn</Dropdown.Item>
                                            <Dropdown.Item value="elf" onClick={handleChangeChar}> {char.includes('elf') && <LuCheckCheck className="mr-2" />}Elf</Dropdown.Item>
                                            <Dropdown.Item value="fairy" onClick={handleChangeChar}> {char.includes('fairy') && <LuCheckCheck className="mr-2" />}Fairy</Dropdown.Item>
                                            <Dropdown.Item value="mermaid" onClick={handleChangeChar}> {char.includes('mermaid') && <LuCheckCheck className="mr-2" />}Mermaid</Dropdown.Item>
                                            <Dropdown.Item value="dragon" onClick={handleChangeChar}> {char.includes('dragon') && <LuCheckCheck className="mr-2" />}Dragon</Dropdown.Item>
                                        </Dropdown.Submenu>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="transform-style  rounded-2xl font-exo text-sm mt-1 p-2 w-full text-[16px] font-bold flex items-center justify- center">
                                        <input
                                            type="text"
                                            id="customCharacter"
                                            value={customChar}
                                            placeholder="Enter custom character"
                                            className="ml-2 p-2 border border-gray-300 rounded"
                                            onChange={handleCustomChar}
                                        />
                                        <button onClick={handleChangeChar} name="customChar"
                                            className="ml-2 p-2 bg-blue-500 text-white rounded"
                                        >
                                            OK
                                        </button>
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="w-[220px] h-[270px] text-[16px] transform-style  rounded-2xl font-exo text-sm   shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#fae3d9" }}>
                            <img
                                src={theme}  // Replace with your actual image URL
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center  text-semibold  flex items-center justify-center w-[70%] " style={{ backgroundColor: "#fae3d9" }}>

                                <select
                                    id="theme"
                                    name="theme"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full font-bold flex items-center justify-center" style={{ backgroundColor: "#fae3d9" }}
                                >
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="Mountain">Theme</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="Mountain">Mountain</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="general">General</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="adventure">Adventure</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="fantasy">Fantasy</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="mystery">Mystery</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[220px] h-[270px] text-[16px] transform-style  rounded-2xl font-exo text-sm   shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#d2dff2" }}>
                            <img
                                src={style}  // Replace with your actual image URL
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center  text-semibold  flex items-center justify-center w-[70%] " style={{ backgroundColor: "#d2dff2" }}>

                                <select
                                    id="style"
                                    name="style"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full font-bold flex items-center justify-center" style={{ backgroundColor: "#d2dff2" }}
                                >
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="cartoon">Style</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="comic-book">Comic book</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="low-poly">Low poly</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="anime">Anime</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="craft-clay">Craft clay</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="neon-punk">Neon punk</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="fantasy-art">Fantasy art</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[220px] h-[270px] text-[16px] transform-style  rounded-2xl font-exo text-sm   shadow-md flex flex-col justify-center items-center m-4" style={{ backgroundColor: "#f4c4d7" }}>
                            <img
                                src={age}  // Replace with your actual image URL
                                alt="Your_Image"
                                className="mx-auto mt-[0.70rem] rounded-lg"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div className="text-center   text-semibold  flex items-center justify-center w-[70%] " style={{ backgroundColor: "#f4c4d7" }}>

                                <select
                                    id="age"
                                    name="age"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full font-bold flex items-center justify-center" style={{ backgroundColor: "#f4c4d7" }}
                                >
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="0-1">Age</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="0-1">0-1 years</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="2">2 years</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="3">3 years</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="4">4 years</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="5">5 years</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="6">6 years</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="7">7 years</option>
                                    <option className="font-semibold p-2" style={{ backgroundColor: "white" }} value="8-11"> {'>'}7 years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-row space-x-4'>
                        <button className="min-w-60 w-[12rem] object-contain bg-red rounded-2 self-end items-start mt-3 mb-10 py-[0.55rem] text-16 font-bold" style={{ backgroundColor: "#f6416c", color: "white" }} onClick={handleSubmit}>Create Your Story</button>
                    </div>
                </div>
                <div>
                    {/* <CustomCarousel items={carousalItems} showAlert={props.showAlert} /> */}
                    {isLoading === 1 && (
                        <div className="flex justify-center items-center font-bold mx-5 h-[60vh]">
                            <CircularProgress className="mr-4" /> Hang on! Just 20 seconds
                        </div>)}
                    {
                        carousalItems.length !== 0 && isLoading === 2 && carousalItems[0]?.image !== undefined ? (
                            <div className="flex flex-col">
                                <CustomCarousel items={carousalItems} showAlert={props.showAlert} />
                            </div>
                        ) : carousalItems[0]?.image === "" ?
                            (
                                props.showAlert("Error in generating Story!!", "error")
                            ) : null
                    }
                </div>
                <Footer />
            </div >
        </div >
    )
}

export default FamousFolktales
