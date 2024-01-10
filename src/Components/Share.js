import React from 'react';
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";

const Share = () => {
    const shareUrl = new URL(window.location.href);
    return (
        <div>
            <FacebookShareButton url={shareUrl} quote='Login to momstory.co to Create AI stories' style={{ marginRight: "1rem" }}>
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title="Login to momstory.co to Create AI stories" style={{ marginRight: "1rem" }}>
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton url={shareUrl} title="Login to momstory.co to Create AI stories" style={{ marginRight: "1rem" }}>
                <FaXTwitter size={30} />
            </TwitterShareButton>
            <TelegramShareButton url={shareUrl} title="Login to momstory.co to Create AI stories" style={{ marginRight: "1rem" }}>
                <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
        </div >
    )
}

export default Share
