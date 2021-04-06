<script lang="ts">
	import BgInput from "./Inputs/BGInput.svelte";
	import PlusButton from "./PlusButton.svelte";
	import ToolButton from "./ToolButton.svelte";
	import NoteInput from "./Inputs/NoteInput.svelte";
	import InsulinInputs from "./Inputs/InsulinInputs.svelte";
	import FoodInputs from "./Inputs/FoodInputs.svelte";
	import BGlogo from "./Logos/BGlogo.svelte";
	import PumpLogo from "./Logos/PumpLogo.svelte";
	import MealLogo from "./Logos/MealLogo.svelte";
	import NotesLogo from "./Logos/NotesLogo.svelte";
	import Cart from "./Cart/Cart.svelte";

	let menuOpen:boolean = true;
	let toolActive = -1;

	function SelectTool(i:number) : void {
		toolActive = i;
	}
</script>

<main>
	<div class="top">
		{#if toolActive == 1}
			<BgInput/>
		{:else if toolActive == 2}
			<InsulinInputs/>
		{:else if toolActive == 3}
			<FoodInputs/>
		{:else if toolActive == 4}
			<NoteInput/>
		{/if}
		<Cart/>
	</div>
	<div class="bottom">
		<div class="menu-folder" class:menuOpen>
			<ToolButton on:clicked={() => SelectTool(4)} highlight={toolActive == 4}>
				<div class="logo"><NotesLogo/></div>
			</ToolButton>
			<ToolButton on:clicked={() => SelectTool(3)} highlight={toolActive == 3}>
				<div class="logo"><MealLogo/></div>
			</ToolButton>
			<ToolButton on:clicked={() => SelectTool(1)} highlight={toolActive == 1}>
				<div class="logo"><BGlogo/></div>
			</ToolButton>
			<ToolButton on:clicked={() => SelectTool(2)} highlight={toolActive == 2}>
				<div class="logo"><PumpLogo/></div>
			</ToolButton>
			<PlusButton on:clicked={() => SelectTool(-1)} bind:on={menuOpen}/>
		</div>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&display=swap');
	:global(*) {
		font-family: "Quicksand", sans-serif;
	}

	.logo {
		width: 65px;
		height: 65px;
		border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
	}

	.menu-folder {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 80px;
		transition: 200ms;
	}

	.menu-folder.menuOpen {
		width: 0;
		height: 0;
	}

	.top {
		position: absolute;
		width: 100%;
		top: 0;
		height: calc(100% - 80px);
		background: #666;
	}

	.bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 80px;
		bottom: 0;
		background: #555;
		z-index: 1;
	}

	main {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 375px;
		height: 545px;
		background: #666;
		color: #FFF;
		box-shadow: 0 0 5px #FFF;
		overflow: hidden;
	}
</style>