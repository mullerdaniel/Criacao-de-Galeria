const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

draggables.forEach(draggable => {
    
    if (!draggable.id) {
        console.error("Erro: O elemento draggable não possui um ID. O Drag and Drop não funcionará.");
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
        
        if (draggableElement) {
            if (dropzone.children.length === 0) {
                 dropzone.appendChild(draggableElement); 
                 const originalParent = draggableElement.closest('.imagens-arastar');
                 if (originalParent) {
                     originalParent.remove();
                 }
            } else {
                 console.log('Dropzone já ocupada. Drop não permitido.');
            }
        }
    });
});