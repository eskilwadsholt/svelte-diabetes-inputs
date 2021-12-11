<script lang="ts">
    import FoodDBinput from "./FoodDBinput.svelte";
    import MealInput from "./MealInput.svelte";
    import PageSelector from "../PageSelector.svelte";
</script>

<main>
    <PageSelector ID="Food Inputs" pages={[ MealInput, FoodDBinput ]}/>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>