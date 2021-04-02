<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
    import NotesLogo from "../Logos/NotesLogo.svelte";
    import Submit from "../Submit.svelte";

    $: item = {
        type: "note",
        time: Date.now(),
        value: "note",
    }
</script>

<Submit {item}>
<main>
    <LogoHeader caption="Notes">
        <NotesLogo background="#444" thickness={"2px"}/>
    </LogoHeader>
</main>
</Submit>

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