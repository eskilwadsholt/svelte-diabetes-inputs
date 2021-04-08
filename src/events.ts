interface SwipeOptions {
    start:number;
    target:{
        up:number;
        down:number;
        left:number;
        right:number
    };
    ratio:number;
    clamp:boolean;
}

enum Direction {
    None, Up, Down, Left, Right
}

function clamp(val, min, max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

export function swipeable(node, options:SwipeOptions) {
    let direction = Direction.None;
    let touch;
    let startX;
	let startY;
    let dragX;
    let dragY;
    let drag;
    let dist;
    let detail;

	function handleStart(event) {
        console.debug("Swipe start");

        touch = event.touches[0];
		startX = touch.pageX;
		startY = touch.pageY;

        node.dispatchEvent(new CustomEvent('swipeStart', {
			detail: { dir: "None", x: startX, y: startY }
		}));

		window.addEventListener('touchmove', handleMove);
		window.addEventListener('touchend', handleEnd);
	}

    function handleMove(event) {
        touch = event.touches[0];
		dragX = touch.pageX - startX;
		dragY = touch.pageY - startY;
        dist = Math.sqrt(dragX**2 + dragY**2);

        // Determine direction if any
        if (direction == Direction.None) {
            if (dist > options.start) {
                if (Math.abs(dragY) > options.ratio * Math.abs(dragX)) {
                    if (dragY < 0) direction = Direction.Up;
                    else direction = Direction.Down;
                } else if (Math.abs(dragX) > options.ratio * Math.abs(dragY)) {
                    if (dragX < 0) direction = Direction.Left;
                    else direction = Direction.Right;
                }
            }
        }

        // Pack details if direction has been determined
        switch (direction) {
            case Direction.Up: {
                if (options.clamp) drag = clamp(-dragY, 0, options.target.up);
                else drag = -dragY;

                detail = {
                    dir: "Up",
                    drag,
                    progress: drag / options.target.up,
                }
                break;
            }
            case Direction.Down: {
                if (options.clamp) drag = clamp(dragY, 0, options.target.down);
                else drag = dragY;

                detail = {
                    dir: "Down",
                    drag,
                    progress: drag / options.target.down,
                }
                break;
            }
            case Direction.Left: {
                if (options.clamp) drag = clamp(-dragX, 0, options.target.left);
                else drag = -dragX;

                detail = {
                    dir: "Left",
                    drag,
                    progress: drag / options.target.left,
                }
                break;
            }
            case Direction.Right: {
                if (options.clamp) drag = clamp(dragX, 0, options.target.right);
                else drag = dragX;

                detail = {
                    dir: "Right",
                    drag,
                    progress: drag / options.target.right,
                }
                break;
            }
        }

        if (direction != Direction.None) {
            node.dispatchEvent(new CustomEvent("swipe" + detail.dir, { detail }));
            console.debug(`${detail.dir}: ${detail.drag} (${(100 * detail.progress).toFixed(1)}%)`);
        }
    }

    function handleEnd() {
        direction = Direction.None;
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
    }

    node.addEventListener('touchstart', handleStart);

    return {
		destroy() {
			node.removeEventListener('touchstart', handleStart);
		}
	};
}