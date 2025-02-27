import { scan_qr } from "./utils.js"

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 

docReady(function() {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    function onScanSuccess(qrCodeMessage) {
        if (qrCodeMessage !== lastResult) {
            ++countResults;
            lastResult = qrCodeMessage;
            console.log(qrCodeMessage);
            setInterval(scan_qr(qrCodeMessage),1);
            // resultContainer.innerHTML += `<div>[${countResults}] - ${qrCodeMessage}</div>`;
        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
});