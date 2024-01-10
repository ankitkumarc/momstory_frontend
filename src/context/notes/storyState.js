import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    console.log(isLoaded);

    setTimeout(() => {
        setIsLoaded(1);
    }, 25000)

    const host = "https://momstory.onrender.com/"
    const storyInitial = []

    const [stories, setStories] = useState(storyInitial);

    // Get all story
    const getStories = async () => {

        // API call
        const response = await fetch(`${host}api/stories/savedstories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // pushing note to array
        setStories(json);
    }

    // Add a stories
    const addStory = async (title, description, rating) => {
        // API call
        const response = await fetch(`${host}api/stories/createstory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, rating }),
        });

        // Logic to addNote
        const story = await response.json();

        // pushing note to array
        setStories(stories.concat(story));
    }

    // Delete a note

    const deleteStory = async (id) => {
        // API call
        const response = await fetch(`${host}api/stories/deletestories/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newStories = stories.filter((story) => { return story._id !== id })
        setStories(newStories)
    }

    // Update a Story
    const updateRating = async (title, description, rating, id) => {
        const response = await fetch(`${host}api/stories/updatestories/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, rating }),
        })

        const json = response.json();
        setStories(json);

    }



    return (
        <NoteContext.Provider value={{ stories, addStory, deleteStory, getStories, updateRating, isSpeaking, setIsSpeaking, isComplete, setIsComplete, isLoaded, setIsLoaded }}>
            {props.children}
        </NoteContext.Provider>

    );
}

export default NoteState;
