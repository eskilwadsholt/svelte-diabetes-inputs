<script lang="ts">
    import { carbRatio } from "../data/data";
    import FoodSearch from "./FoodSearch.svelte";
    import MealSummary from "./MealSummary.svelte";
    import Numpad from "../Numpad.svelte";
    import { latest, formatTime } from "../Stores/stores";
    import FoodInputCard from "./FoodInputCard.svelte";
    import FoodList from "./FoodList.svelte";
    import { swipeable } from "../events";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let canSubmit = false;
    let foodList = [];
    let searchActive = false;

    function activateSearch() {
        searchActive = true;
    }

    function removeFoodItem(index: number): void {
        foodList.splice(index, 1);
        if (selectedFoodItem >= index) handlePrevious();
        foodList = foodList;
    }

    function getStats() {
        let total = {
            amount: 0,
            carbs: 0,
            cals: 0,
            effect: 0, 
        };
        foodList.forEach(food => {
            total.amount += food.amount;
            total.carbs += food.carbs;
            total.cals += food.cals;
            total.effect += food.effect;
        });

        return total;
    }

    $: if (searchActive == false && foodList.length > 0) canSubmit = true;

    $: $latest.canSubmit = searchActive == false && foodList.length > 0;

    $latest.submit = () => {
        const mealStats = getStats();
        const time = new Date();
        const display = formatTime(time);
        $latest.meals.list.push({
            foodList,
            mealStats,
            time,
            display,
        })

        if (!$latest.meals.total) {
            $latest.meals.total = 0;
        }

        $latest.meals.total += mealStats.effect;

        foodList = [];
    }

    $: stats = {
        ...getStats(),
        count: foodList.length,
    }

    let downSwipeProgress = 0;

    function handleSwipeDown(e) {
        if (!searchActive) {

            downSwipeProgress = e.detail.clampedProgress
    
            if (downSwipeProgress == 1) {
                activateSearch();
                downSwipeProgress = 0;
            }
        }
    }

    function handleSwipeEnd(e) {
        downSwipeProgress = 0;
        console.debug("meal input swipe end");
        dispatch("swipeEnd", { ...e });
    }

    let amount = 0;
    let selectedFoodItem = -1;
    $: foodItem = foodList[selectedFoodItem];
    let setValue;

    $: if (amount && foodItem) {
        foodItem.amount = Number(amount) ? Number(amount) : 0;
        foodItem.carbs = foodItem.amount * Number(foodItem.base.carbs) / 100;
        foodItem.cals = foodItem.amount * Number(foodItem.base.cals) / 100;
        foodItem.effect = foodItem.carbs * carbRatio;
        foodList = foodList;
    }

    function handlePrevious() {
        if (selectedFoodItem > 0) {
            selectedFoodItem--;
            setValue(foodList[selectedFoodItem].amount);
            foodItem = foodList[selectedFoodItem];
        }
    }

    function handleNext() {
        if (selectedFoodItem < foodList.length - 1) {
            selectedFoodItem++;
            setValue(foodList[selectedFoodItem].amount);
            foodItem = foodList[selectedFoodItem];
        }
    }

    let offsetTop, foodListElement, foodScrollTo;
    
    function selectFoodItem(e, i) {
        selectedFoodItem = i;
        setValue(foodList[selectedFoodItem].amount);
        foodItem = foodList[selectedFoodItem];
        offsetTop = e.detail.element.offsetTop;
        if (offsetTop && foodListElement) foodScrollTo(offsetTop - foodListElement.offsetHeight / 2 - 2);
    }

    function addFood(e) {
        const food = {
            base: e.detail.food,
            amount: 0,
            carbs: 0,
            cals: 0,
            effect: 0,
        };

        food.carbs = food.amount * Number(food.base.carbs) / 100;
        food.cals = food.amount * Number(food.base.cals) / 100;
        food.effect = food.carbs * carbRatio;
        
        foodList.push(food);
        selectedFoodItem = foodList.length - 1;
        searchActive = false;
    }
</script>

<main use:swipeable
    on:swipeDown={handleSwipeDown}
    on:swipeLeft
    on:swipeRight
    on:swipeEnd={handleSwipeEnd}
    style={`top:${30 * downSwipeProgress}px`}
    class:searchActive
    >
    {#if searchActive}
    <div class="space"></div>
        <FoodSearch
        on:swipeLeft
        on:swipeRight
        on:swipeEnd
        on:close={() => { searchActive = false; }}
        on:chooseFood={addFood}/>
    {/if}
    <div class="meal page" class:hidden={searchActive}>
        <div class="space"></div>
        <MealSummary {stats}/>
        <div class="counter">{foodList.length} food item{foodList.length == 1 ? "" : "s"}</div>
        <FoodList on:click={activateSearch}
            on:swipeLeft
            on:swipeRight
            on:swipeEnd
            bind:element={foodListElement}
            bind:scroller={foodScrollTo}>
            {#if foodList.length > 0}
                {#each foodList as f, i}
                    <FoodInputCard
                    food={f}
                    light={i % 2 == 1}
                    focus={i == selectedFoodItem}
                    on:focus={(e) => selectFoodItem(e, i)}
                    on:click={() => { selectedFoodItem = i }}
                    on:remove={() => removeFoodItem(i)}
                    />
                {/each}
            {/if}
            <div class="add-food">Pull down page or tap here to add food ...</div>
        </FoodList>
        <Numpad bind:value={amount} bind:setValue maxVal={999} decimals={0} point='' on:Up={handlePrevious} on:Down={handleNext}/>
    </div>
</main>
    
<style>
    .searchActive {
        transition: 200ms;
    }

    .space {
        height: 20px;
        flex-shrink: 0;
    }

    .add-food {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        font-size: 1.1em;
        width: 100%;
        padding: 4% 14%;
    }
    main {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .page {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .hidden {
        display: none;
    }

    .counter {
        font-size: 0.9em;
        color: #FFF8;
        margin: 8px;
    }
</style>