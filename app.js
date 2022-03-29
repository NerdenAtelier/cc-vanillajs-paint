const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controls__color");
const rangeBar = document.querySelector("#jsRange");
const fillAndPaint = document.querySelector("#jsMode");
const saveButton = document.querySelector("#jsSave");

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let nowPainting = false;
let nowFilling = false;

function startPainting() {
  nowPainting = true;
}

function stopPainting() {
  nowPainting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!nowPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const colorCode = event.target.style.backgroundColor;
  ctx.strokeStyle = colorCode;
  ctx.fillStyle = colorCode;
}

function handleRangeChange(event) {
  const brushSize = event.target.value;
  ctx.lineWidth = brushSize;
}

function handleToggleClick(event) {
  if (nowFilling === true) {
    nowFilling = false;
    fillAndPaint.innerText = "Fill";
  } else {
    nowFilling = true;
    fillAndPaint.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (nowFilling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleRightClick(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const imageData = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imageData;
  link.download = "mypainting.png";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}

if (rangeBar) {
  rangeBar.addEventListener("input", handleRangeChange);
}

if (fillAndPaint) {
  fillAndPaint.addEventListener("click", handleToggleClick);
}

if (saveButton) {
  saveButton.addEventListener("click", handleSaveClick);
}
