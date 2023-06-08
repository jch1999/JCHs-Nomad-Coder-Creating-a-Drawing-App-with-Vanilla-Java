const canvas = document.querySelector("canvas");
//캔버스에 그릴 때 사용할 붓 = context
//자주 사용하게 될 테니 되도록 짧게 context ->ctx
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

//fillRect,strokeRect는 shortcut이다 그런데 rect도 short이다!
//context는 0,0에서 시작하는 브러시이다. 원하는 위치로 이동시킬 필요가 있다.
// ctx.moveTo(50,50);
//이동시킨 곳에서 다른 곳으로 선을 긋는다
// ctx.lineTo(150,50);
// ctx.lineTo(150,150);
// ctx.lineTo(50,150);
// ctx.lineTo(50,50);
// ctx.fill();

//집 그리기
// ctx.fillRect(200,200,50,200);
// ctx.fillRect(400,200,50,200);
ctx.lineWidth=2;//순서 중요! 먼저 넓이를 설정해 줘야 다음 stroke에 적용됨
// ctx.strokeRect(300,300,50,100);
// ctx.fillRect(300,300,50,100);
// ctx.fillRect(200,200,200,20);
// ctx.moveTo(200,200);
// ctx.lineTo(325,100);
// ctx.lineTo(450,200);
// ctx.lineTo(200,200);
// ctx.stroke();
// ctx.fillStyle="red";
// ctx.fill();

//사람 그리기
ctx.fillRect(215,200,15,100);
ctx.fillRect(350,200,15,100);
ctx.fillRect(260,200,60,200);

//원 (머리) 그리기 arc 사용
ctx.arc(290,150,50,0,2*Math.PI);
ctx.fill();

//눈 그리기
ctx.beginPath();
ctx.fillStyle="white";
// ctx.arc(270,150,5,0,2*Math.PI);
// ctx.arc(310,150,5,0,2*Math.PI);
ctx.arc(270,140,5,Math.PI,2*Math.PI);
ctx.arc(310,140,5,Math.PI,2*Math.PI);
ctx.fill();