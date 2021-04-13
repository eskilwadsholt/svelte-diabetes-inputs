<script lang="ts">
    import App from "./App.svelte";
    import { latest } from "./Stores/stores";

    let activated:boolean = false;
    let progress:number = 0;

    $: console.debug(`Can submit: ${$latest.canSubmit}`);

    function handleSwipeUp(event) {
        activated = $latest.canSubmit;
        if ($latest.canSubmit) progress = event.detail.clampedProgress;
    }

    function handleSwipeEnd() {
        activated = false;
        progress = 0;
    }

    $: if (progress == 1 && $latest.canSubmit) {
        $latest.submit();
    }
</script>

<send>
    <App on:swipeUp={handleSwipeUp} on:swipeEnd={handleSwipeEnd}/>
    <div class="overlay" class:activated>
        <div class="submit-header">SEND</div>
        <div class="outer-trace">
            <div class="trace" 
                style={`height:${190 - progress * 120}px`}>
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
</send>

<style>
    send, .overlay {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--overlay);
        z-index: 50;
        visibility: hidden;
    }

    .activated {
        visibility: visible;
    }

    
    .submit-header {
        position: absolute;
        color: white;
        padding: 5px;
        font-size: 2.5em;
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
        background: var(--submit);
    }

    .arrow {
        position: absolute;
        bottom: 0;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        background: white;
        border: 4px solid var(--submit);
    }

    path {
        stroke: var(--submit);
        stroke-width: 8px;
        stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
    }
</style>