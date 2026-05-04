class FetchMonitor {
    fetchStack = $state({}) 
    pushRequest(request_metadata) {
        const uuid = crypto.randomUUID();
        this.fetchStack[uuid] = request_metadata
        return uuid
    }
    popRequest(uuid) {
        delete this.fetchStack[uuid]
    }
    async fetchGET(path) {
        const request_metadata = {
            method: "GET",
            url: path,
            startTime: Date.now()
        }
        const uuid = this.pushRequest(request_metadata)
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response
        } catch (error) {
            // Log and re-throw so the caller knows it failed
            console.error("Fetch failed:", error);
            throw error; 
        } finally {
            this.popRequest(uuid)
            console.log("popping fetchobject from the stack")
        }
    }    
    async fetchPOST(path, data) {
        const request_metadata = {
            method: "GET",
            url: path,
            startTime: Date.now()
        }
        const uuid = this.pushRequest(request_metadata)
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
            return response
        } catch (error) {
            // Log and re-throw so the caller knows it failed
            console.error("Fetch failed:", error);
            throw error; 
        } finally {
            this.popRequest(uuid)
        }
    }
}

export const fetchMonitor = new FetchMonitor()

