const ELEM_LOOK_BOX = document.getElementById("look-box");

function markdownShow(fn) {
    fetch(fn)
    .then(e=>e.text())
    .then(md=>{
        ELEM_LOOK_BOX.innerHTML = compileMdToHtml(md);
    })
    .catch(e=>{
        console.error(e);
        alert("mdLookScript.js：不好！获取网络内容时发生错误了！\n"+String(e));
    });
}