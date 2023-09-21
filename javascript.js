 document.addEventListener('DOMContentLoaded', ()=>{
   fetchData();
})

const fetchData=async()=>{
   let data;
    try{
        const resp = await fetch('data.json');
        data = await resp.json();
    }
    catch(error){
        console.log(error);
    }

   //console.log(data);
   const template=document.querySelector('template').content;
   const fragment=document.createDocumentFragment();
   const container= document.querySelector('.section_two');

  //Función para dibujar las targetas
   const Draw=(data,array)=>{
        const icon=[
        './img/icon-work.svg',
        './img/icon-play.svg',
        './img/icon-study.svg',
        './img/icon-exercise.svg',
        './img/icon-social.svg',
        './img/icon-self-care.svg'
        ]

        const bgColor=[
        'hsl(15, 100%, 70%)',
        'hsl(195, 74%, 62%)',
        'hsl(348, 100%, 68%)',
        'hsl(145, 58%, 55%)',
        'hsl(264, 64%, 52%)',
        'hsl(43, 84%, 65%)'
        ]
   

        data.forEach((element,index) => {
         template.querySelector('.activity').textContent=element.title
         template.querySelector('#actuall_time').textContent=array[index].current;
         template.querySelector('#previous_time').textContent=array[index].previous;
         template.querySelector('.icon').setAttribute('src',icon[index]);
         template.querySelector('.card_background').style.backgroundColor=bgColor[index];
        // console.log(template.querySelector('.card_background').style.backgroundColor);
        
         const clone=template.cloneNode(true);
         fragment.appendChild(clone);
        });
        container.appendChild(fragment);
    }

  //Función para eliminar los nodos de container y no repetir targetas
  const clean=()=>{
    for(let i=0;i<data.length;i++){
    container.removeChild(container.firstElementChild);
 }
  }

  
   
  //primerra llamada a la función Draw() para tener dibujada las targetas al cargar la página
  let array=data.map(item=>item.timeframes.daily);
  Draw(data,array);

  //Función para dejar el botón selecionado con color distinto(blanco)
  const btnSelection=(e)=>{
    const selection=document.querySelectorAll('.options_frecuency');

    for(let i=0;i<3;i++){
        if(e.target.getAttribute('id') == i){
         selection[i].classList.add('btnMarck');
        } 
        else{
         selection[i].classList.remove('btnMarck');
        }
        }
  }

  //método para cambiar la frecuencia
  const btn=document.querySelector('.main_card_options').addEventListener('click',(e)=>{  

  

    if(e.target.textContent =='Daily'){
        array=data.map(item=>item.timeframes.daily);
        btnSelection(e);
        clean();
        template.querySelector('.last_frecuency').textContent="Day";
        Draw(data,array);        
    }
    if(e.target.textContent =='Weekly'){
        array=data.map(item=>item.timeframes.weekly);
        btnSelection(e);
        clean();
        template.querySelector('.last_frecuency').textContent="Week";
        Draw(data,array);
    }
    if(e.target.textContent =='Monthly'){
        array=data.map(item=>item.timeframes.monthly);
        btnSelection(e);
        clean();
        template.querySelector('.last_frecuency').textContent="Month";
        Draw(data,array);
        
    }
  })

    
}


