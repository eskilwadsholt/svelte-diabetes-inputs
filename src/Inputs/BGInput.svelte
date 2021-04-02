<script lang="ts">
    import Fraction from "../Fraction.svelte";
    import LogoHeader from "../LogoHeader.svelte";
    import BGlogo from "../Logos/BGlogo.svelte";
    import Numpad from "../Numpad.svelte";
    import Submit from "../Submit.svelte";

    let value = "";

    $: item = {
        type: "BG",
        time: Date.now(),
        value: value,
    }

    $: canSubmit = /^\d+\.*\d*$/.test(value);
</script>

<Submit {item} {canSubmit} on:submitted={() => value = ""}>
    <main>
        <LogoHeader caption="Blood Sugar">
            <BGlogo thickness="2px"/>
        </LogoHeader>
        <Numpad bind:value>
            <div slot="unit">
                <Fraction numerator="mmol" denominator="L"/>
            </div>
        </Numpad>
    </main>
</Submit>

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