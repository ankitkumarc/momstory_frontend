// useFetch.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleGoogle = async (response) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ credential: response.credential }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("fetchhook")
                console.log(data);

                if (data?.user) {
                    // localStorage.setItem('token', json.authToken);
                    localStorage.setItem("token", data?.token);
                    navigate("/");
                    window.location.reload();
                }

                throw new Error(data?.message || data);
            })
            .catch((error) => {
                setError(error?.message);
            });
    };
    return { handleGoogle };
};

export default useFetch;