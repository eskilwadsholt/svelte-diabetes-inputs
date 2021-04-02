<script lang="ts">
    export let numerator, denominator;
</script>

<div class="fraction">
    <div class="numerator">{numerator}</div>
    <div class="line"></div>
    <div class="denominator">{denominator}</div>
</div>

<style>
    .fraction {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .numerator, .denominator {
        font-size: 0.8em;
        padding-left: 2px;
        padding-right: 2px;
    }

    .line {
        border: 0.5px solid black;
        width: 100%;
    }
</style>