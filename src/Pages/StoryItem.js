import React from 'react'
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import "../Styles/StoryCard.css";

const StoryItem = (props) => {
    const { story } = props;

    return (
        <div className="card-body" >
            <Link className="link-card" to={`/savestories/${story._id}`}>
                <div className="card-image">
                    <img src={story.description[0].image} alt="Card image1 cap" />
                </div>
                <div className="card-text font-semibold" >{story.description[0].text}
                </div>
            </Link>
        </div>
    )
}

export default StoryItem
