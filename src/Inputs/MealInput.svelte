<script lang="ts">
    import { carbRatio } from "../data/data";
    import FoodCard from "./FoodCard.svelte";
    import FoodSearch from "./FoodSearch.svelte";
    import MealSummary from "./MealSummary.svelte";
    import PageSelector from "../PageSelector.svelte";
    import Numpad from "../Numpad.svelte";
    import { latest, formatTime } from "../Stores/stores";

    let canSubmit = false;

    let food;

    let foodList = [];

    let addFood = false;

    function activateSearch() {
        addFood = true;
    }

    $: if (food) {
        const newFood = { ...food };
        newFood.amount = Math.floor(50 * Math.random());
        newFood.carbTotal = newFood.amount * Number(food.carbs) / 100;
        newFood.calsTotal = newFood.amount * Number(food.cals) / 100;
        newFood.effect = newFood.carbTotal * carbRatio;
        foodList.push(newFood);
        console.debug(newFood);
        food = null;
        console.debug(foodList);
        updateItem();
        addFood = false;
    }

    function getStats() {
        let total = { amount: 0, carbs: 0, effect: 0, cals: 0 };
        foodList.forEach(food => {
            total.amount += food.amount;
            total.carbs += food.carbTotal;
            total.effect += food.effect;
            total.cals += food.calsTotal;
        });

        return total;
    }

    let item;

    function updateItem() {
        item = {
            type: "meal",
            time: Date.now(),
            value: getStats().carbs.toFixed(1) + "g",
            upeffect: getStats().effect.toFixed(1),
        }
    }

    updateItem();

    function packFoodInfo(f) {
        return { 
            ...f,
            amount: f.amount,
            carbs: f.carbTotal,
            cals: f.calsTotal,
        };
    }

    $: if (addFood == false && foodList.length > 0) canSubmit = true;

    $: $latest.canSubmit = addFood == false && foodList.length > 0;

    $latest.submit = () => {
        const mealStats = getStats();
        $latest.meals.list.push({
            foodList,
            mealStats,
        })

        if (!$latest.meals.total) {
            $latest.meals.total = 0;
        }

        $latest.meals.total += mealStats.effect;

        foodList = [];
    }
</script>

<main>
    <div class="space"></div>
    {#if addFood}
        <FoodSearch bind:food={food} on:close={() => { addFood = false; }}/>
    {:else}
    <MealSummary stats={getStats()}/>
    <div class="counter">{foodList.length} food item{foodList.length == 1 ? "" : "s"}</div>
    <div class="food-list" on:click={activateSearch}>
        {#if foodList.length > 0}
            {#each foodList as f, i}
                <FoodCard
                food={packFoodInfo(f)}
                light={i % 2 == 1}/>
            {/each}
        {:else}
        <div class="no-foods">No foods added yet ...</div>
        {/if}
    </div>
    <div class="numpads">
        <PageSelector pages={Array(foodList.length).fill(Numpad)}/>
    </div>
    {/if}
</main>
    
<style>
    .space {
        height: 20px;
    }

    .numpads {
        position: relative;
        width: 70%;
        height: 35%;
        background: #0001;
        flex-grow: 1;
    }

    .no-foods {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        font-size: 1.3em;
    }

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
        width: 90%;
        height: 30%;
        font-size: 1em;
        background: #555;
        box-shadow: 0 0 10px #FFF8;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-bottom: 15px;
    }

    .counter {
        font-size: 0.9em;
        color: #FFF8;
        margin: 8px;
    }
</style>