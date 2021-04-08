<script lang="ts">
    import BGlogo from '../Logos/BGlogo.svelte';
    import MealLogo from '../Logos/MealLogo.svelte';
    import NotesLogo from '../Logos/NotesLogo.svelte';
    import PumpLogo from '../Logos/PumpLogo.svelte';
    import UpArrow from '../Logos/UpArrow.svelte';
    import { cart } from '../Stores/stores';

    $: console.debug($cart);

    let folded = true;

    $: if ($cart.length > 0) folded = false;
</script>

{#if $cart.length > 0}
<div class="cart" class:folded on:click={() => folded = !folded}>
    <div class="extra-space"></div>
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
                    <div class="uparrow">
                        <UpArrow/>
                    </div>
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
    <div class="extra-space"></div>
</div>
{/if}

<style>
    * {
        transition: 400ms;
    }
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
        box-shadow: 0 0 10px #FFF8;
    }

    .cart.folded {
        transform: translate(calc(100% - 30px));
        padding: 2px;
    }

    .cart.folded > .item {
        height: 10px;
    }

    .extra-space {
        height: 0;
    }

    .cart.folded > .extra-space {
        height: 7px;
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

    .upeffect {
        color: var(--uparrow);
    }

    .uparrow {
        width: 0.55em;
        height: 0.7em;
    }

    .downeffect, .downarrow {
        color: var(--downarrow);
        stroke: var(--downarrow);
        stroke-width: 10px;
        fill: none;
    }
</style>