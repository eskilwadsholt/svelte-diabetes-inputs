<script>
    const path = "M6 9q0 -4 4 -4l16 0q4 0 4 4l0 0m0 18l0 4q0 4 -4 4l-16 0q-4 0 -4 -4l0 -22M11 11l12 0M11 16l9 0M11 21l2 0M11 26l5 0M32 12l-12 16l-0.2 3.6l3.4-1.2l1.2 -1.6l-3.2 -2.4M32 12l3.2 2.4l-12 16M32 12l2.4 -3.2l3.2 2.4l-2.4 3.2";

    export let background = null;
    export let thickness = "1.5px";
</script>

<svg viewBox="-5 -4 50 50"
    stroke-width={thickness}
    style={`background:${background}`} class:default={background == null}>
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
    }

    svg.default {
        background: var(--notes-logo);
    }
</style>