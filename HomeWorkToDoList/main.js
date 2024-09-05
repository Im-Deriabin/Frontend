let arr=[];

document.addEventListener('DOMContentLoaded',()=>{
    let json = localStorage.getItem("list");

    if(json){
        let lists=JSON.parse(json);

        for (const items of lists) {
            
            drawTitle(items);
        }
    }
})

function drawTitle(objItem){

    let textInput =document.createElement('p');
    textInput.innerHTML=objItem.text;

    let dateInput=document.createElement('p');
    dateInput.classList.add('dateLi');
    dateInput.innerHTML=objItem.date;

    let span=document.createElement('span');
    span.innerText='❌';

    let task= document.createElement('div');
    task.classList.add('task');

    let item = document.createElement('li');
    if(objItem.isDone==false){

        item.classList.add('not_completed');

    } else{
        
        item.classList.add('done');
    }
    
    item.dataset.id=objItem.id;

    task.append(textInput,dateInput);
    item.append(task,span);
    document.querySelector('#tasks').append(item);
    arr.push(objItem);
    console.log(arr);


};
document.forms.ToDoForms.addEventListener('submit',()=>{
    event.preventDefault();

    let item={
        text:document.forms.ToDoForms.text.value,
        date:document.forms.ToDoForms.date.value,
        id:Date.now(),
        isDone:false

    }

    drawTitle(item);

    localStorage.setItem("list", JSON.stringify(arr));

    document.forms.ToDoForms.reset();
    
});

document.querySelector('#tasks').addEventListener('click', ()=>{
    if(event.target.tagName=='LI'){
        event.target.classList.remove('not_completed');
        
        if(event.target.classList.contains('done')){
            event.target.classList.remove('done');
            event.target.classList.add('not_completed');
            let id = event.target.dataset.id;
            let item=arr.filter(i=>i.id ==id);
            item[0].isDone=false;

        } else {
            event.target.classList.add('done');
            let id = event.target.dataset.id;
            let item=arr.filter(i=>i.id ==id);
            item[0].isDone=true;

        }
    } else if(event.target.tagName=='SPAN'){
        let id = event.target.parentElement.dataset.id;
        arr=arr.filter(i=>i.id !=id); // перезаписываем мoccив кроме !=id
        
        event.target.parentElement.remove();
    }
    localStorage.setItem("list", JSON.stringify(arr));
})

