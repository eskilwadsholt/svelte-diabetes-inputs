<script lang="ts">
    import Stringify from "./Stringify.svelte";

    export let content;

    let expand:boolean = false;

    const isNull = content === null;
    const isDate = content instanceof Date;
    const isObject = typeof content === "object" && !isNull && !isDate;
    const array = Array.isArray(content);
</script>

<main>
    {#if isObject}
        <div class="first-object-line" class:array>
            <div class="triangle" class:expand on:click={() => expand = ! expand}>
                <svg viewBox="-10 -5 30 30">
                    <path d="M0 0l0 20l10 -10l-10 -10"></path>
                </svg>
            </div>
            {#if expand}
            {array ? '[' : '{'}
            {:else}
            <Stringify {content}/>
            {/if}
        </div>
        {#if expand}
        <div class="object-content" class:array class:expand>
            {#each Object.entries(content) as [ key, val ]}
                <div class="entry">
                    <div class="key" class:array>
                        {key}:
                    </div>
                    <div class="val">
                        <svelte:self content={val}/>
                    </div>    
                </div>
            {/each}
        </div>
        <div class="end-bracket" class:array>
            {array ? ']' : '}'}
        </div>
        {/if}
    {:else}
        <div class="other">
            <Stringify {content}/>
        </div>
    {/if}
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .first-object-line {
        color: var(--object-color);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    path {
        fill: white;
    }

    .triangle {
        width: 20px;
        height: 20px;
    }

    .triangle.expand svg {
        transform: rotate(90deg);
    }

    .end-bracket {
        color: var(--object-color);
        margin-left: 21px;
        transform: translateY(-5px);
    }

    .array {
        color: var(--array-color);
    }

    .object-content {
        margin-left: 23px;
        border: none;
        border-left: 1px solid var(--object-color);
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: scaleY(0);
    }

    .object-content.array {
        border-left: 1px solid var(--array-color);
    }

    .object-content.expand {
        position: relative;
        transform: scaleY(1);
    }

    .entry {
        display: flex;
    }

    .key {
        margin-left: 10px;
        min-width: 50px;
        display: flex;
        color: var(--key-color);
        font-weight: 600;
    }

    .key.array {
        color: var(--array-key-color);
        min-width: 15px;
    }
</style>