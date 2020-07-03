
    class Mosquito{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
    }
    
    var distMosquito = 370 ;
    var mosquitoPosition = [];
    var canvas = document.querySelector('#canvas');
    var timeOut;
    var life = 3;
    var mosquitoSize = 500;
    var heartSize = 200
    var score = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext('2d');

    
    

    function createMosquito(){
        
        let img = document.createElement("img");
        img.src = 'imagens/mosquito.png';
        

        img.onload = function(){

                let randomX = Math.random() * (canvas.width - 1100) + 100
                let randomY = Math.random() * (canvas.height - 1100) + 100 
                console.log(randomX,randomY)
            if(randomX < 600 && randomY > 1200 ){
                ctx.drawImage(img, randomX, randomY,mosquitoSize,mosquitoSize)
                var mosquito = new Mosquito( Math.floor(randomX+230),Math.floor(randomY+155))
                timeOut = setTimeout(function(){
                    removeElement(randomX,randomY,mosquitoSize,mosquitoSize)
                    removeLife();
                },750)
            }else{
                let newRandomX = randomX + 600;
                let newRandomY = randomY - 400;

                ctx.drawImage(img, newRandomX, newRandomY,mosquitoSize,mosquitoSize)
                var mosquito = new Mosquito( Math.floor(newRandomX + 230),Math.floor(newRandomY+155))
                 timeOut = setTimeout(function(){
                     removeElement(newRandomX,newRandomY,mosquitoSize,mosquitoSize)
                     removeLife();   
                },750)
            }
            mosquitoPosition.push(mosquito);
            
        }


    }

    function removeElement(x,y,w,h,){
        ctx.clearRect(x, y, w, h);
        mosquitoPosition.pop();
    }

    function removeLife(){
        switch(life){
            case 3: 
            ctx.clearRect(100, 1600, heartSize, heartSize)
            life--
            break;
            case 2:
            ctx.clearRect(300, 1600, heartSize, heartSize)
            life--
            break;
            case 1:
            ctx.clearRect(500, 1600, heartSize, heartSize)
            life--
            break;
            default:
                window.location.href = window.location.href.replace('index','gameover')
        }
    }

    function countingText(){

    }

    function countingLives(){
            
        let heartImg = document.createElement('img');
        heartImg.src = 'imagens/heart.png';

        heartImg.onload = function(){

           ctx.drawImage(heartImg,100,1600,heartSize,heartSize);
           ctx.drawImage(heartImg,300,1600,heartSize,heartSize);
           ctx.drawImage(heartImg,500,1600,heartSize,heartSize);

        }
    }

    setInterval(createMosquito,800);

    

        window.addEventListener("click", e =>{
            console.log(e.x,e.y)
            mosquitoPosition.forEach((mosquito) =>{
               mX = mosquito.x + distMosquito
               mx = mosquito.x - distMosquito
               mY = mosquito.y + distMosquito
               my = mosquito.y - distMosquito
    
                if(e.x <= mX && e.x >= mx && e.y <= mY && e.y >= my ){
                    removeElement(mosquito.x - 230, mosquito.y - 155,mosquitoSize,mosquitoSize)
                    clearTimeout(timeOut)
                    score++;
                    removeElement(600,75,150,150)
                    ctx.font='100px sans-serif';
                    ctx.fillStyle='white';
                    ctx.fillText(`SCORE: ${score}`,200,150);
                    ctx.stroke();
                }
            })
        })

    countingLives()
    console.log(window.innerWidth, window.innerHeight);
    console.log(canvas.width, canvas.height)