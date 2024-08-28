document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
});

document.getElementById('addRow').addEventListener('click', function () {
    const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
    const lastRowIndex = table.rows.length - 1;

    const newRow = table.insertRow(lastRowIndex);
    newRow.innerHTML = `
        <td><input type="text" placeholder="VP Name"></td>
        <td><input type="text" placeholder="Kilometer" pattern="\\d*\\.?\\d{0,2}"></td>
        <td><input type="time" placeholder="Cutoff"></td>
        <td><input type="time" placeholder="Open"></td>
        <td><input type="time" placeholder="Close"></td>
        <td><button type="button" class="remove">Entfernen</button></td>
    `;

    newRow.querySelector('.remove').addEventListener('click', function () {
        newRow.remove();
    });
});

document.getElementById('routeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const kurzName = document.getElementById('kurzName').value;
    const rows = document.querySelectorAll('#routeTable tbody tr');

    if (!name.trim() || !kurzName.trim()) {
        alert("Bitte geben Sie sowohl einen Namen als auch einen Kurznamen ein.");
        return;
    }

    let raceData = {
        title: name,
        checkpoints: []
    };

    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value) {
            raceData.checkpoints.push({
                vp: inputs[0].value,
                kilometer: parseFloat(inputs[1].value) || 0,
                cutoff: inputs[2].value,
                open: inputs[3].value,
                close: inputs[4].value
            });
        }
    });

    const data = JSON.stringify(raceData, null, 4);
    const formData = new FormData();
    formData.append('filename', `${kurzName}.json`);
    formData.append('content', data);

    fetch('save_race.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
    })
    .catch(error => {
        console.error('Fehler:', error);
        alert('Fehler beim Speichern der Datei.');
    });
});

function loadRaceForEdit(filename) {
    fetch(`races/${filename}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').value = data.title;
        document.getElementById('kurzName').value = filename.replace('.json', '');
        document.getElementById('kurzName').setAttribute('readonly', true); // Setzt das Feld auf readonly
        document.getElementById('raceName').textContent = `Rennen bearbeiten: ${data.title}`;
        document.getElementById('saveButton').textContent = 'Änderungen speichern';

        const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';

        data.checkpoints.forEach(cp => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td><input type="text" value="${cp.vp}"></td>
                <td><input type="text" value="${cp.kilometer}"></td>
                <td><input type="time" value="${cp.cutoff}"></td>
                <td><input type="time" value="${cp.open}"></td>
                <td><input type="time" value="${cp.close}"></td>
                <td><button type="button" class="remove">Entfernen</button></td>
            `;

            newRow.querySelector('.remove').addEventListener('click', function () {
                newRow.remove();
            });
        });
    })
    .catch(error => console.error('Fehler beim Laden des Rennens:', error));
}

function checkEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get('edit');
    if (filename) {
        loadRaceForEdit(filename);
    } else {
        document.getElementById('raceName').textContent = 'Neues Rennen anlegen';
        document.getElementById('kurzName').removeAttribute('readonly'); // Stellt sicher, dass das Feld im neuen Modus bearbeitbar ist
    }
}

checkEditMode();
