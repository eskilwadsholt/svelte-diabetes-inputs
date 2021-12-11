<script lang="ts">
    import Fraction from "../Fraction.svelte";
    import LogoHeader from "../LogoHeader.svelte";
    import PumpLogo from "../Logos/PumpLogo.svelte";
import NumberField from "../NumberField.svelte";
    import Numpad from "../Numpad.svelte";
    
    let rate = "";
</script>

<main>
    <LogoHeader caption="Temp<br>Background">
        <PumpLogo thickness="2px"/>
    </LogoHeader>
    <NumberField value={rate} maxVal={5} decimals={3}>
        <div slot="unit">
            <Fraction numerator={rate == "1" ? "unit" : "units"} denominator="hour"/>
        </div>
    </NumberField>
    <Numpad bind:value={rate} maxVal={5} decimals={3}>
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