<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    import UpArrow from "../Logos/UpArrow.svelte";
    export let food;
    export let light = false;
    export let focus = false;
    export let amount = food.amount;
    let element;

    $: { 
        food.amount = amount;
    }

    $: if (focus) {
        dispatch("focus", { element });
    }

    function remove() {
        dispatch("remove");
    }
</script>

<div class="food-card" class:light class:focus bind:this={element} on:click|stopPropagation>
<div class="details">
    <div class="amount">{food.amount}g</div>
    <div class="food-name">{food.base.food}</div>
    <div class="food-stats">
        <div class="value upeffect">
            {Number(food.effect).toFixed(1)}
            <div class="uparrow">
                <UpArrow/>
            </div>
        </div>
    </div>
    <div class="remove" on:click|stopPropagation={remove}>&times;</div>
</div>
</div>

<style>
    .uparrow {
        width: 0.45em;
        margin-left: 2px;
    }

    .upeffect {
        display: flex;
        align-items: center;
    }

    .value {
        display: flex;
        align-items: center;
    }

    .amount {
        display: flex;
        justify-content: center;
        width: 16%;
        border: 2px solid white;
        border-radius: 999px;
        background: white;
        color: black;
    }

    .food-card {
        display: flex;
        align-items: center;
        border-radius: 99px;
        border: 2px solid transparent;
        margin: 2px;
        background: var(--food-card);
        box-shadow: 0 0 5px #FFF8;
        color: #FFF;
    }

    .focus, .focus .amount {
        /* box-shadow: 0 0 3px var(--focus); */
        border: 2px solid var(--focus);
    }

    .details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
        padding: 3px;
    }

    .light {
        background: var(--food-card-light);
    }

    .food-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1em;
        flex: 1;
        margin-left: 10px;
    }
    
    .food-stats {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1em;
        color: #FFF;
    }

    .remove {
        background: gray;
        color: white;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        margin-left: 5px;
    }
</style>