<script>
    // You can pull this from an environment variable later
    let request_success_flag = $state(false)
    let request_response = $state()
    const API_BASE_URL = 'http://127.0.0.1:8000';

    async function fetchTest() {
        try {
            const response = await fetch('/api/status'); // Relative path
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            request_response = data;
            request_success_flag = true;
        } catch (error) {
            console.error("Fetch failed:", error);
            request_success_flag = false;
        }
    }
</script>
<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
</nav>

<button onclick={fetchTest}>fetch</button>
{#if request_success_flag == true}
    <pre>{JSON.stringify(request_response, null, 2)}</pre>
    <button onclick={()=>{request_success_flag = false}}> reset_success_flag </button>
{/if}



