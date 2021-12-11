import { writable } from 'svelte/store';

export const searches = writable({});
export const cart = writable([]);
export let lastBG = writable(null);
export let canSubmit = writable(false);
export let submitter = writable(null);

type BolusPattern = any;

type Latest = {
    BG?: number;
    bolus?: { list: Array<number>, total: number };
    temp?: number;
    pattern?: BolusPattern;
    meals: { list: Array<any>, total: number };
    canSubmit: boolean;
    submit: Function;
    reset: Function;
}

export let latest = writable(<Latest>{});

reset();

function reset() {
    latest.set({
        BG: null,
        bolus: { list: [], total: null },
        temp: null,
        pattern: null,
        meals: { list: [], total: null },
        canSubmit: false,
        submit: null,
        reset,
    });
}

export function formatTime(time:Date): string {
    const hh = time.getHours();
    const mm = time.getMinutes();
    const ss = time.getSeconds();
    const display:string = (hh < 10 ? '0' + hh : hh) + ':' +
                    (mm < 10 ? '0' + mm : mm) + ':' +
                    (ss < 10 ? '0' + ss : ss);
    return display;
}