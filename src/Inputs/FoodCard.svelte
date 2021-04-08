<script lang="ts">
    import UpArrow from "../Logos/UpArrow.svelte";
    export let food;
    export let light = false;
</script>

<div class="food-card" class:light>
    <div class="amount">
        {#if food.amount}
            {food.amount}g
        {:else}
            100g
        {/if}
    </div>
    <div class="details">
        <div class="food-name">{food.food}</div>
        <div class="food-stats">
            <div class="value carbs">
                <div>
                    {Number(food.carbs).toFixed(1)}g
                </div>
                <div class="title">Carbs</div>
            </div>
            <div class="value cals">
                <div>
                    {Number(food.cals).toFixed(0)}
                </div>
                <div class="title">Cals</div>
            </div>
            <div class="value effect">
                <div class="upeffect">
                    {Number(food.effect).toFixed(1)}
                    <div class="uparrow">
                        <UpArrow color="var(--dark-uparrow)"/>
                    </div>
                </div>
                <div class="title">mmol/L</div>
            </div>
        </div>
    </div>
</div>

<style>
    .uparrow {
        width: 0.55em;
        height: 0.7em;
    }

    .upeffect {
        color: var(--dark-uparrow);
        display: flex;
        align-items: center;
    }

    .value {
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 0.7em;
        color: #222;
        margin: 3px;
    }

    .food-card {
        display: flex;
        align-items: center;
        border-radius: 15px;
        margin: 2px;
        background: var(--food-card);
        box-shadow: 0 0 5px #FFF8;
        color: #BBB;
    }

    .amount {
        font-size: 1.2em;
        width: 3em;
        padding: 3px;
        border: 3px solid #555;
        border-style: inset;
        border-radius: 5px;
        margin: 5px;
        margin-left: 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: #FDB;
        color: #222;
    }

    .details {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 0 10px 0 5px;
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
        font-size: 1em;
    }
</style>