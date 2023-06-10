const saveBtn=document.getElementById("save");
const textInput=document.getElementById("text");
const fileInput=document.getElementById("file");
const eraserBtn=document.getElementById("eraser-btn");
const modeBtn=document.getElementById("mode-btn");
const destroyBtn=document.getElementById("destroy-btn");
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
ctx.lineCap="round"; //butt,round, square로 지정 가능 그어지는 선끝 모양? 

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

function onFileChange(event)
{
  // console.dir(event.target);
  const file=event.target.files[0];// 배열인 이는 input에 multiple을 추가하면 다중 업로드가 가능해지기 때문이다.
  const url=URL.createObjectURL(file);//유저가 업로드한 파일은 브라우저 메모리에 존재하게 된다. 그 url을 통해 접근한다. 
  // console.log(url);
  const image=new Image();// same <img src=""/> in html
  image.src=url;
  image.onload=function(){//image에서 onload 발생시 다음 function 실행
    ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    fileInput.value=null;
  };
}

function onDoubleClick(event){
  // console.log(event.offsetX,event.offsetY);
  const text=textInput.value;
  if(text!==""){
    ctx.save();//현재 상태, 색상, 스타일 등을 저장
    ctx.lineWidth=1;
    ctx.font="68px 'Press Start 2P'";// size, font-family
    // ctx.font="48px serif";
    // ctx.strokeText(text,event.offsetX,event.offsetY);
    ctx.fillText(text,event.offsetX,event.offsetY);
    ctx.restore();//저장한 것 불러오기
  }
}

function onSaveClick(){
  // console.log(canvas.toDataURL());
  const url=canvas.toDataURL();
  const a=document.createElement("a");
  a.href=url;
  a.download="myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick",onDoubleClick);
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
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click",onSaveClick);