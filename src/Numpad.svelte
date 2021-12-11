<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value;
    export let point = ".";
    export let decimals = 1;
    export let maxVal = 30;

    export const setValue = (newValue) => {
        input = "";
        value = newValue + "";
        console.debug(`Setting numpad to value: ${value}, input: ${input}`);
    }

    let keys = "1,2,3,4,5,6,7,8,9,C,0,&#8592".split(',');
    let input = "";
    value = "–";
    
    $: if (value == "") { value = "–"; input = ""; }

    function KeyInput(keyVal:string): void {
        let acceptNumber = Number(input + keyVal) <= 10**decimals * maxVal;

        if (input.length == 0) acceptNumber = Number(keyVal) <= maxVal;
        
        console.debug(Number(input + keyVal) + `\t${acceptNumber}`);

        // Update input string
        if ("0123456789".includes(keyVal) && acceptNumber) input += keyVal;
        else if (keyVal == "&#8592") input = input.substring(0, input.length - 1);
        else if (keyVal == "C") input = "";

        // Remove leading zeros on integer part
        if (input.length > decimals + 1) input = input.replace(/^0/g, '');

        // Update output value
        if (input.length > 1) {
            const places = Math.min(input.length - 1, decimals);
            value = input.substring(0, input.length - places) + point + input.substring(input.length - places);
        }
        else if (input.length == 1) value = input;
        else value = "–";

        console.debug("Value: " + Number(value) + "\t" + "Input: " + input);
    }

    function handleUpBtn() {
        dispatch("Up");
    }

    function handleDownBtn() {
        dispatch("Down");
    }
</script>

<main>
    <div class="side"></div>
    <div class="numpad noselect">
        {#each keys as key}
            <div class="key" on:click|stopPropagation|preventDefault={() => KeyInput(key)}>{@html key}</div>
        {/each}
    </div>
    <div class="side">
        <div class="up key" on:click={handleUpBtn}>
            <svg viewBox="-10 0 80 25">
                <path
                    d={"M10 20l20 -15l20 15"}
                ></path>
            </svg>
        </div>
        <div class="down key" on:click={handleDownBtn}>
            <svg viewBox="-10 0 80 25">
                <path
                    d={"M10 5l20 15l20 -15"}
                ></path>
            </svg>
        </div>
    </div>
</main>

<style>
    svg {
        width: 100%;
        height: 100%;
    }

    path {
        stroke: white;
        stroke-width: 7px;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
    }
    .side {
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
        padding-bottom: 20px;
    }

    .numpad {
        position: relative;
        display: flex;
        height: 185px;
        width: 270px;
        flex-wrap: wrap;
        padding: 5px;
        padding-bottom: 20px;
        background: #0001;
    }

    .key {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(25% - 6px);
        width: calc(33.3% - 6px);
        margin: 3px;
        border-radius: 10px;
        background: #FFF8;
        color: black;
        font-size: 2em;
        font-weight: bold;
    }

    .up, .down {
        width: 100%;
        height: 30%;
        background: #FFF2;
    }

    .key:active {
        background: #8888;
        border: 2px solid transparent;
    }

    main {
        position: relative;
        display: flex;
		align-items: center;
        justify-content: center;
        width: 100%;
        height: 185px;
        color: black;
    }
</style>