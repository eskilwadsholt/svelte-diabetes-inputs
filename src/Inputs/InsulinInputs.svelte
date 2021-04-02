<script lang="ts">
    import BasalPatternInput from "./BasalPatternInput.svelte";
    import BolusInput from "./BolusInput.svelte";
    import TempBasalInput from "./TempBasalInput.svelte";

    import PageSelector from "../PageSelector.svelte";
</script>
    
<main>
    <PageSelector pages={[ BolusInput, TempBasalInput, BasalPatternInput ]}/>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>