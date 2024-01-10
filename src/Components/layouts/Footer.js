import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import storyPandaLogo from '../../images/storypandalogo.jpeg';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className='flex items-center flex-col md:flex-row flex-wrap justify-between mx-[10%] mt-5'>
                <div className="flex justify-between items-center flex-row md:flex-col p-2 pb-0">
                    <ol className="flex items-center flex-row md:flex-col space-x-4 text-sm font-bold text-[#00b8a9] mx-auto md:mb-[15px] md:mt-[5px]">
                        <li><Link to={'/'}><img src={storyPandaLogo} alt="logo" className="h-14 w-14" /></Link></li>
                        <li><Link to={'/'} className="text-gray-800">Home</Link></li>
                        <li><Link to={'/contactus'} className="text-gray-800">FAQ</Link></li>
                        <li><Link to={'/contactus'} className="text-gray-800">Feedback</Link></li>
                    </ol>
                </div>
                <div className="flex justify-between items-center flex-row md:flex-col p-2 pb-0">
                    <ol className="flex items-center flex-row md:flex-col space-x-4 text-sm font-bold text-[#00b8a9] mx-auto md:mb-[15px] md:mt-[5px]">
                        <li className="text-gray-800"><FaFacebook style={{ color: "#7145d9", height: "25px", width: "25px" }} /></li>
                        <li className="text-gray-800"><FaSquareInstagram style={{ color: "#f15f81", height: "25px", width: "25px" }} /></li>
                        <li className="text-gray-800"><FaXTwitter style={{ color: "black", height: "25px", width: "25px" }} /></li>
                    </ol>
                </div>
            </div>
        </>
    );
};

export default Footer;
