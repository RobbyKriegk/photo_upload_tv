

const fileInput = document.getElementById('fileInput');
const fullscreenContainer = document.getElementById('fullscreen-container');
const fullscreenImage = document.getElementById('fullscreen-image');
const uploadForm = document.getElementById('uploadForm');
let placeHolder = 'altow.png';




window.onload = () => {
    fetch('/request', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            fullscreenImage.src = data.url;
            console.log(data.url);
            showFullscreen();
            hideFileInput();
        })
        .catch(error => console.error('Error uploading file:', error))
    setInterval(() => location.reload(), 600 * 1000)
};






fileInput.addEventListener('change', handleFileSelect);



function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        setTimeout(() => location.reload, 500);
    }
}

function showFullscreen() {
    fullscreenContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

fullscreenContainer.addEventListener('click', hideFullscreen);

function hideFullscreen() {
    fullscreenContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
    showFileInput();
}

function hideFileInput() {
    fileInput.style.display = 'none';
}

function showFileInput() {
    fileInput.style.display = 'block';
}

