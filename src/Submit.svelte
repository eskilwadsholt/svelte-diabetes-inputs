<script lang="ts">
    export let page;

    let startX = 0;
    let startY = 0;
    let dragY = 0;
    const dragtargetY = 70;
    let dragging = false;
    let vertical = false;
    let horizontal = false;
    let submitting = false;

    function handleTouchStart(e) {
        const touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
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
        
        if (vertical) {
            dragY = clamp(-dy, 0, dragtargetY);

            if (dragY == dragtargetY) submitting = true;
        }
    }

    function handleTouchEnd() {
        dragging = false;
        horizontal = false;
        vertical = false;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    $: if (submitting) {
        console.debug(`Submitting page: ${page}`);
        sleep(1000).then(() => submitting = false);
    }
</script>

<main
    on:touchstart={e => handleTouchStart(e)}
    on:touchmove={e => handleTouchMove(e)}
    on:touchend={handleTouchEnd}
    >
    <svelte:component this={page}/>
    <div class="submit" class:vertical class:submitting>
        <div class="submit-header">SUBMIT</div>
        <div class="outer-trace">
            <div class="trace" 
                style={`height:${submitting ? 70 : 190 - dragY * 120 / dragtargetY}px`}>
                <div class="arrow">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <path
                            d="M25 55l25 -20l25 20"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .submit {
        visibility: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: #AAAB;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .submit.vertical, .submit.submitting {
        visibility: visible;
    }

    .submit-header {
        position: absolute;
        color: white;
        font-size: 2em;
        bottom: 55%;
    }

    .outer-trace {
        position: absolute;
        top: 45%;
        width: 70px;
        height: 190px;
    }

    .trace {
        position: absolute;
        top: 0;
        width: 100%;
        border-radius: 35px;
        background: var(--submit-btn);
    }

    .arrow {
        position: absolute;
        bottom: 0;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        background: white;
        border: 4px solid var(--submit-btn);
    }

    path {
        stroke: var(--submit-btn);
        stroke-width: 8px;
        stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
    }
</style>