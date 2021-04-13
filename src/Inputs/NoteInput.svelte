<script lang="ts">
    import LogoHeader from "../LogoHeader.svelte";
    import NotesLogo from "../Logos/NotesLogo.svelte";
    import { swipeable } from "../events";

    $: item = {
        type: "note",
        time: Date.now(),
        value: "note",
    }

    const swipeOptions = {
        minSwipe: 20,
        target: {
            up: 200,
            down: 300,
            left: 150,
            right: 350,
        },
        ratio: 3,
    }
</script>

<main use:swipeable={swipeOptions}>
    <LogoHeader caption="Notes">
        <NotesLogo background="#444" thickness={"2px"}/>
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