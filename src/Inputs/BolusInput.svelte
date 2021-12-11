<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
    import PumpLogo from "../Logos/PumpLogo.svelte";
    import Numpad from "../Numpad.svelte";
    import { insulinRatio } from "../data/data";
    import NumberField from "../NumberField.svelte";
    import { latest, formatTime } from "../Stores/stores";
    
    let value = "";

    const getItem = () => {
        const time = new Date();
        const display = formatTime(time);
        return {
            type: "bolus",
            time,
            display,
            value,
            downeffect: (Number(value) * insulinRatio),
        }
    }

    $: $latest.canSubmit = /^\d+\.*\d*$/.test(value);

    $latest.submit = () => {
        const item = getItem();
        $latest.bolus.list.push(item);
        if (!$latest.bolus.total) { 
            $latest.bolus.total = 0;
        }
        $latest.bolus.total += Number(item.downeffect);
        value = "";
    }

    $: { 
        console.debug("Lasest boluses:");
        console.debug($latest.bolus.list);
    }
</script>

<main>
    <LogoHeader caption="Insulin">
        <PumpLogo thickness="2px"/>
    </LogoHeader>
    <NumberField {value} maxVal={10}>
        <div slot="unit">
            {value == "1" ? "unit" : "units"}
        </div>
    </NumberField>
    <Numpad bind:value maxVal={10}>
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