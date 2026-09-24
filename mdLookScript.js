const ELEM_LOOK_BOX = document.getElementById("look-box");
const ELEM_LIGHT_BTN = document.getElementById("light-btn") || Object.create(null);
const show_history = {};
var is_light_on = true;

function updateTitlesId(){
    const cnt = Object.create(null);
    document.querySelectorAll("h1.preview-theme--custom, h2.preview-theme--custom, h3.preview-theme--custom, h4.preview-theme--custom, h5.preview-theme--custom, h6.preview-theme--custom").forEach((v,k) => {
        const trans1 = encodeURIComponent(v.innerText).replace(/%20/g, "-");
        const final = cnt[trans1]? (`${trans1}-${cnt[trans1]++}`): (cnt[trans1] = 1, trans1);
        v.id = final;
    })
}
function markdownShow(fn) {
    const history = show_history[fn];
    if(history){
        ELEM_LOOK_BOX.innerHTML = history;
        updateTitlesId();
    }
    fetch(fn)
    .then(e=>e.text())
    .then(md=>{
        ELEM_LOOK_BOX.innerHTML = show_history[fn] = compileMdToHtml(md) + '<div class="page-margin"></div>';
        updateTitlesId();
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
