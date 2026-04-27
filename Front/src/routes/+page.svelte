<script>
   import { fetchGET, fetchPOST, arr } from "$lib";
   import Navbar from "$lib/Navbar.svelte";
    // You can pull this from an environment variable later
    let request_success_flag = $state(false)
    let request_response = $state()
    

</script>

<Navbar></Navbar>

<button onclick={async ()=>{
    const data = await fetchGET('/api/status')
    console.log(data)
    }}>
    fetchStatus
</button>

<button onclick={async ()=>{
    const data = await fetchPOST('/api/process-chords', arr)
    console.log(data)
    }}>
    ProcessChords
</button>

<!-- {#if request_success_flag == true}
    <pre>{JSON.stringify(request_response, null, 2)}</pre>
    <button onclick={()=>{request_success_flag = false}}> reset_success_flag </button>
{/if} -->



