<script lang="ts">
    export let food;
    export let light = false;
</script>

<div class="food-card" class:light>
    <div class="food-name">{food.food}</div>
    <div class="food-stats">
        <div class="quantity">100g</div>
        <div class="carbs">Carbs: {food.carbs}g</div>
        <div class="cals">Cals: {Number(food.cals).toFixed(0)}</div>
    </div>
</div>

<style>
    .food-card {
        display: flex;
        flex-direction: column;
        padding: 3px 10px;
        border-radius: 10px;
        margin: 1px;
        background: var(--food-card);
        flex-grow: 1;
    }

    .light {
        background: var(--food-card-light);
    }

    .food-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1em;
        color: black;
    }
    
    .food-stats, .quantity {
        border-radius: 0 0 10px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.8em;
        color: #777;
    }
</style>