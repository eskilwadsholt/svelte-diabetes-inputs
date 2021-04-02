<script lang="ts">
    import Fraction from "../Fraction.svelte";
    import LogoHeader from "../LogoHeader.svelte";
    import PumpLogo from "../Logos/PumpLogo.svelte";
    import Numpad from "../Numpad.svelte";
    import Submit from "../Submit.svelte";
    
    let rate = "";

    $: item = {
        type: "temp basal",
        time: Date.now(),
        value: rate,
        duration: "4h",
    }

    $: canSubmit = /^\d+\.*\d*$/.test(rate);
</script>

<Submit {item} {canSubmit} on:submitted={() => rate = ""}>
<main>
    <LogoHeader caption="Temp Basal">
        <PumpLogo thickness="2px"/>
    </LogoHeader>
    <Numpad bind:value={rate} maxVal={5} decimals={3}>
        <div slot="unit">
            <Fraction numerator={rate == "1" ? "unit" : "units"} denominator="hour"/>
        </div>
    </Numpad>
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