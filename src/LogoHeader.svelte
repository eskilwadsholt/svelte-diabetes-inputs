<script lang="ts">
    export let caption:string;
</script>

<div class="header">
    <div class="logo">
        <slot></slot>
    </div>
    <h1>{@html caption}</h1>
</div>

<style>
    h1 {
        font-size: 1.3em;
        text-align: center;
    }

    .header {
        position: relative;
        margin-top: 20px;
    }

    .logo {
        width: 45px;
        height: 45px;
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translate(-100%, -50%);
    }
</style>