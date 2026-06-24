const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form .generate-btn"), // Sửa lại class để chọn đúng nút
qrImg = wrapper.querySelector(".qr-code img"),
downloadBtn = wrapper.querySelector(".download-btn"); // Gọi nút download

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});

// Logic tải ảnh xuống thiết bị
downloadBtn.addEventListener("click", async () => {
    let imgUrl = qrImg.src;
    if(!imgUrl) return;

    downloadBtn.innerText = "Đang tải...";
    
    try {
        // Fetch ảnh dưới dạng Blob để ép trình duyệt tải file
        const response = await fetch(imgUrl);
        const file = await response.blob();
        
        // Tạo một thẻ <a> ảo để kích hoạt download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = `QR_Code_${new Date().getTime()}.png`; // Đặt tên file tải xuống
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        downloadBtn.innerText = "Tải xuống QR Code";
    } catch (error) {
        alert("Lỗi: Không thể tải xuống hình ảnh!");
        downloadBtn.innerText = "Tải xuống QR Code";
    }
});