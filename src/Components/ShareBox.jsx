import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaDiscord } from 'react-icons/fa';
import { BsLink45Deg, BsX } from "react-icons/bs";

function ShareBox({ link, showShareBox }) {
    const [copy, setCopy] = useState("Copy");

    const copyLink = () => {
        // Implement logic to copy link to clipboard
        navigator.clipboard.writeText(link)
            .then(() => setCopy("Copied"))
            .catch((error) => setCopy('Failed to copy'));

        setTimeout(() => {
            setCopy('Copy'); // Clear the message after 3 seconds
        }, 3000);
    };

    const hideShareBox = () => {
        showShareBox(false);
    };

    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center bg-[#80808099]'>
                <div className={` rounded-lg p-8 w-96 bg-white`}>
                    <div className='flex justify-between items-center mb-5'>
                        <p className='text-2xl font-bold'>Share via Link</p>
                        <BsX size={30} onClick={hideShareBox} />
                    </div>
                    <div className='flex justify-between mb-4'>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}&title=react-chat`} target='_blank' rel='noopener noreferrer'>
                            <FaFacebook className='text-blue-600 hover:text-[#3b5998] cursor-pointer' size={30} />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${link}&text=react-chat`} target='_blank' rel='noopener noreferrer'>
                            <FaTwitter className='text-blue-400 hover:text-[#1da1f2] cursor-pointer' size={30} />
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?url=${link}&title=react-chat&summary=Join-room`} target='_blank' rel='noopener noreferrer'>
                            <FaLinkedin className='text-blue-700 hover:text-[#0077b5] cursor-pointer' size={30} />
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=react-chat+${link}`} target='_blank' rel='noopener noreferrer'>
                            <FaWhatsapp className='text-green-600 hover:text-[#25d366] cursor-pointer' size={30} />
                        </a>
                        <a href={`https://www.instagram.com/?url=${link}`} target='_blank' rel='noopener noreferrer'>
                            <FaInstagram className='text-pink-600 hover:text-[#e1306c] cursor-pointer' size={30} />
                        </a>
                        <a href={`https://www.discord.com/?url=${link}`} target='_blank' rel='noopener noreferrer'>
                            <FaDiscord className='text-blue-600 hover:text-[#7289da] cursor-pointer' size={30} />
                        </a>
                    </div>
                    <div className='mb-4'>
                        <p className='mb-2'>Copy Link</p>
                        <div className='flex items-center border-2 border-[gray] rounded overflow-hidden'>
                            <BsLink45Deg size={30} /><input type='text' value={link} className='flex-1 p-2 bg-gray-100' disabled />
                        </div>
                    </div>
                    <button onClick={copyLink} className='w-full bg-[#7C5CBF] text-white py-2 rounded'>{copy}</button>
                </div>
            </div>
        </>
    );
}

export default ShareBox;
