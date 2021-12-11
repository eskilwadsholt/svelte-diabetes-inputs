<script lang="ts">
    import Json from "../Json/Json.svelte";
import LogoHeader from "../LogoHeader.svelte";
import BGlogo from "../Logos/BGlogo.svelte";
    import NotesLogo from "../Logos/NotesLogo.svelte";
    import { latest } from '../Stores/stores';
</script>

<main>
    {#if $latest}
        <LogoHeader caption="Latest">
            <NotesLogo background="#444" thickness={"2px"}/>
        </LogoHeader>
        {#each Object.entries($latest) as [ category, content ]}
        <div class="title">{category}</div>
        <Json {content}/>
        {/each}
    {/if}
</main>

<style>
    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2em;
        background: #8888;
        width: 100%;
    }
    main {
        display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
</style>