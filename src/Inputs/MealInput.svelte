<script lang="ts">
    import { debug } from "svelte/internal";
import LogoHeader from "../LogoHeader.svelte";
    import MealLogo from "../Logos/MealLogo.svelte";
    import Submit from "../Submit.svelte";

    $: details = {
        time: Date.now(),
        value: (22.3).toFixed(1),
        upeffect: (22.3 * 0.23).toFixed(1),
    }

    $: item = {
        type: "meal",
        time: Date.now(),
        value: (22.3).toFixed(1),
        upeffect: (22.3 * 0.23).toFixed(1),
    }
</script>

<Submit {item} on:submitted={() => console.debug("submitted callback not implemented")}>
<main>
    <LogoHeader caption="Meal">
        <MealLogo thickness="2px"/>
    </LogoHeader>
</main>
</Submit>
    
<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
</style>