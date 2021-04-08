<script lang="ts">
    import { carbRatio } from "../data/data";
    import FoodCard from "./FoodCard.svelte";
    import Submit from "../Submit.svelte";
    import FoodSearch from "./FoodSearch.svelte";
    import MealSummary from "./MealSummary.svelte";
    import PageSelector from "../PageSelector.svelte";
    import Numpad from "../Numpad.svelte";

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
</script>

<Submit {item} {canSubmit} on:submitted={() => console.debug("submitted callback not implemented")}>
<main>
    <!--LogoHeader caption="Meal">
        <MealLogo thickness="2px"/>
    </LogoHeader-->
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
    <!--div class="plus-food" on:click={activateSearch}>
        <svg viewBox="-5 -4 50 50">
            <path
                stroke="white"
                stroke-width="6px"
                d="M8 20l24 0M20 8l0 24"
            ></path>
        </svg>
        <div class="add-food">
            Add Food ...
        </div>
    </div-->
    {/if}
</main>
</Submit>
    
<style>
    .space {
        height: 20px;
    }

    .numpads {
        position: relative;
        width: 100%;
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

    .add-food {
        flex-shrink: 0;
        margin: 5px;
    }
    .plus-food {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        height: 40px;
        width: 160px;
        border-radius: 20px;
        font-size: 1.2em;
        color: white;
        background: var(--meal-logo);
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