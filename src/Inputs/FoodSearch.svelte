<script lang="ts">
    import { onMount } from "svelte";
    import { foods } from "../data/food-suggestions";
    import FoodCard from "./FoodCard.svelte";

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
</script>

<main>
    <input type="text" placeholder="Search food ..." bind:value={search} bind:this={field}>
    <div class="food-list">
        {#if search && foods}
            {#each filteredFoods as f, i}
                <div on:click={() => chooseFood(f)}>
                    <FoodCard food={f} light={i % 2 == 1}/>
                </div>
            {/each}
        {/if}
    </div>
</main>
    
<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .food-list {
        position: relative;
        box-sizing: border-box;
        width: 80%;
        height: 40%;
        font-size: 0.9em;
        margin-top: 20px;
        background: #555;
        box-shadow: 0 0 10px #FFF8;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>