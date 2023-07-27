const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+";
charactersArray = characters.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

const codedParagon = 'codedparagon'.split('');
const codedParagonCounters = [];

for(let i = 0; i < columns; i++) {
    drops[i] = 1;
    codedParagonCounters[i] = 0;
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + "px arial";
    
    for(let i = 0; i < drops.length; i++) {
        let text;
        ctx.fillStyle = "#0F0"; // default color
        
        if (Math.random() > 0.995 && codedParagonCounters[i] === 0) {
            codedParagonCounters[i] = 1;
        }
        
        if (codedParagonCounters[i] > 0 && codedParagonCounters[i] <= codedParagon.length) {
            text = codedParagon[codedParagonCounters[i] - 1];
            ctx.fillStyle = "#FF0000"; // color for 'codedparagon'
            codedParagonCounters[i]++;
        } else {
            codedParagonCounters[i] = 0;
            text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

// Mouse Tracking
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    cursor.setAttribute("style", "top: "+(e.pageY - 15)+"px; left: "+(e.pageX - 15)+"px;")
});