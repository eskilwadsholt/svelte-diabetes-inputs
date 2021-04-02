<script lang="ts">
    const path = "M9.44 21.92A11 11 0 1 0 30.56 21.92M21 5S16.9 9.2 14.8 12S10.42 18.56 9.44 21.92M12.79 22.83C13.77 19.57 15.5 16.9 17.6 14.1M21 5S22 9 24 12S29.58 18.56 30.56 21.92";
    export let thickness = "1.5px";
</script>

<svg viewBox="-5 -4 50 50" stroke-width={thickness}>
    <path d={path}></path>
</svg>

<style>
    path {
        stroke: white;
        fill: none;
    }

    svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--bg-logo);
    }
</style>