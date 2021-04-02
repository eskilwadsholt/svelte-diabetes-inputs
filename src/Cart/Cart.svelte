<script lang="ts">
    import BGlogo from '../Logos/BGlogo.svelte';
    import MealLogo from '../Logos/MealLogo.svelte';
    import NotesLogo from '../Logos/NotesLogo.svelte';
    import PumpLogo from '../Logos/PumpLogo.svelte';
    import { cart, currentItem } from '../Stores/stores';

    $: console.debug($cart);

    let folded = true;

    $: if ($cart.length > 0) folded = false;
</script>

{#if $cart.length > 0}
<div class="cart" class:folded on:click={() => folded = !folded}>
    {#each $cart as item}
        <div class="item">
            <div class="primary">
                <div class="logo">
                    {#if item.type == "BG"}
                        <BGlogo thickness={"2px"}/>
                    {:else if ["bolus", "temp basal"].includes(item.type)}
                        <PumpLogo thickness={"2px"}/>
                    {:else if item.type == "meal"}
                        <MealLogo thickness={"2px"}/>
                    {:else if item.type == "note"}
                        <NotesLogo thickness={"2px"} background="#444"/>
                    {/if}
                </div>
                <div class="value">
                    {item.value}
                </div>
            </div>
            <div class="secondary">
                {#if item.upeffect}
                    <div class="upeffect">
                        {item.upeffect}
                    </div>
                    <svg width="0.35em" height="0.7em" viewBox="0 0 40 80">
                        <path class="uparrow"
                            d="M20 5l0 75M20 5l-20 20M20 5l20 20"
                        ></path>
                    </svg>
                {/if}
                {#if item.downeffect}    
                    <div class="downeffect">
                        {item.downeffect}
                    </div>
                    <svg width="0.35em" height="0.7em" viewBox="0 0 40 80">
                        <path class="downarrow"
                            d="M20 5l0 75l-20 -20M20 80l20 -20"
                        ></path>
                    </svg>
                {/if}
                {#if item.duration}
                    <div class="duration">
                        {item.duration}
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>
{/if}

<style>
    .primary, .secondary {
        display: flex;
        align-items: center;
    }

    .cart {
        position: absolute;
        top: 0;
        right: 0;
        background: #555;
        padding: 5px;
        border-radius: 0 0 0 5px;
        transition: 400ms;
    }

    .cart.folded {
        transform: translate(calc(100% - 33px));
    }

    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
    }

    .logo {
        width: 25px;
        height: 25px;
    }

    .value, .upeffect, .downeffect, .duration {
        margin-left: 5px;
        font-size: 1em;
        color: #FFF8;
    }

    .duration {
        color: #8888;
    }

    .upeffect, .uparrow {
        color: #8F88;
        stroke: #8F88;
        stroke-width: 10px;
        fill: none;
    }

    .downeffect, .downarrow {
        color: #F888;
        stroke: #F888;
        stroke-width: 10px;
        fill: none;
    }
</style>