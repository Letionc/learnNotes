const ELEM_SEARCH = document.getElementById("search");
const ELEM_SEARCH_LIST_BOX = document.getElementById("search-list-box");

function addChild(show_name, fn) {
    const ELEM = document.createElement("a");
    ELEM.innerHTML = show_name,
    ELEM.href = `javascript: markdownShow("${fn}") ;`,
    ELEM.classList.add("search-list-item"),
    ELEM_SEARCH_LIST_BOX.appendChild(ELEM);
}
function updateSearchListBox() {
    const TEXT = String(ELEM_SEARCH.value).trim();
    ELEM_SEARCH_LIST_BOX.innerHTML = "";
    if(TEXT){
        for(let [fn, fnshow] of CONFIG_LIST){
            const SHOW_NAME = `${fnshow}: ${fn}`;

            if(SHOW_NAME.match(TEXT) != null) addChild(SHOW_NAME, fn);
        }
    }else{
        for(let [fn, fnshow] of CONFIG_LIST){
            const SHOW_NAME = `${fnshow}: ${fn}`;

            addChild(SHOW_NAME, fn);
        }
    }
}

ELEM_SEARCH.addEventListener("keyup", updateSearchListBox);
updateSearchListBox();

