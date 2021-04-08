<script lang="ts">
    export let color = "var(--uparrow)";
</script>

<svg viewBox="-7 -7 54 94" stroke={color}>
    <path class="uparrow"
        d="M20 5l0 75M20 5l-20 20M20 5l20 20"
    ></path>
</svg>

<style>
    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    .uparrow {
        stroke-width: 14px;
        fill: none;
        stroke-linecap: round;
    }
</style>