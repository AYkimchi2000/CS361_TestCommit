<script>
   import { fetchMonitor } from "$lib/api.svelte";
   import { updateRouteState } from "$lib/util";
   import Navbar from "$lib/Navbar.svelte";
    // You can pull this from an environment variable later
    let request_success_flag = $state(false)
    let request_response = $state()
    

</script>

<Navbar updateRouteState={updateRouteState} ></Navbar>

<button class="bg-blue-400" onclick={async ()=>{
    const data = await fetchMonitor.fetchGET('/localapi/status')
    console.log(data)
    }}>
    fetchStatus
</button>

<button class="bg-amber-300" onclick={async ()=>{
    const data = await fetchMonitor.fetchPOST('/localapi/process-chords', arr)
    console.log(data)
    }}>
    ProcessChords
</button>

<button class="bg-emerald-600" onclick={async ()=>{
    const data = await fetchMonitor.fetchGET('https://testwebapi-864732308157.asia-east1.run.app/')
    console.log(data)
    }}>
    fetchWebAPI
</button>

<pre>The fetch Stack: {JSON.stringify(fetchMonitor.fetchStack, null, 2)}</pre>

{#if request_success_flag == true}
    <pre>{JSON.stringify(request_response, null, 2)}</pre>
    <button class="bg-amber-700" onclick={()=>{request_success_flag = false}}> reset_success_flag </button>
{/if}


