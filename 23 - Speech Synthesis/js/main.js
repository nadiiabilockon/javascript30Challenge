const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function populatesVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => {
            let voiceName = voice.name;
            if (voice.name.length > 30) {
                voiceName = voice.name.split('-')[0]
            }
            return `<option value="${voice.name}">${voiceName}(${voice.lang})</option>`
        })
        .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value)
    toggle()
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg)
    }
}

function setOption() {
    msg[this.name] = this.value;
    toggle()
}

speechSynthesis.addEventListener('voiceschanged', populatesVoices)
voicesDropdown.addEventListener('change', setVoice);

options.forEach(option => option.addEventListener('change', setOption))

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false))