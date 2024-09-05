let countBoxes=prompt('Укажите количество квадратиков');
let box=document.querySelector('.box'); //захват элемента
let main = document.querySelector('.main');



for(let i=0;i<=countBoxes-2;i++){
    let box= document.createElement('div');
    box.classList.add('box');
    main.appendChild(box);
}

let boxCoord=box.getBoundingClientRect(); //координаты элемента
let boxWidth=boxCoord.width;               //ширина
let boxHeight=boxCoord.height;              //высота
let styles = getComputedStyle(box);         //стили
let topBox=parseInt(styles.top);            //отступ от верха без px
let leftBox=parseInt(styles.left);          //отступ с лева без px
let winWidth=innerWidth //ширина окна
let winHeight=innerHeight; //высота окна
let count=document.getElementById('count');

/***********************************************/

function random(min=0,max=10)
{
    return Math.floor(Math.random()*(max-min))+min;
}



function ran(){
    for (const box of document.querySelectorAll('.box')) {
setInterval(()=>{
    
        let topB=random(0,winHeight)+leftBox;
        let leftB=random(0,winWidth)+topBox;
        box.style.setProperty('left', leftB+'px');
        box.style.setProperty('top', topB+'px');
        if(topB>winHeight+100 && leftB>winWidth+100)
        {
            box.style.setProperty('left', `${leftB=0}px`);
            box.style.setProperty('top', `${topB=0}px`);
        }
        
    
},6000)
}
};

function time(){   
let tik_tak = setInterval(()=>{
    let min=parseInt(document.getElementById('minut').innerText);
    let sec = parseInt(document.getElementById('secunds').innerText);
    sec++;
    document.getElementById('secunds').innerText=sec;
    if (sec == 60){
        sec=0;
        document.getElementById('secunds').innerText=sec;
        min++;
        document.getElementById('minut').innerText=min;
    }

    if(parseInt(count.innerText)==countBoxes){
        clearInterval(tik_tak);
        alert('Победа');
    }

},1000);    
};

main.addEventListener('click', ()=>{
    if(event.target.className=='box'){
        let value=parseInt(count.innerText);
        value++;
        count.innerText=value;
        event.target.remove();
    }
});

time();
//ran();


function ran2(){
    let counts=0;
    
        if(counts<2000)
        {
            setTimeout(ran2,5000); 
            for (const box of document.querySelectorAll('.box')) {

                let topB=random(0,winHeight)+leftBox;
                let leftB=random(0,winWidth)+topBox;
                box.style.setProperty('left', leftB+'px');
                box.style.setProperty('top', topB+'px');
                if(topB>winHeight+100 && leftB>winWidth+100)
                {
                    box.style.setProperty('left', `${leftB=0}px`);
                    box.style.setProperty('top', `${topB=0}px`);
                }
            }
        }
    counts++;
};

ran2();