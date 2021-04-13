<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function handleClick(e) {
        e.preventDefault();
        dispatch('clicked');
    }

    export let highlight = false;
    export let latest = false;
</script>

<div class="wrapper" on:click|stopPropagation={e => handleClick(e)}>
    <div class="logo">
        <slot name="logo"/>
    </div>
    <div class="mark" class:highlight></div>
    <div class="circle" class:highlight></div>
    {#if latest}
    <div class="latest">
        <slot name="latest"/>
    </div>
    {/if}
</div>

<style>
    * {
        transition: 200ms cubic-bezier(0.3, 1, 0.6, 1.2);
    }

    .logo {
		width: 55px;
		height: 55px;
		border-radius: 50%;
        position: absolute;
        top: -5px;
        transform: translate(-50%, -50%);
	}

    .latest {
		position: absolute;
		z-index: 10;
		left: 0;
		top: 17px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 999px;
        padding: 0 7px;
        border: 2px solid white;
		background: #000;
		color: white;
		font-size: 0.9em;
        transform: translate(-50%);
	}

    .wrapper {
        position: relative;
    }

    .mark {
        position: absolute;
        top: -30px;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid #FFF;
        transform: translate(-50%) scale(0);
        z-index: -1;
    }

    .mark.highlight {
        top: -55px;
        transform: translate(-50%) scale(1);
    }

    .circle {
        position: absolute;
        top: -5px;
        width: 0px;
        height: 0px;
        z-index: -1;
        border-radius: 50%;
        background: #000;
        transform: translate(-50%, -50%);
    }

    .circle.highlight {
        width: 67px;
        height: 67px;
    }
</style>