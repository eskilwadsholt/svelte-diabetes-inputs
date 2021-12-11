<script lang="ts">
    import { swipeable } from '../events';
    import { cubic } from '../smoothing';

    export let element;
    export let scrollY;

    export const scroller = (top:number, duration:number = 100) => {
        const start = Date.now();
        let t = 1;
        const distance = top - element.scrollTop;

        function animationStep() {
            t = 1 - (Date.now() - start) / duration;

            if (t > 0) {
                element.scrollTop = top - cubic(t) * distance;
                setTimeout(animationStep, 30);
            }
            else {
                element.scrollTop = top;
            }
        }
        
        animationStep();
    }
</script>

<div class="food-list"
    use:swipeable={{ blocking: false }}
    on:click
    bind:this={element}
    on:scroll={() => scrollY = element.scrollTop}
    on:swipeLeft
    on:swipeRight
    on:swipeEnd>
    <slot></slot>
</div>

<style>
    .food-list {
        position: relative;
        box-sizing: border-box;
        border-radius: 18px;
        width: 90%;
        height: 100%;
        font-size: 1em;
        background: #555;
        box-shadow: 0 0 10px #FFF8;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
        margin: 5px;
        margin-bottom: 15px;
        scroll-behavior: smooth;
    }
</style>