<script lang="ts">
    const path = "M8 11q0 -4 4 -4l16 0q4 0 4 4l0 22q0 4 -4 4l-16 0q-4 0 -4 -4l0 -22M20 26L20 34M16 30L24 30M17 7l0 -3l6 0l0 3m-3 -3l0 -6M12 11l16 0l0 12l-16 0l0 -12";
</script>

<svg viewBox="-5 -4 50 50">
    <path d={path}></path>
</svg>

<style>
    path {
        stroke: white;
        stroke-width: 1.5px;
        fill: none;
    }

    svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--pump-logo);
    }
</style>