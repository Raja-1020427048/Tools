document.getElementById("compressionLevel").addEventListener("input", function() {
    document.getElementById("compressionValue").innerText = this.value + "%";
});

document.getElementById("compressBtn").addEventListener("click", function() {
    const input = document.getElementById("imageInput").files[0];
    const quality = document.getElementById("compressionLevel").value / 100;

    if (!input) {
        alert("Please upload an image first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Compress and download
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
            const downloadLink = document.getElementById("downloadLink");
            downloadLink.href = compressedDataUrl;
            downloadLink.download = "compressed-image.jpg";
            downloadLink.style.display = "block";
            downloadLink.innerText = "Download Compressed Image";
        };
    };
    reader.readAsDataURL(input);
});
