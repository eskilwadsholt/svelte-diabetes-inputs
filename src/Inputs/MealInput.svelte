<script lang="ts">
    import { carbRatio } from "../data/data";
    import FoodCard from "./FoodCard.svelte";
    import LogoHeader from "../LogoHeader.svelte";
    import MealLogo from "../Logos/MealLogo.svelte";
    import Submit from "../Submit.svelte";
    import FoodSearch from "./FoodSearch.svelte";

    let canSubmit = false;

    let food;

    let foodList = [];

    let addFood = false;

    function activateSearch() {
        addFood = true;
    }

    $: if (food) {
        setTimeout(() => { addFood = false; }, 400);
        const newFood = { ...food };
        newFood.amount = Math.floor(50 * Math.random());
        newFood.carbTotal = newFood.amount * Number(food.carbs) / 100;
        newFood.effect = newFood.carbTotal * carbRatio;
        foodList.push(newFood);
        console.debug(newFood);
        food = null;
        console.debug(foodList);
        updateItem();
        canSubmit = true;
    }

    function getStats() {
        let total = { amount: 0, carbs: 0, effect: 0 };
        foodList.forEach(food => {
            total.amount += food.amount;
            total.carbs += food.carbTotal;
            total.effect += food.effect;
        });

        return total;
    }

    let item;

    function updateItem() {
        item = {
            type: "meal",
            time: Date.now(),
            value: getStats().carbs.toFixed(0) + "g",
            upeffect: getStats().effect.toFixed(1),
        }
    }

    updateItem();
</script>

<Submit {item} {canSubmit} on:submitted={() => console.debug("submitted callback not implemented")}>
<main>
    <LogoHeader caption="Meal">
        <MealLogo thickness="2px"/>
    </LogoHeader>
    {#if addFood}
        <FoodSearch bind:food={food}/>
    {:else}
    <div class="food-list">
        {#if foodList.length > 0}
            {#each foodList as f, i}
                <div class="food-entry">
                    <div class="amount">
                        <div class="title">Amount</div>
                        <div>
                            {f.amount}g
                        </div>
                    </div>
                    <FoodCard food={f} light={i % 2 == 1}/>
                    <div class="carbs">
                        <div class="title">Carbs</div>
                        <div>
                            {f.carbTotal.toFixed(1)}g
                        </div>
                    </div>
                    <div class="effect">
                        <div class="title">mmol/L</div>
                        <div>
                            {f.effect.toFixed(1)}
                        </div>
                    </div>
                </div>
            {/each}
            <div class="total">
                <div class="total-header">MEAL STATS</div>
                <div class="total-vals">
                    <div class="amount">
                        <div class="title">Amount</div>
                        <div>
                            {getStats().amount}g
                        </div>
                    </div>
                    <div class="space"></div>
                    <div class="carbs">
                        <div class="title">Carbs</div>
                        <div>
                            {getStats().carbs.toFixed(1)}g
                        </div>
                    </div>
                    <div class="effect">
                        <div class="title">mmol/L</div>
                        <div>
                            {getStats().effect.toFixed(1)}
                        </div>
                    </div>
                </div>
            </div>
        {:else}
        <div>No foods added yet ...</div>
        {/if}
    </div>
    <div class="plus-food" on:click={activateSearch}>
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
    </div>
    {/if}
</main>
</Submit>
    
<style>
    .amount, .carbs, .effect {
        display: flex;
        width: 45px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 3px;
    }

    .space {
        flex-grow: 1;
    }

    .title {
        font-size: 0.8em;
        color: #999;
    }

    .food-entry, .total-vals {
        display: flex;
        align-items: center;
    }

    .total {
        width: 100%;
    }

    .total-header {
        width: 100%;
        padding-top: 5px;
        margin-top: 5px;
        border-top: 2px solid white;
    }

    .add-food {
        flex-shrink: 0;
        margin: 5px;
    }
    .plus-food {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        bottom: 20px;
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
        width: 100%;
        font-size: 0.9em;
        margin-top: 20px;
        background: #555;
        box-shadow: 0 0 10px #FFF8;
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
</style>