const canvas = document.querySelector("canvas");
//캔버스에 그릴 때 사용할 붓 = context
//자주 사용하게 될 테니 되도록 짧게 context ->ctx
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;


//fill 단색으로 모양을 채움
//stroke 모양을 채우지 않음.
// ctx.fillRect(50, 50, 100, 200);
// ctx.strokeRect(200, 50, 100, 200);
// ctx.rect(50, 50, 100, 100);
// ctx.fill();
// ctx.stroke();
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();
// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "red";
//path: layer와 같은 개녕? path가 같을 경우
// 같은 패스의 다른 것이 변경되면 나머지도 같이 바뀐다.
// setTimeout(() => {
//   ctx.fill();
// }, 5000);

//선을 긋는다.
ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill();

//선을 끊고 새로 긋는다
ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.rect(450, 450, 100, 100);
ctx.fillStyle = "red";
ctx.fill();