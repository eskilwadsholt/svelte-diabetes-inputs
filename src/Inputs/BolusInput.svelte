<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
    import PumpLogo from "../Logos/PumpLogo.svelte";
    import Numpad from "../Numpad.svelte";

    let value = "";
</script>

<main>
    <LogoHeader caption="Bolus">
        <PumpLogo/>
    </LogoHeader>
    <Numpad bind:value maxVal={10}>
        <div slot="unit">
            {value == "1" ? "unit" : "units"}
        </div>
    </Numpad>
</main>
    
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