// src/audio/speech.js
export function speak(text, { rate = 0.85 } = {}) {
    return new Promise((resolve) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.lang = 'en-US';
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
    });
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function speakRepeated(text, times = 3, pauseMs = 400) {
    for (let i = 0; i < times; i++) {
        await speak(text);
        await delay(pauseMs);
    }
}