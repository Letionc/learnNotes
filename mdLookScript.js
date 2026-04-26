const ELEM_LOOK_BOX = document.getElementById("look-box");
const show_history = {};

function markdownShow(fn) {
    const history = show_history;
    if(history){
        ELEM_LOOK_BOX.innerHTML = history;
    }
    fetch(fn)
    .then(e=>e.text())
    .then(md=>{
        ELEM_LOOK_BOX.innerHTML = show_history[fn] = compileMdToHtml(md);
    })
    .catch(e=>{
        console.error(e);
        alert("mdLookScript.js: 不好! 获取网络内容时发生错误了! \n"+String(e));
    });
}