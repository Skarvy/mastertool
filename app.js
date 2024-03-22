document.addEventListener('DOMContentLoaded', () => {
    const characterForm = document.getElementById('character-form');
    const characterList = document.getElementById('character-list');

    // Cargar personajes del almacenamiento local al cargar la página
    loadCharacters();

    // Agregar evento de envío al formulario
    characterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addCharacter();
    });

    function addCharacter() {
        const name = document.getElementById('name').value;
        const hpTotal = document.getElementById('hp-total').value;
        const hpActual = document.getElementById('hp-actual').value;
        const gold = document.getElementById('gold').value;
        const status = document.getElementById('status').value;

        const character = {
            name,
            hpTotal,
            hpActual,
            gold,
            status
        };

        // Obtener personajes existentes del almacenamiento local
        let characters = JSON.parse(localStorage.getItem('characters')) || [];

        // Agregar el nuevo personaje a la lista
        characters.push(character);

        // Guardar la lista actualizada en el almacenamiento local
        localStorage.setItem('characters', JSON.stringify(characters));

        // Limpiar el formulario
        characterForm.reset();

        // Recargar la lista de personajes
        loadCharacters();
    }

    function loadCharacters() {
        characterList.innerHTML = '';

        // Obtener personajes del almacenamiento local
        const characters = JSON.parse(localStorage.getItem('characters')) || [];

        // Mostrar cada personaje como una tarjeta
        characters.forEach((character, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <input type="text" value="${character.name}" data-index="${index}">
                <input type="number" value="${character.hpTotal}" data-index="${index}">
                <input type="number" value="${character.hpActual}" data-index="${index}">
                <input type="number" value="${character.gold}" data-index="${index}">
                <input type="text" value="${character.status}" data-index="${index}">
                <button class="save-btn" data-index="${index}">Guardar</button>
                <button class="delete-btn" data-index="${index}">Borrar</button>
            `;
            characterList.appendChild(card);
        });
    }

    // Agregar eventos para guardar y eliminar personajes
    characterList.addEventListener('click', (e) => {
        if (e.target.classList.contains('save-btn')) {
            saveCharacter(e.target.dataset.index);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteCharacter(e.target.dataset.index);
        }
    });

    function saveCharacter(index) {
        const inputs = document.querySelectorAll(`input[data-index="${index}"]`);
        const character = {
            name: inputs[0].value,
            hpTotal: inputs[1].value,
            hpActual: inputs[2].value,
            gold: inputs[3].value,
            status: inputs[4].value
        };

        // Obtener personajes existentes del almacenamiento local
        let characters = JSON.parse(localStorage.getItem('characters')) || [];

        // Actualizar el personaje en la lista
        characters[index] = character;

        // Guardar la lista actualizada en el almacenamiento local
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    function deleteCharacter(index) {
        // Obtener personajes existentes del almacenamiento local
        let characters = JSON.parse(localStorage.getItem('characters')) || [];

        // Eliminar el personaje de la lista
        characters.splice(index, 1);

        // Guardar la lista actualizada en el almacenamiento local
        localStorage.setItem('characters', JSON.stringify(characters));

        // Recargar la lista de personajes
        loadCharacters();
    }
});
