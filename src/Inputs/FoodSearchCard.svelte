<script lang="ts">
    export let food;
    export let light = false;
</script>

<div class="food-card" class:light>
    <div class="details">
        <div class="food-name">{food.food}</div>
        <div class="food-stats">
            <div class="value carbs">
                <div class="title">Carbs</div>
                <div>
                    {Number(food.carbs).toFixed(0)}g
                </div>
            </div>
            <div class="value cals">
                <div class="title">Cals</div>
                <div>
                    {Number(food.cals).toFixed(0)}k
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .value {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        color: #AAA;
    }

    .food-card {
        display: flex;
        align-items: center;;
        border-radius: 100px;
        margin: 2px;
        background: var(--food-card);
        box-shadow: 0 0 5px #FFF8;
        color: #FFF;
    }

    .details {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        padding: 3px 10px;
    }

    .light {
        background: var(--food-card-light);
    }

    .food-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1em;
    }
    
    .food-stats {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.8em;
        color: white;
        width: 28%;
    }
</style>