<script lang="ts">
    import { carbRatio } from "../data/data";
    import { foods } from "../data/food-suggestions";
    import FoodSearchCard from "./FoodSearchCard.svelte";
    import { createEventDispatcher } from "svelte";
    import FoodList from "./FoodList.svelte";
    import { searches } from "../Stores/stores";
    import { onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleCloseBtn(e) {
        e.preventDefault();
        dispatch('close');
    }

    let field;

    onMount(() => {
        field.focus();
    });
    
    let search = "";
    let filteredFoods = [];
    let show = 10;
    let placeholder="Search food ...";

    $: if (search) {
        let base = search[0];

        if (!searches[base]) {
            console.debug(`Creating search "${base}"`);
            const start = performance.now();
            searches[base] = foods.filter(x => hasPhrase(x.food, base));
            console.debug(`Filtering took ${performance.now() - start} ms`);
            console.debug(searches[base].length);
        }

        let key = '';
        let partialFilter;

        search.split('').forEach(x => {
            key += x;

            if (!searches[key]) {
                console.debug(`Creating search "${key}"`);
                const start = performance.now();
                searches[key] = partialFilter.filter(x => hasPhrase(x.food, key));
                console.debug(`Filtering took ${performance.now() - start} ms`);
                console.debug(searches[key].length);
            }
            
            partialFilter = searches[key];
        });

        filteredFoods = partialFilter;

        show = 10;
        foodList.scrollTop = 0;
    } else filteredFoods = [];

    function hasPhrase(text: string, phrase: string) {
        return text.toLowerCase().includes(phrase.toLowerCase());
    }

    function computeEffect(f) {
        return Number(f.carbs) * carbRatio;
    }

    console.debug(`${foods.length} food items.`);

    let foodList, scrollY;

    $: if (foodList && scrollY && foodList.scrollTop + foodList.clientHeight * 1.5 > foodList.scrollHeight) {
        if (show < filteredFoods.length) {
            show += 10;
            console.debug(`Show up to ${show} items`);
        }
    }
    
    function chooseFood(food) {
        dispatch("chooseFood", { food });
    }
</script>

<input type="text" {placeholder} bind:value={search} bind:this={field}/>
<div class="counter">{filteredFoods.length} match{filteredFoods.length == 1 ? "" : "es"}</div>
<FoodList
    on:swipeLeft
    on:swipeRight
    on:swipeEnd
    bind:element={foodList}
    bind:scrollY>
    {#if search && foods}
        {#each filteredFoods as f, i}
            {#if i < show}
            <div on:click={() => chooseFood(f)}>
                <FoodSearchCard food={{ ...f, effect: computeEffect(f) }} light={i % 2 == 1}/>
            </div>
            {/if}
        {/each}
    {/if}
</FoodList>
<div class="minus-food" on:click={handleCloseBtn}>
    <svg viewBox="-5 -4 50 50">
        <path
            stroke="white"
            stroke-width="6px"
            d="M8 20l24 0M20 8l0 24"
        ></path>
    </svg>
</div>
<div class="keyboard-space"></div>
    
<style>
    .keyboard-space {
        height: 80%;
    }

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

    .counter {
        font-size: 0.9em;
        color: #FFF8;
        margin: 8px;
    }
</style>