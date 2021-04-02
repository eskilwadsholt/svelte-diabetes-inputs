<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function handleClick(e) {
        e.preventDefault();
        dispatch('clicked');
    }

    export let highlight = false;
</script>

<div class="wrapper" on:click|stopPropagation={e => handleClick(e)}>
    <slot></slot>
    <div class="mark" class:highlight></div>
    <div class="circle" class:highlight></div>
</div>

<style>
    * {
        transition: 200ms cubic-bezier(0.3, 1, 0.6, 1.2);
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
        width: 0px;
        height: 0px;
        z-index: -1;
        border-radius: 50%;
        background: #000;
        transform: translate(-50%, -50%);
    }

    .circle.highlight {
        width: 73px;
        height: 73px;
    }
</style>