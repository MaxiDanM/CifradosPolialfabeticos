document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("message");
    const keyInput = document.getElementById("key");
    const methodSelect = document.getElementById("method");
    const resultTextarea = document.getElementById("result");
    const encryptButton = document.getElementById("encrypt");
    const decryptButton = document.getElementById("decrypt");

    encryptButton.addEventListener("click", function() {
        const message = messageInput.value;
        const key = keyInput.value;
        const method = methodSelect.value;

        if (method === "cesar") {
            const encryptedMessage = encryptCesar(message, key);
            resultTextarea.value = encryptedMessage;
        } else if (method === "vigenere") {
            const encryptedMessage = encryptVigenere(message, key);
            resultTextarea.value = encryptedMessage;
        }
    });

    decryptButton.addEventListener("click", function() {
        const message = messageInput.value;
        const key = keyInput.value;
        const method = methodSelect.value;

        if (method === "cesar") {
            const decryptedMessage = decryptCesar(message, key);
            resultTextarea.value = decryptedMessage;
        } else if (method === "vigenere") {
            const decryptedMessage = decryptVigenere(message, key);
            resultTextarea.value = decryptedMessage;
        }
    });

    function encryptCesar(message, key) {
        // Función de cifrado César
        const desplazamiento = parseInt(key);
        const encryptedMessage = message.split('').map(c => {
            let mayus = (c === c.toUpperCase()) ? true : false;
            let valorEntero = c.toLowerCase().charCodeAt(0);
            if (valorEntero >= 97 && valorEntero <= 122) {
                if (valorEntero + desplazamiento > 122) {
                    valorEntero = 97 + (valorEntero - 122) + desplazamiento - 1;
                } else {
                    valorEntero = valorEntero + desplazamiento;
                }
            }
            let cifrado = String.fromCharCode(valorEntero);
            return mayus ? cifrado.toUpperCase() : cifrado;
        }).join('');
        return encryptedMessage;
    }

    function decryptCesar(message, key) {
        // Función de descifrado César
        const desplazamiento = parseInt(key) * -1;
        const decryptedMessage = message.split('').map(c => {
            let mayus = (c === c.toUpperCase()) ? true : false;
            let valorEntero = c.toLowerCase().charCodeAt(0);
            if (valorEntero >= 97 && valorEntero <= 122) {
                if (valorEntero + desplazamiento < 97) {
                    valorEntero = 122 - (96 - (valorEntero + desplazamiento));
                } else {
                    valorEntero = valorEntero + desplazamiento;
                }
            }
            let descifrado = String.fromCharCode(valorEntero);
            return mayus ? descifrado.toUpperCase() : descifrado;
        }).join('');
        return decryptedMessage;
    }

    function encryptVigenere(message, key) {
        // Función de cifrado Vigenère
        let encryptedMessage = "";
        const keyLength = key.length;
        for (let i = 0; i < message.length; i++) {
            const char = message.charAt(i);
            if (char.match(/[a-z]/i)) {
                const shift = key.charCodeAt(i % keyLength) - 'a'.charCodeAt(0);
                if (char.match(/[a-z]/)) {
                    encryptedMessage += String.fromCharCode((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26 + 'a'.charCodeAt(0));
                } else if (char.match(/[A-Z]/)) {
                    encryptedMessage += String.fromCharCode((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26 + 'A'.charCodeAt(0));
                }
            } else {
                encryptedMessage += char;
            }
        }
        return encryptedMessage;
    }

    function decryptVigenere(message, key) {
        // Función de descifrado Vigenère
        let decryptedMessage = "";
        const keyLength = key.length;
        for (let i = 0; i < message.length; i++) {
            const char = message.charAt(i);
            if (char.match(/[a-z]/i)) {
                const shift = key.charCodeAt(i % keyLength) - 'a'.charCodeAt(0);
                if (char.match(/[a-z]/)) {
                    let code = (char.charCodeAt(0) - 'a'.charCodeAt(0) - shift) % 26;
                    if (code < 0) {
                        code += 26;
                    }
                    decryptedMessage += String.fromCharCode(code + 'a'.charCodeAt(0));
                } else if (char.match(/[A-Z]/)) {
                    let code = (char.charCodeAt(0) - 'A'.charCodeAt(0) - shift) % 26;
                    if (code < 0) {
                        code += 26;
                    }
                    decryptedMessage += String.fromCharCode(code + 'A'.charCodeAt(0));
                }
            } else {
                decryptedMessage += char;
            }
        }
        return decryptedMessage;
    }
});