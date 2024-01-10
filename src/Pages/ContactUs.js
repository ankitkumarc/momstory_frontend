import React, { useEffect } from 'react';

const ContactUs = () => {
    useEffect(() => {
        // Load ElfSight script dynamically after component has mounted
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.defer = true;
        document.body.appendChild(script);

        // Clean up the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="elfsight-app-7d443670-c6b5-4ff9-8367-7efac646fb48" data-elfsight-app-lazy></div>
    );
};

export default ContactUs;
