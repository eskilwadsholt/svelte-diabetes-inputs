<script lang="ts">
    import Fraction from "../Fraction.svelte";
    import LogoHeader from "../LogoHeader.svelte";
    import BGlogo from "../Logos/BGlogo.svelte";
    import NumberField from "../NumberField.svelte";
    import Numpad from "../Numpad.svelte";
    import { latest, formatTime } from "../Stores/stores";

    let value = "";

    const getItem = () => {
        const time = new Date();
        const display = formatTime(time);
        console.debug(time);
        return {
            type: "BG",
            time,
            display,
            value,
        }
    }

    $: $latest.canSubmit = /^\d+\.*\d*$/.test(value);

    $latest.submit = () => {
        console.debug(getItem());
        $latest.BG = getItem();
        value = "";
    }

    $: { 
        console.debug("Last BG:");
        console.debug($latest.BG);
    }
</script>


<main>
    <LogoHeader caption="Blood Sugar">
        <BGlogo thickness="2px"/>
    </LogoHeader>
    <NumberField {value}>
        <div slot="unit">
            <Fraction numerator="mmol" denominator="L"/>
        </div>
    </NumberField>
    <Numpad bind:value>
    </Numpad>
</main>

<style>
    main {
        position: relative;
        display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
</style>