const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

/* ========= CRIA IDs AUTOMÁTICOS NAS DROPZONES ========= */
dropzones.forEach((dropzone, index) => {
    if (!dropzone.id) {
        dropzone.id = 'dropzone-' + index;
    }
});

/* ========= RESTAURA DO LOCALSTORAGE ========= */
document.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('dragDropData')) || {};

    Object.entries(savedData).forEach(([draggableId, dropzoneId]) => {
        const draggable = document.getElementById(draggableId);
        const dropzone = document.getElementById(dropzoneId);

        if (draggable && dropzone) {
            dropzone.appendChild(draggable);
        }
    });
});

/* ========= DRAGGABLE ========= */
draggables.forEach(draggable => {

    if (!draggable.id) {
        console.error("Erro: Draggable sem ID.");
    }

    draggable.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', draggable.id);
        event.dataTransfer.effectAllowed = 'move';
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });

});

/* ========= DROPZONES ========= */
dropzones.forEach(dropzone => {

    dropzone.addEventListener('dragenter', (event) => {
        event.preventDefault();
        dropzone.classList.add('over');
    });

    dropzone.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('over');
    });

    dropzone.addEventListener('drop', (event) => {
        event.preventDefault();
        dropzone.classList.remove('over');

        const draggableId = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(draggableId);

        if (!draggableElement) return;

        // impede colocar mais de uma imagem
        if (dropzone.children.length > 0) {
            console.log('Dropzone já ocupada.');
            return;
        }

        dropzone.appendChild(draggableElement);

        const originalParent = draggableElement.closest('.imagens-arastar');
        if (originalParent) {
            originalParent.remove();
        }

        /* ========= SALVA NO LOCALSTORAGE ========= */
        const savedData = JSON.parse(localStorage.getItem('dragDropData')) || {};
        savedData[draggableId] = dropzone.id;
        localStorage.setItem('dragDropData', JSON.stringify(savedData));
    });

});
