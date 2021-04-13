<script lang="ts">
import UpArrow from "./UpArrow.svelte";

    export let color = "var(--downarrow)";
</script>

<div class="downarrow">
    <UpArrow {color}/>
</div>

<style>
    .downarrow {
        transform: rotate(180deg);
    }
</style>