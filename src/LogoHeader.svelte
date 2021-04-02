<script lang="ts">
    export let caption:string;
</script>

<div class="header">
    <div class="logo">
        <slot></slot>
    </div>
    <h1>{caption}</h1>
</div>

<style>
    h1 {
        font-size: 1.5em;
    }

    .header {
        position: relative;
    }

    .logo {
        width: 35px;
        height: 35px;
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translate(-100%, -50%);
    }
</style>