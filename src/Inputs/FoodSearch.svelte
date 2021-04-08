<script lang="ts">
    import { onMount } from "svelte";
    import { carbRatio } from "../data/data";
    import { foods } from "../data/food-suggestions";
    import FoodCard from "./FoodCard.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function handleCloseBtn(e) {
        e.preventDefault();
        dispatch('close');
    }
    

    let search = "";
    let field;

    export let food;

    onMount(() => { field.focus(); });

    function chooseFood(f) {
        food = f;
    }

    $: filteredFoods = search ? foods.filter(matchSearch) : [];

    function matchSearch(x) {
        return x.food.toLowerCase().includes(search.toLowerCase());
    }

    function computeEffect(f) {
        return Number(f.carbs) * carbRatio;
    }
</script>

<input type="text" placeholder="Search food ..." bind:value={search} bind:this={field}>
<div class="counter">{filteredFoods.length} match{filteredFoods.length == 1 ? "" : "es"}</div>
<div class="food-list">
    {#if search && foods}
        {#each filteredFoods as f, i}
            <div on:click={() => chooseFood(f)}>
                <FoodCard food={{ ...f, effect: computeEffect(f) }} light={i % 2 == 1}/>
            </div>
        {/each}
    {/if}
</div>
<div class="minus-food" on:click={handleCloseBtn}>
    <svg viewBox="-5 -4 50 50">
        <path
            stroke="white"
            stroke-width="6px"
            d="M8 20l24 0M20 8l0 24"
        ></path>
    </svg>
</div>
    
<style>
    input[type="text"] {
        margin-bottom: 0;
        margin-top: 5px;
    }

    .minus-food {
        transform: rotate(45deg);
    }

    svg {
        width: 40px;
        height: 40px;
        background: #0004;
        border-radius: 20px;
    }

    path {
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}

    .food-list {
        position: relative;
        box-sizing: border-box;
        width: 90%;
        height: 40%;
        font-size: 1em;
        background: #555;
        box-shadow: 0 0 10px #FFF8;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .counter {
        font-size: 0.9em;
        color: #FFF8;
        margin: 8px;
    }
</style>