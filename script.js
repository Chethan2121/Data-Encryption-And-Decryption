function encryptWithKey(text, key) {
    let result = '';
    const keyLength = key.length;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/i)) {
            const shift = key[i % keyLength].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
            const base = char.charCodeAt(0) < 91 ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            result += String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
        } else {
            result += char;
        }
    }
    return result;
}

function decryptWithKey(text, key) {
    let result = '';
    const keyLength = key.length;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/i)) {
            const shift = key[i % keyLength].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
            const base = char.charCodeAt(0) < 91 ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            result += String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
        } else {
            result += char;
        }
    }
    return result;
}

function downloadTextFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link); // Append link to body for Firefox compatibility
    link.click();
    document.body.removeChild(link); // Clean up
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadButton').onclick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt';
        fileInput.onchange = function() {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (document.title === "Encrypt Text") {
                        document.getElementById('encryptInput').value = e.target.result;
                    } else if (document.title === "Decrypt Text") {
                        document.getElementById('decryptInput').value = e.target.result;
                    }
                };
                reader.onerror = function() {
                    alert('Error reading file');
                };
                reader.readAsText(file);
            }
        };
        fileInput.click();
    };

    const encryptButton = document.getElementById('encryptButton');
    if (encryptButton) {
        encryptButton.onclick = () => {
            const text = document.getElementById('encryptInput').value;
            const key = document.getElementById('encryptKey').value;

            if (text && key) {
                const encryptedText = encryptWithKey(text, key);
                document.getElementById('encryptOutput').value = encryptedText;
                if (confirm("Do you want to save the encrypted text to a file?")) {
                    downloadTextFile(encryptedText, 'encrypted.txt');
                }
            } else {
                alert("Please enter both text and key.");
            }
        };
    }

    const decryptButton = document.getElementById('decryptButton');
    if (decryptButton) {
        decryptButton.onclick = () => {
            const text = document.getElementById('decryptInput').value;
            const key = document.getElementById('decryptKey').value;

            if (text && key) {
                const decryptedText = decryptWithKey(text, key);
                document.getElementById('decryptOutput').value = decryptedText;
                if (confirm("Do you want to save the decrypted text to a file?")) {
                    downloadTextFile(decryptedText, 'decrypted.txt');
                }
            } else {
                alert("Please enter both text and key.");
            }
        };
    }
});





