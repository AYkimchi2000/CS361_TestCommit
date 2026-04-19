<script>
    // You can pull this from an environment variable later
    const API_BASE_URL = 'http://127.0.0.1:8000';

    async function fetchTest() {
        try {
            const response = await fetch(`${API_BASE_URL}/test`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    }
</script>

<button onclick={fetchTest}>fetch</button>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>



