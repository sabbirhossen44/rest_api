// src/components/TawkMessenger.jsx
import { useEffect } from "react";

const TawkMessenger = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://embed.tawk.to/682045129c7ecf190fb1c60c/1ivrmfi94";
        script.async = true;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default TawkMessenger;
