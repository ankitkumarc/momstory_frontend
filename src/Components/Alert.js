import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alert(props) {

    useEffect(() => {
        if (props.alert && props.alert.type) {
            toast[props.alert.type](props.alert.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [props.alert]);

    return (
        <div style={{ height: '50px' }} >

            <ToastContainer />
        </div>
    )
}

export default Alert;
