import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';
import StoryItem from './StoryItem';
import "../Styles/StoryStyle.css";
import { Link } from 'react-router-dom';
import character from "../images/character.png";

const SaveStories = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { stories, getStories } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getStories();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token');
        props.showAlert("Successfully Logout", "success")
        navigate("/login");
    }
    return (
        <>
            <div className="story-container">
                <div className="account-section">
                    <div className="profile-image" style={{}}>
                        <img src={character} alt="Profile_Image" style={{ width: "5rem", height: "5rem", borderRadius: "50%" }} />
                    </div>
                    <div className="profile-details">
                        <div className="profile-details-name">Story Panda</div>
                        <button onClick={handleLogout} className="profile-logout-button">Logout</button>
                    </div>
                    <div className="profile-create-story">
                        <div className="profile-create-your-story">
                            <Link to="/famousfolktales">
                                Create Story
                            </Link>
                        </div>
                        <div className='generated-story'>
                            {stories.length}
                        </div>
                    </div>
                </div>
                <div className="story-section flex justify-center items-center" >
                    <div className='text-4xl font-bold my-4 mb-6' style={{ color: "#00b8a9" }}>Your Stories</div>
                    <div className="story-card">
                        {(stories.length === 0) ? 'Create Your Stories Now'
                            : stories.map((story, index) => {
                                return <StoryItem key={index} story={story} showAlert={props.showAlert} />
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaveStories
