<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { cart } from './Stores/stores';


    const dispatch = createEventDispatcher();

    function handleClick(e) {
        e.preventDefault();
        toggle();
        dispatch('clicked');
    }

    export let on:boolean = false;

    const plus = `M8 20l24 0M20 8l0 24`;

    function toggle() {
        on = !on;
        $cart = [];
    }

</script>

<div class="wrapper" on:click|stopPropagation={(e) => handleClick(e)} class:on>
    <div class="shadow" class:on></div>
    <svg width=65 height=65 viewBox="-5 -4 50 50" class:on>
        <path
            stroke="white"
            stroke-width="6px"
            d = {plus}
        ></path>
    </svg>
</div>

<style>
    * {
        transition: 200ms;
    }

    path {
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

    .wrapper {
        position: relative;
    }

    .shadow {
        position: absolute;
        height: 65px;
        width: 65px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px #FFF8;
        z-index: 5;
        opacity: 0;
    }

    .shadow.on {
        opacity: 1;
    }

	svg {
        position: absolute;
		border-radius: 50%;
        background: transparent;
        flex-shrink: 0;
        z-index: 10;
        transform: translate(-50%, -50%) rotate(45deg);
	}

    svg.on {
        background: #12548d;
        transform: translate(-50%, -50%);
    }
</style>