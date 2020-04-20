const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const effectBtns = document.querySelectorAll('.controls-btn-effect');
let intervalForVideoEffect;

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error('Something wrong with your camera')
        })
}

function paintToCanvas(filter) {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    intervalForVideoEffect = setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        switch (filter) {
            case 'red':
                pixels = redEffect(pixels);
                break;
            case 'rgb':
                pixels = rgbSplit(pixels);
                break;
            case 'greenScreen':
                ctx.globalAlpha = 0.1;
                pixels = greenScreen(pixels);
                break;
        }
        
        ctx.putImageData(pixels, 0, 0)
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    const length = pixels.data.length;
    for (let i = 0; i < length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5
    }
    return pixels
}

function rgbSplit(pixels) {
    const length = pixels.data.length;
    for (let i = 0; i < length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];
        pixels.data[i + 100] = pixels.data[i + 1];
        pixels.data[i - 150] = pixels.data[i + 2]
    }
    return pixels
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

function changeEffect(e) {
    clearInterval(intervalForVideoEffect)
    const btn = e.target;
    const effect = btn.dataset.effect;
    paintToCanvas(effect)
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

effectBtns.forEach(btn => {
    btn.addEventListener('click', changeEffect)
})
