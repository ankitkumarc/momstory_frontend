import React, { useState } from 'react';

const YourComponent = () => {
    const [submenuVisible, setSubmenuVisible] = useState(false);

    const handleSubmenuToggle = () => {
        setSubmenuVisible(!submenuVisible);
    };

    const handleChange = (e) => {
        // Handle your select change logic here
        console.log(e.target.value);
    };

    return (
        <div className="text-center z-50 text-semibold flex items-center justify-center w-3/4 bg-green-300 p-8">
            <select
                id="character"
                name="character"
                onChange={handleChange}
                className="mt-1 p-2 w-full text-[16px] font-bold flex items-center justify-center bg-blue-200"
            >
                <option value="Boy">Character</option>
                <optgroup label="Automobile">
                    <option value="car">Car</option>
                    <option value="train">Train</option>
                </optgroup>
                <option value="automobile">Automobile</option>
                <option value="animal">Animal</option>
                <option value="family">Family</option>
                <option value="superhero">Superhero</option>
                <option value="mystical-characters">Mystical Characters</option>
                <option value="custom">Custom</option>
            </select>

            {submenuVisible && (
                <ul className="dropdown-menu">
                    <li><a href="#">2nd level dropdown</a></li>
                    <li><a href="#">2nd level dropdown</a></li>
                    <li className="dropdown-submenu">
                        <a href="#">Another dropdown</a>
                        <ul className="dropdown-menu">
                            <li><a href="#">3rd level dropdown</a></li>
                            <li><a href="#">3rd level dropdown</a></li>
                        </ul>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default YourComponent;
