<script lang="ts">
    import Fraction from "../Fraction.svelte";
    import LogoHeader from "../LogoHeader.svelte";
    import BGlogo from "../Logos/BGlogo.svelte";
    import Numpad from "../Numpad.svelte";

    let value = "";
</script>

<main>
    <LogoHeader caption="Blood Sugar">
        <BGlogo/>
    </LogoHeader>
    <Numpad bind:value>
        <div slot="unit">
            <Fraction numerator="mmol" denominator="L"/>
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