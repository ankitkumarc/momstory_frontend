import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/layouts/Footer';
import pandareading from "../images/panda-reading-book-p-1080.png"
import panda2 from "../images/panda-background2-p-500.png"
import panda3 from "../images/65767518c741f24f5833de39_panda1-p-800.jpeg"
import icon from "../images/624380709031626fc14aee84_icon.svg"
import img1 from "../images/img1.png"
import img2 from "../images/img2.png"
import img3 from "../images/img3.jpg"
import img4 from "../images/img4.png"
import img5 from "../images/img5.jpg"
import img6 from "../images/img6.jpeg"
import img7 from "../images/img7.png";
import {
    Carousel,
    initTE,
} from "tw-elements";

const Home = () => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
        else {
            setIsLogin(false);
        }
    }, []);

    useEffect(() => {

        initTE({ Carousel });
    }, [])

    return (
        <div className=''>
            <div className='mx-[1rem] md:mx-[2rem] xl:mx-[10rem] md:mt-[80px]'>
                <div className="block-1 mt-0 px-2 md:mt-[8rem] md:px-[3rem] w-[100%]">
                    <div className="mt-0 bg-[#fff]  md:max-w-[80rem] md:mt-[4rem]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 bg-opacity-0 grid-auto-flow-column items-start justify-items-center mt-0 mb-14 md:mb-38 pb-14 w-[100%] md:mt-15">
                            <div className="mx-auto text-center mt-4 md:text-start items-center w-[70%] md:mt-5">
                                <div className="font-bold text-3xl md:text-4xl text-[#00b8a9] pt-3">Unleash Intelligent Storytelling</div>
                            </div>
                            <div className="block2 bg-inherit md:mt-8">
                                <label className="text-large md:text-md w-auto md:font-medium mt-0 md:mt-4">Using AI-power, we craft personalized and unique stories that pack a punch of fun and adventure while teaching priceless life lessons.</label>
                                <label className="text-large md:text-md font-medium mb-6 md:mb-8">Create your own unique story or choose a folktale which imparts timeless wisdom</label>
                                <div className='flex flex-col  items-center md:flex-row space-y-3 md:space-y-0 md:space-x-4'>
                                    <button className="min-w-32 md:min-w-40 w-[50%]  md:w-[10rem] object-contain bg-red rounded-2 md:self-end items-start mt-2 md:mt-3 mb-0 md:mb-0 py-[0.5rem] md:py-[0.55rem] text-14 md:text-16 font-semibold" style={{ backgroundColor: "#f6416c", color: "white" }}> <Link to={'/createyourstory'}>Create Your Story</Link></button>
                                    <button className="min-w-32 md:min-w-40 w-[50%]  md:w-[10rem] object-contain bg-red rounded-2 md:self-end items-start mt-2 md:mt-3 mb-0 md:mb-0 py-[0.5rem] md:py-[0.55rem] text-14 md:text-16 font-semibold" style={{ backgroundColor: "#f6416c", color: "white" }}><Link to={'/famousfolktales'}>Choose a Folktale</Link></button>
                                </div>
                                {!isLogin && <label className="pt-[.5rem] w-[100%] mx-auto mt-2 md:w-[250px] md:pt-1 font-semibold font-xl text-center md:text-left">Sign Up to Create & Save Stories</label>}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex items-center justify-center ' style={{ backgroundColor: '#f5f5f5' }}>
                        <img src={pandareading} alt="panda reading" className='w-full h-[100%] md:h-[70%] md:w-[80%] rounded-xl' />
                    </div>
                </div>


                <div className="block-2 mt-[2rem]  lg:px-[3rem]">
                    <div className="mt-[4rem] mx-auto bg-[#fff] max-w-[100%]">
                        <div className="d-flex flex-col">
                            <div className="mx-auto mt-5 w-[100%]">
                                <div className='item-center text-center text-[#00b8a9] font-bold m-[6px] text-3xl md:text-4xl'>Unlock the Magic</div>
                                <div className='item-center text-center text-[#08100f] font-bold text-2xl md:text-3xl mt-2 mb-4'>Create Your Story</div>
                            </div>
                            <div className="block2 bg-inherit d-flex flex-col item-center">

                                <label className="text-large md:text-md md:font-medium mt-0 mx-2 md:mt-8">Discover a world of customized stories for kids that are both entertaining and educational. Choose your favorite characters, select the life lessons you want to teach, select themes and specify the age of your child. Our AI-powered platform will generate new and unique stories tailored to your preferences. Sign up now and start creating magical moments with your child.</label>
                                <div className="d-flex md:flex-row mt-[5%] items-center flex-col justify-center" >
                                    <div className='d-flex flex-col items-center justify-center mr-[15px]'>
                                        <div className='w-[200px] h-[200px] text-center rounded-3  m-[5%] mt-[10%] mb-[10%]' style={{ backgroundColor: "#fae3d9" }}>
                                            <label className='mt-9 text-md font-bold d-flex justify-center'>Specify Characters</label>
                                            <p className='mb-[5rem] mt-2 item-center'>Specify your favourite characters</p>
                                        </div>
                                        <div className='w-[200px] h-[200px] text-center rounded-3 m-[5%] ml-0 mt-[10%] mb-[10%]' style={{ backgroundColor: "#bbded6" }}>
                                            <label className='mt-9 text-md font-bold d-flex items-center justify-center'>Pick Life Lessons</label>
                                            <p className='mb-[5rem] mt-2 item-center px-3'>Select from a list of varied life lessons you want to teach and build your child's character</p>
                                        </div>
                                    </div>
                                    <div className='d-flex items-center justify-center mx-[5%]'>
                                        <img src={panda2} alt="panda group" className='w-[100%] h-[100%] rounded-xl' />
                                    </div>
                                    <div className='d-flex flex-col items-center justify-center '>
                                        <div className='w-[200px] h-[200px] text-center rounded-3 m-[5%] ml-0 mt-[10%] mb-[10%]' style={{ backgroundColor: "#f8f3d4" }}>
                                            <label className='mt-9 text-md font-bold d-flex items-center justify-center'>Choose Themes</label>
                                            <p className='mb-[5rem] mt-2 item-center'>Decide if you want a general, adventure, fantasy, or mystery themed story</p>
                                        </div>
                                        <div className='w-[200px] h-[200px] text-center rounded-3 m-[5%] ml-0 mt-[10%] mb-[10%]' style={{ backgroundColor: "#e0e2e5" }}>
                                            <label className='mt-9 text-md font-bold d-flex items-center justify-center'>Select Age</label>
                                            <p className='mb-[5rem] mt-2 item-center'>Customize the stories based on the age of your child for an optimal learning experience.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[100%] d-flex flex-col items-center'>
                                    <button className=" min-w-40 w-[10rem] object-contain bg-red rounded-2 items-start mt-3 mb-0 mr-0 py-[0.55rem] text-16 font-semibold" style={{ backgroundColor: "#f6416c", color: "white" }}> <Link to={'/createyourstory'}>Create Your Story</Link></button>
                                    {!isLogin && <div className="pt-[.5rem] font-semibold font-xl text-md md:text-lg">Sign Up to Create & Save Stories</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="block-2 mt-[6rem] px-1 md:px-[3rem] d-flex flex-row items-center justify-center">
                    <div className="mt-[2rem] bg-[#f8f3d4] max-w-[80rem] md:w-full rounded-2">
                        <div className="d-flex flex-col md:flex-row items-center justify-center">
                            <div className="d-flex mx-auto w-full md:w-[50%] items-center">
                                <img src={panda3} alt='panda3' className='w-[100%] h-[100%] rounded-2' />
                            </div>
                            <div className="block2 bg-inherit d-flex flex-col item-center mx-[5%] md:mx-2 max-w-[100%] md:max-w-[45%]  mt-[3%]">
                                <label className='text-sm font-bold text-[#00b8a9] mx-auto mb-[5%] mt-[5px]'>Discover</label>
                                <label className='text-xl md:text-3xl font-bold text'>Explore Age-old Tales with Valuable Life Lessons</label>
                                <label className='text-md font-md text mt-[5%] mb-[10%] d-flex items-center '>Discover the ancient wisdom and timeless lessons found in folktales, nurturing your child's character through the magic of storytelling. Choose the folktale series and age of your child and enjoy!</label>
                                <div className='d-flex flex-row w-[100%] items-start mt-[2%]'>
                                    <div className='d-flex items-start flex-col max-w-[50%] mx-[5px]'>
                                        <img src={icon} alt='icon' className='h-[2rem] w-[2rem]'></img>
                                        <label className='font-bold mt-[1rem] mb-[4px] text-sm md:text-md'>Choose Folktales</label>
                                        <label className='font-md text-sm md:text-md'>Choose folktales, and your child's age</label>
                                    </div>
                                    <div className='d-flex items-start flex-col max-w-[50%] mx-[5px]'>
                                        <img src={icon} alt='icon' className='h-[2rem] w-[2rem] '></img>
                                        <label className='font-bold mt-[1rem] mb-[4px] text-sm md:text-md'>Select Age</label>
                                        <label className='text-sm md:text-md'>Customize the stories based on the age of your child for an optimal learning experience.</label>
                                    </div>
                                </div>
                                <div className='w-[100%] mb-[4px] d-flex flex-col items-center'>
                                    <button className="min-w-40 w-[10rem] object-contain bg-red rounded-2 items-start mt-6 mb-0 mr-0 py-[0.55rem] text-16 font-semibold" style={{ backgroundColor: "#f6416c", color: "white" }}> <Link to={'/famousfolktales'}>Choose Folktales</Link></button>
                                    {!isLogin && <div className="pt-[.5rem] font-semibold font-xl text-md md:text-lg">Sign Up to Create & Save Stories</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="block-2 mt-[6rem] px-[3rem] d-flex flex-row items-center justify-center">
                    <div className="block2 bg-inherit d-flex flex-col item-center mx-[5%] mt-[3%]">
                        <label className='text-sm font-bold text-[#00b8a9] mx-auto mb-[15px] mt-[5px]'>Browse</label>
                        <label className='text-xl md:text-3xl font-bold text mx-auto'>Our AI-curated Top Stories</label>
                        <label className='text-sm md:text-md font-md text mt-[15px] mb-[15px] mx-auto '>Discover a World of Fun and Learning from our Carefully Curated Library with Stories Crafted by Kids & Caregivers</label>
                        <div className='d-flex flex-col md:flex-row space-x-4 md:h-[80%]'>
                            <div className=''>
                                <img src={img1} alt='img1' className='h-[40%] w-[90%] m-[10%]' />
                                <img src={img2} alt='img2' className='h-[40%] w-[90%] m-[10%]' />
                            </div>
                            <div>
                                <img src={img3} alt='img3' className='h-[30%] w-[90%] mx-[10%]' />
                                <img src={img4} alt='img4' className='h-[40%] w-[90%] mx-[10%]' />
                                <img src={img5} alt='img5' className='h-[30%] w-[90%] mx-[10%]' />
                            </div>
                            <div>
                                <img src={img6} alt='img6' className='h-[40%] w-[90%] m-[10%]' />
                                <Link to={'/famousfolktales'}> <img src={img7} alt='img7' className='h-[40%] w-[90%] m-[10%]' /></Link>
                            </div>
                        </div>
                    </div>
                </div >

                <div className="block-2 mt-[6rem] px-[3rem] d-flex flex-row items-center justify-center">
                    <div className="block2 bg-inherit d-flex flex-col items-center justify-center mt-[5%]">
                        <label className='text-sm md:text-md font-bold text-[#00b8a9] mx-auto mb-[15px] mt-[5px]'>Enable</label>
                        <label className='text-xl md:text-3xl font-bold text mx-auto'>Empower Young Minds</label>

                        <div className='d-flex flex-col xl:flex-row items-center justify-center space-x-2 h-auto md:h-[100%] mt-10 mb-10'>
                            <div className="d-flex flex-col items-center justify-center rounded-4 mx-5 my-2 xl:w-[30%] w-full" style={{ backgroundColor: "#a2c8c0" }}>
                                <img src={icon} alt='icon' className='mx-auto h-[3rem] w-[3rem] p-2' />
                                <label className='text-md md:text-lg font-bold px-[1rem] mx-auto'>Make Learning Fun with Engaging Characters</label>
                                <label className='text-sm md:text-md px-[1rem] pb-2 pt-1 mx-auto'>Our AI-generated stories feature fun and engaging characters that make learning enjoyable for kids.</label>
                            </div>
                            <div className="d-flex flex-col items-center justify-center rounded-4 mx-5 my-2 xl:w-[30%] w-full" style={{ backgroundColor: "#fae3d9" }}>
                                <img src={icon} alt='icon' className='mx-auto h-[3rem] w-[3rem] p-2' />
                                <label className='text-md md:text-lg font-bold px-[1rem] mx-auto'>Make Learning Fun with Engaging Characters</label>
                                <label className='text-sm md:text-md px-[1rem] pb-2 pt-1 mx-auto'>Our AI-generated stories feature fun and engaging characters that make learning enjoyable for kids.</label>
                            </div>
                            <div className="d-flex flex-col items-center justify-center rounded-4 mx-5 my-2 xl:w-[30%] w-full" style={{ backgroundColor: "#bbded6" }}>
                                <img src={icon} alt='icon' className='mx-auto h-[3rem] w-[3rem] p-2' />
                                <label className='text-md md:text-lg font-bold px-[1rem] mx-auto'>Make Learning Fun with Engaging Characters</label>
                                <label className='text-sm md:text-md px-[1rem] pb-2 pt-1 mx-auto'>Our AI-generated stories feature fun and engaging characters that make learning enjoyable for kids.</label>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="block-2 mt-[6rem] px-[3rem] d-flex flex-row items-center justify-center">
                    <div className=" block2 d-flex flex-col items-center justify-center mx-2 md:mx-[10%] mt-[3%] mb-[5%]">
                        <label className='font-semibold text-xl mb-4 mt-0'>Our Users Love StoryPanda💕</label>
                        <div
                            id="carouselExampleCaptions"
                            className="relative mt-[2rem] w-full"
                            data-te-carousel-init
                            data-te-carousel-slide>
                            <div
                                className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                                <div
                                    className="relative float-left -mr-[100%] hidden w-full text-center transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-te-carousel-active
                                    data-te-carousel-item
                                    style={{ backfaceVisibility: "hidden" }}>
                                    <p
                                        className="mx-auto max-w-4xl text-xl  text-neutral-700 dark:text-neutral-300">
                                        “Sometimes it’s hard to make a simple yet imp thing/lesson attractive enough such that it imprints onto the young minds. This is more like a vast pool of idea generator which helped me achieve just that for my kids.”
                                    </p>
                                    <div className="mb-6 mt-12 flex justify-center items-center">
                                        <img
                                            src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                                            className="h-24 w-24 rounded-full shadow-lg dark:shadow-black/30"
                                            alt="smapleimage" />
                                    </div>
                                    <p className="text-neutral-500 dark:text-neutral-300">- Anna Morian</p>
                                </div>

                                <div
                                    className="relative float-left -mr-[100%] hidden w-full text-center transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-te-carousel-item
                                    style={{ backfaceVisibility: "hidden" }}>
                                    <p
                                        className="mx-auto max-w-4xl text-xl text-neutral-700 dark:text-neutral-300">
                                        “This is a really amazing and unique way to tell stories.”
                                    </p>
                                    <div className="mb-6 mt-12 flex justify-center items-center">
                                        <img
                                            src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                                            className="h-24 w-24 rounded-full shadow-lg dark:shadow-black/30"
                                            alt="smapleimage" />
                                    </div>
                                    <p className="text-neutral-500 dark:text-neutral-300">- Teresa May</p>
                                </div>

                                <div
                                    className="relative float-left -mr-[100%] hidden w-full text-center transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-te-carousel-item
                                    style={{ backfaceVisibility: "hidden" }}>
                                    <p
                                        className="mx-auto max-w-4xl text-xl text-neutral-700 dark:text-neutral-300">
                                        “I just tried one.. wowwww🔥🔥it’s such a nice way to tell the story!! Kudos to your efforts and idea.”
                                    </p>
                                    <div className="mb-6 mt-12 flex justify-center items-center">
                                        <img
                                            src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                                            className="h-24 w-24 rounded-full shadow-lg dark:shadow-black/30"
                                            alt="smapleimage" />
                                    </div>
                                    <p className="text-neutral-500 dark:text-neutral-300">- Kate Allise</p>
                                </div>
                            </div>

                            <button
                                className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none dark:text-white dark:opacity-50 dark:hover:text-white dark:focus:text-white"
                                type="button"
                                data-te-target="#carouselExampleCaptions"
                                data-te-slide="prev">
                                <span className="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </span>
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Previous</span
                                >
                            </button>
                            <button
                                className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none dark:text-white dark:opacity-50 dark:hover:text-white dark:focus:text-white"
                                type="button"
                                data-te-target="#carouselExampleCaptions"
                                data-te-slide="next">
                                <span className="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </span>
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Next</span
                                >
                            </button>
                        </div>

                    </div>
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default Home;
