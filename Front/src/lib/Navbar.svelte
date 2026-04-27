<script>
    import { page } from '$app/stores';
    import { updateRouteState } from "$lib";
</script>

<nav>
    <a href="/" 
       class:active={$page.url.pathname === '/'} 
       onclick={() => updateRouteState('home')}>home</a>
    
    <a href="/about" 
       class:active={$page.url.pathname === '/about'} 
       onclick={() => updateRouteState('about')}>about</a>
    
    <a href="/help" 
       class:active={$page.url.pathname === '/help'} 
       onclick={() => updateRouteState('help')}>help</a>
    
    <a href="/dev" 
       class:active={$page.url.pathname === '/dev'} 
       onclick={() => updateRouteState('dev')}>dev</a>
</nav>

<style>
    .active {
        font-weight: bold;
        color: orange; /* Or your preferred highlight color */
        background-color: aquamarine;
    }
</style>