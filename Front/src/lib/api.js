export async function fetchGET(path) {
    try {
        const response = await fetch(path);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        // Log and re-throw so the caller knows it failed
        console.error("Fetch failed:", error);
        throw error; 
    }
}

export async function fetchPOST(path, data) {
    try {
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    } catch (error) {
        // Log and re-throw so the caller knows it failed
        console.error("Fetch failed:", error);
        throw error; 
    }
}