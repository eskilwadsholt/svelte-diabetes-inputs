<script lang="ts">
    export let content;
    export let depth = 0;

    const maxdepth = 0;
    const maxItems = 2;

    const isNull = content === null;
    const isDate = content instanceof Date;
    const isObject = typeof content === "object" && !isNull && !isDate;
    const isArray = Array.isArray(content);
    const isString = typeof content === "string";
    const isNumber = Number(content) === content;

    let count, maxIndex;
    if (isObject) {
        count = isArray ? content.length: Object.entries(content).length;
        maxIndex = count - 1;
    }

/*    console.debug(`
    stringify: ${String(content)}
    isNull: ${isNull}
    isObject: ${isObject}
    isArray: ${isArray}
    isString: ${isString}
    isNumber: ${isNumber}
    `);*/
</script>

{#if isString}
    <div class="string">"{content}"</div>
{:else if isNumber}
    <div class="number">{content}</div>
{:else if isArray}
    <div class="array">
        {#if depth > maxdepth}
            {`[ ... ]`}
        {:else}
            {@html `(${count})&nbsp;[&nbsp;`}
                {#each content.slice(0, maxItems) as element, i}
                    <svelte:self content={element} depth={depth + 1}/>
                    {@html i === maxIndex ? '' : ',&nbsp;' }
                {/each}
                {#if maxIndex >= maxItems}
                {@html '&nbsp;...&nbsp;'}
                {/if}
            {@html '&nbsp;]'}
        {/if}
    </div>
{:else if isObject}
    <div class="object">
        {#if depth > maxdepth}
            {`{ ... }`}
        {:else}
        {@html `(${count})&nbsp;{&nbsp;`}
                {#each Object.entries(Object.entries(content).slice(0, maxItems)) as [ i, [key, value ]]}
                    <div class="key">{key}{@html `:&nbsp;`}</div>
                    <svelte:self content={value} depth={depth + 1}/>
                    {@html Number(i) === maxIndex ? '' : ',&nbsp;' }
                {/each}
                {#if maxIndex >= maxItems}
                {@html '&nbsp;...&nbsp;'}
                {/if}
            {@html '&nbsp;}'}
        {/if}
    </div>
{:else}
    <div class="other">{String(content)}</div>
{/if}

<style>
    .string {
        color: var(--string-color);
    }

    .number {
        color: var(--number-color);
    }

    .array {
        display: flex;
        color: white;
    }

    .object {
        display: flex;
        flex-wrap: wrap;
        color: white;
    }

    .key {
        color: var(--key-color);
        font-weight: 600;
    }

    .other {
        color: var(--other-color);
    }
</style>