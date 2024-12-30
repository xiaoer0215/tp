document.getElementById('upload-form').onsubmit = function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('image-input');
    const formData = new FormData();

    formData.append('file', fileInput.files[0]);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const linkContainer = document.getElementById('link-container');
        document.getElementById('image-link').value = data.url;
        linkContainer.style.display = 'block';
    })
    .catch(error => {
        console.error('上传失败:', error);
    });
};

function embedCode() {
    const imageLink = document.getElementById('image-link').value;
    const embedCode = `<img src="${imageLink}" alt="Uploaded Image">`;
    document.getElementById('embed-code').value = embedCode;
}
