<script lang="ts">
    export let value;
    let keys = "1,2,3,4,5,6,7,8,9,C,0,&#8592".split(',');
    let input = "";
    export let point = ".";
    export let decimals = 1;
    export let maxVal = 30;
    
    $: if (value == "") { value = "–"; input = ""; }

    function KeyInput(e, keyVal:string):void {
        e.preventDefault();
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

</script>

<main>
    <div class="number-field">
        <div class="range-tip">
            {(0).toFixed(decimals) + " – " + maxVal.toFixed(decimals)}
        </div>
        <div class="number">
            <div class="value">{value}</div>
            <div class="unit">
                <slot name="unit"></slot>
            </div>
        </div>
    </div>
    <div class="numpad noselect">
        {#each keys as key}
            <div class="key" on:click|stopPropagation={(e) => KeyInput(e, key)}>{@html key}</div>
        {/each}
    </div>
</main>

<style>
    .range-tip {
        font-size: 1em;
        color: #FFFA;
        margin: 3px;
    }

    .number-field {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .number {
        display: flex;
        align-items: center;
        border-radius: 20px;
        background: #FFFA;
        padding: 0 10px 0 10px;
    }

    .numpad {
        display: flex;
        width: 260px;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }

    .key {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 80px;
        margin: 3px;
        border-radius: 10px;
        background: #FFF8;
        color: black;
        font-size: 2em;
        font-weight: bold;
    }

    .key:active {
        background: #8888;
        border: 2px solid transparent;
    }

    main {
        position: relative;
        display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        color: black;
    }

    .value {
        font-size: 3em;
        margin-right: 5px;
    }
</style>