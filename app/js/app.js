const editor        = document.querySelector('.editor textarea');
const preview       = document.querySelector('.preview');

editor.onkeyup      = generatePreview;

function generatePreview () {
    var content = editor.value;
    var html = marked(content);
    preview.innerHTML = html;

    if(editor.value.length >0){

        //menu.js >> saveFileLink
        saveFileLink.classList.remove('hidden');
    }
}

