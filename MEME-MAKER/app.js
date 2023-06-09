const modeBtn=document.getElementById("mode-btn");
const destroyBtn=document.getElementById("destroy-btn");
const eraserBtn=document.getElementById("eraser-btn");
const colorOptions = Array.from(//foreach를 돌려면 배열이 필요하므로 Array.from을 사용해 배열로 변환.
  document.getElementsByClassName("color-option")//배열이 아닌 Element collection을 반환함.
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
//캔버스에 그릴 때 사용할 붓 = context
//자주 사용하게 될 테니 되도록 짧게 context ->ctx
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH=800;
const CANVAS_HEIGHT=800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling=false;
let isErasing=false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onCanvasClick(){
  if(isFilling){
    ctx.fillRect(0,0,800,800);
  }
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function changeColorSetting(colorValue)
{
  ctx.strokeStyle=colorValue;
  ctx.fillStyle=colorValue;
  color.value=colorValue;
}

function onColorChange(evnet) {
  // ctx.strokeStyle = event.target.value;
  // ctx.fillStyle = event.target.value;
  changeColorSetting(event.target.value);
}

function onColorClick(event) {
  console.dir(event.target.dataset);
  const colorValue = event.target.dataset.color;
  // ctx.strokeStyle = colorValue;
  // ctx.fillStyle = colorValue;
  // color.value = colorValue;
  changeColorSetting(colorValue);
}

function onModeClick(){
  if(isFilling){
    isFilling=false;
    modeBtn.innerText="Fill";
  } else{
    isFilling=true;
    modeBtn.innerText="Draw";
  }
}

function onDestroyClick(){
  ctx.fillStyle="white";
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraseClick(){
  ctx.strokeStyle="white";
  isFilling=false;
  modeBtn.innerText="Fill";
}

// canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click",onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraseClick);