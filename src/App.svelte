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
	import { swipeable } from "./events";
	import { latest } from "./Stores/stores";
import Latest from "./Latest.svelte";
import DownArrow from "./Logos/DownArrow.svelte";
import UpArrow from "./Logos/UpArrow.svelte";

	const swipeOptions = {
        minSwipe: 10,
        target: {
            up: 120,
            down: 300,
            left: 150,
            right: 350,
        },
        ratio: 3,
    }

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
	<div class="bottom" use:swipeable={swipeOptions} on:swipeUp on:swipeEnd>
		<div class="menu-folder" class:menuOpen>
			<ToolButton on:clicked={() => SelectTool(4)} highlight={toolActive == 4}>
				<div slot="logo" class="logo"><NotesLogo/></div>
			</ToolButton>
			<ToolButton on:clicked={() => SelectTool(3)} highlight={toolActive == 3}
				latest={$latest.meals.total}>
				<div slot="logo" class="logo"><MealLogo/></div>
				<div slot="latest">
					{$latest.meals.total ? $latest.meals.total.toFixed(1) : ""}
					<div class="arrow-size">
						<UpArrow/>
					</div>
				</div>
			</ToolButton>
			<ToolButton on:clicked={() => SelectTool(1)} highlight={toolActive == 1}
				latest={$latest.BG}>
				<div slot="logo" class="logo"><BGlogo/></div>
				<div slot="latest">{$latest.BG ? $latest.BG.value : ""}</div>
			</ToolButton>
			<ToolButton on:clicked={() => SelectTool(2)} highlight={toolActive == 2}
				latest={$latest.bolus.total}>
				<div slot="logo" class="logo"><PumpLogo/></div>
				<div slot="latest">
					{$latest.bolus.total ? $latest.bolus.total.toFixed(1) : ""}
					<div class="arrow-size">
						<DownArrow/>
					</div>
				</div>
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

	div[slot="latest"] {
		display:flex;
		align-items:center;
		width:fit-content;
	}
	
	.arrow-size {
		width:8px;
		padding-left:2px;
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