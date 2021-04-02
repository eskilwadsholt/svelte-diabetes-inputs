<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
    import PumpLogo from "../Logos/PumpLogo.svelte";
</script>

<main>
    <LogoHeader caption="Basal Pattern">
        <PumpLogo/>
    </LogoHeader>
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