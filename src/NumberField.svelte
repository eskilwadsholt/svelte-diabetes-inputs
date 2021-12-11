<script lang="ts">
    export let value;
    export let decimals = 1;
    export let maxVal = 30;
</script>

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
        color: black;
    }

    .number {
        display: flex;
        align-items: center;
        border-radius: 20px;
        background: #FFFA;
        padding: 0 10px 0 10px;
    }

    .value {
        font-size: 3em;
        margin-right: 5px;
    }
</style>