const ELEM_LOOK_BOX = document.getElementById("look-box");
const ELEM_LIGHT_BTN = document.getElementById("light-btn") || Object.create(null);
const show_history = {};
var is_light_on = true;

function markdownShow(fn) {
    const history = show_history[fn];
    if(history){
        ELEM_LOOK_BOX.innerHTML = history;
    }
    fetch(fn)
    .then(e=>e.text())
    .then(md=>{
        ELEM_LOOK_BOX.innerHTML = show_history[fn] = compileMdToHtml(md) + '<div class="page-margin"></div>';
    })
    .catch(e=>{
        console.error(e);
        alert("mdLookScript.js: 不好! 获取网络内容时发生错误了! \n"+String(e));
    });
}
function turnLight() {
    ELEM_LIGHT_BTN.innerHTML = (is_light_on? "Turn On": "Turn Off");
    if(is_light_on){
        is_light_on = false;
        ELEM_LOOK_BOX.classList.add("unlighted");
    }else{
        is_light_on = true;
        ELEM_LOOK_BOX.classList.remove("unlighted");
    }
}
