import { useState, useEffect } from "react";

function useWindowVisibility() {
    const [documentVisible, setDocumentVisible] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setDocumentVisible(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return documentVisible;
}

export default useWindowVisibility;
