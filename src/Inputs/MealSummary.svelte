<script lang="ts">
    import MealLogo from "../Logos/MealLogo.svelte";
    import UpArrow from "../Logos/UpArrow.svelte";
    export let stats;
</script>

<main>
    <div class="total-vals">
        <div class="logo">
            <MealLogo/>
        </div>
        <div class="value carbs">
            <div class="title">Carbs</div>
            <div>
                {stats.carbs.toFixed(0)}g
            </div>
        </div>
        <div class="value cals">
            <div class="title">Cals</div>
            <div>
                {stats.cals.toFixed(0)}k
            </div>
        </div>
        <div class="value effect">
            <div class="title">mmol/L</div>
            <div class="upeffect">
                {stats.effect.toFixed(1)}
                <div class="uparrow">
                    <UpArrow/>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .logo {
        width: 45px;
        height: 45px;
    }

    .uparrow {
        width: 0.55em;
        height: 0.7em;
    }

    .upeffect {
        display: flex;
        align-items: center;
    }

    main {
        border-radius: 20px;
        width: 70%;
        font-size: 1.3em;
        padding: 5px 8px;
        background: #0008;
        box-shadow: 0 0 10px #FFF8;
    }

    .total-vals {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .value {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        font-size: 0.8em;
        color: #888;
    }
</style>