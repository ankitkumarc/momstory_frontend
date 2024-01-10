import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { useState, useContext } from "react";
import React from "react";
import noteContext from '../context/notes/noteContext';

const StarRating = ({ rating, title, description, id, showAlert }) => {
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [activeStar, setActiveStar] = useState(rating);
    const [hover, setHover] = React.useState(-1);
    const context = useContext(noteContext);
    const { updateRating } = context;

    const handleRating = async () => {

        if (rating !== -1) {
            showAlert("Already Rated", "warning");
            return;
        }

        if (activeStar === 0) {
            showAlert("Please select more than 0 stars", "warning");
            return;
        }

        try {
            await updateRating(title, description, activeStar, id);
            showAlert("Thanks for Rating!!", "success");
        } catch (error) {
            showAlert("Error updating rating", "error");
        }
    };


    return (
        <div className="flex justify-center items-center flex-row mb-8">
            <Rating
                name="hover-feedback"
                value={activeStar}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setActiveStar(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55, height: '40', width: '40' }} fontSize="inherit" />}
                icon={<StarIcon style={{ height: '40', width: '40' }} fontSize="inherit" />}
            />
            <div className="font-semibold text-xl mx-4" onClick={handleRating}>
                {(rating === -1) && <button onClick={() => { handleRating() }}>Submit</button>}
                {(rating !== -1) && <>Thanks for Rating</>}
            </div>

        </div>
    );
};

export default StarRating;
