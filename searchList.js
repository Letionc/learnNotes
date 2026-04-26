import "./configList.js";

const ELEM_SEARCH = document.getElementById("search");

function addChild(show_name, fn) {
    const ELEM = document.createElement("li");
    ELEM.classList.add("search-list-item");
}
function updateSearchListBox() {
    const TEXT = String(ELEM_SEARCH.value).trim();
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

