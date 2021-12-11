<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { swipeable, clamp } from "./events";
    
    const dispatch = createEventDispatcher();

    export let pages;
    export let ID:string;

    let currentPage = 0;
    let drag = 0;
    let newPage = currentPage;
    let dragging = false;

    function handleSwipeLeft(e) {
        if (!dragging) console.debug(`${ID}: Swipe Left`);
        dragging = true;
        newPage = clamp(currentPage + Math.round(e.detail.clampedProgress), 0, pages.length - 1);
        drag = -e.detail.drag;
    }

    function handleSwipeRight(e) {
        if (!dragging) console.debug(`${ID}: Swipe Right`);
        dragging = true;
        newPage = clamp(currentPage - Math.round(e.detail.clampedProgress), 0, pages.length - 1);
        drag = e.detail.drag;
    }

    function handeSwipeEnd() {
        dispatch("swipeEnd");
        dragging = false;
        currentPage = newPage;
        drag = 0;
        console.debug(`${ID}: Swipe End`);
    }
</script>

<main
    class:dragging
    use:swipeable
    on:swipeLeft={handleSwipeLeft}
    on:swipeRight={handleSwipeRight}
    on:swipeEnd={handeSwipeEnd}
    >
    <div class="progress-bar">
        {#each pages as _, i}
            <div class="ball" class:selected={i == newPage}></div>
        {/each}
    </div>
    {#each pages as page, i}
        <div class="page" style={`left:calc(${(i - currentPage) * 100}% + ${drag}px)`}>
            <svelte:component this={page}
                on:swipeLeft={handleSwipeLeft}
                on:swipeRight={handleSwipeRight}
                on:swipeEnd={handeSwipeEnd}/>
        </div>
    {/each}
</main>

<style>
    main {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .page {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: 200ms;
    }

    .dragging .page {
        transition: none;
    }

    .progress-bar {
        position: absolute;
        left: 50%;
        display: flex;
        height: 20px;
        transform: translate(-50%);
        z-index: 1;
    }

    .ball {
        width: 12px;
        height: 12px;
        background: #555;
        border-radius: 50%;
        margin: 4px;
    }

    .ball.selected {
        background: #333;
    }
</style>