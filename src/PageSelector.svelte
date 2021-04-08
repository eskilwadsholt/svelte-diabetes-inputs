<script lang="ts">
    export let pages;

    let currentPage = 0;
    let startX = 0;
    let startY = 0;
    let dragX = 0;
    const dragtargetX = 80;
    let newPage = currentPage;
    let dragging = false;
    let horizontal = false;
    let vertical = false;

    function handleTouchStart(e) {
        const touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        dragX = 0;
        newPage = currentPage;
        dragging = true;
    }

    function clamp(val, min, max) {
        if (val < min) return min
        if (val > max) return max
        return val
    }

    function handleTouchMove(e) {
        const touch = e.touches[0];
        const dx = touch.pageX - startX;
        const dy = touch.pageY - startY;

        if (!horizontal && !vertical && dx**2 + dy**2 > 100) {
            if (Math.abs(dy) > 3 * Math.abs(dx)) vertical = true;
            if (Math.abs(dx) > 3 * Math.abs(dy)) horizontal = true;
        }
        
        if (horizontal) {
            dragX = dx;
            const progress = clamp(dragX / dragtargetX, -1, 1);
            newPage = clamp(currentPage - Math.round(progress), 0, pages.length - 1);
        }
    }

    function handleTouchEnd() {
        currentPage = newPage; 
        dragX = 0;
        dragging = false;
        horizontal = false;
        vertical = false;
    }
</script>

<main
    class:dragging
    on:touchstart|stopPropagation={e => handleTouchStart(e)}
    on:touchmove|stopPropagation={e => handleTouchMove(e)}
    on:touchend|stopPropagation={handleTouchEnd}
    >
    <div class="progress-bar">
        {#each pages as _, i}
            <div class="ball" class:selected={i == newPage}></div>
        {/each}
    </div>
    {#each pages as page, i}
        <div class="page" style={`left:calc(${(i - currentPage) * 100}% + ${dragX}px)`}>
            <svelte:component this={page}/>
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