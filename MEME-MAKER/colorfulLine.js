const canvas = document.querySelector("canvas");
const modeBtn=document.querySelector("#moveBtn");

const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
  "#1abc9c",
  "#2ecc71",
  "#9b59b6",
  "#ecf0f1",
  "#d35400",
  "#34495e",
  "#f1c40f",
];

let mode=false; //false - click to change startPoint, true - click to change color
let point={"x":800,"y":800};

function onClick(event)
{
  if(!mode){
    point["x"]=event.offsetX;
    point["y"]=event.offsetY;
  }
  else
  {
    ctx.beginPath();
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
  }
}

function onMove(event) {
  // console.log(event);
  ctx.beginPath();
  ctx.moveTo(point["x"], point["y"]);
  if(!mode){
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
  }
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

function modeChange(event){
  mode=!mode;
}

// canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("click", onClick);
modeBtn.addEventListener("click",modeChange);