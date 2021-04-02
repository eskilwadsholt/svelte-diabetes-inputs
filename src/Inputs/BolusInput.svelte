<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
    import PumpLogo from "../Logos/PumpLogo.svelte";
    import Numpad from "../Numpad.svelte";
    import Submit from "../Submit.svelte";
    
    let value = "";

    $: item = {
        type: "bolus",
        time: Date.now(),
        value: value,
        downeffect: (Number(value) * 5).toFixed(1),
    }

    $: canSubmit = /^\d+\.*\d*$/.test(value);
</script>

<Submit {item} {canSubmit} on:submitted={() => value = ""}>
<main>
    <LogoHeader caption="Bolus">
        <PumpLogo thickness="2px"/>
    </LogoHeader>
    <Numpad bind:value maxVal={10}>
        <div slot="unit">
            {value == "1" ? "unit" : "units"}
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