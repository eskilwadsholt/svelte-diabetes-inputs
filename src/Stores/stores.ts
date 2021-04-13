import { writable } from 'svelte/store';

export const cart = writable([]);
export let lastBG = writable(null);
export let canSubmit = writable(false);
export let submitter = writable(null);

export let latest = writable({
    BG: null,
    bolus: { list: [], total: null },
    temp: null,
    pattern: null,
    meals: { list: [], total: null },
    canSubmit: false,
    submit: null,
    reset,
});

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

export function formatTime(time) {
    const hh = time.getHours();
    const mm = time.getMinutes();
    const ss = time.getSeconds();
    const display = (hh < 10 ? '0' + hh : hh) + ':' +
                    (mm < 10 ? '0' + mm : mm) + ':' +
                    (ss < 10 ? '0' + ss : ss);
    return display;
}