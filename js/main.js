// general options 
let saturate=document.getElementById('saturate');
let contrast=document.getElementById('contrast');
let brightness=document.getElementById('brightness');
let sepia=document.getElementById('sepia');
let grayscale=document.getElementById('grayscale');
let blur=document.getElementById('blur');
let hue_rotate=document.getElementById('hue-rotate');
let upload=document.getElementById('upload');
let download=document.getElementById('download');
let img=document.getElementById('img');
let reset=document.querySelector('.reset');
let imgBox=document.querySelector('.img-box')
let canvas=document.getElementById('canvas')
let context=canvas.getContext('2d');
// page onload 
window.onload=function(){
    download.style.display='none';
    reset.style.display='none';
    imgBox.style.display='none'
}

// reset values function 
function resetValues(){
    img.style.filter='none';
    saturate.value='100';
    contrast.value='100';
    brightness.value='100';
    sepia.value='0';
    grayscale.value='0';
    blur.value='0';
    hue_rotate.value='0';
}

//upload photo 
upload.addEventListener('change',function(){
    resetValues()
    download.style.display='block';
    reset.style.display='block';
    imgBox.style.display='block'
    let file=new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload=function(){
    img.setAttribute('src',file.result);
    }
    img.onload=function(){
        canvas.width=img.width;
        canvas.height=img.height;
        context.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display='none';
    }
})



// filter function 
let filters=document.querySelectorAll(' ul li input ');
filters.forEach(filterChange => {
    filterChange.addEventListener('input',function(){
        context.drawImage(img,0,0,canvas.width,canvas.height);
        context.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hue_rotate.value}deg)
        `
    })
})

// reset values 
reset.addEventListener('click',resetValues);

download.onclick=function(){
    download.href= canvas.toDataURL() ;
}