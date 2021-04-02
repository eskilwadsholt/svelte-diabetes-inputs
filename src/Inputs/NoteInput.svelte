<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
import NotesLogo from "../Logos/NotesLogo.svelte";
</script>

<main>
    <LogoHeader caption="Notes">
        <NotesLogo background="#444"/>
    </LogoHeader>
</main>

<style>
    main {
        display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
</style>