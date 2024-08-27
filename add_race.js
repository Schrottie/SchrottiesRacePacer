document.getElementById('addRow').addEventListener('click', function() {
    const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const lastRowIndex = rows.length - 1;

    const newRow = table.insertRow(lastRowIndex);
    newRow.innerHTML = `
        <td><input type="text" placeholder="VP Name"></td>
        <td><input type="text" placeholder="Kilometer" pattern="\\d*\\.?\\d{0,2}"></td>
        <td><input type="time" placeholder="Cutoff"></td>
        <td><input type="time" placeholder="Open"></td>
        <td><input type="time" placeholder="Close"></td>
        <td><button type="button" class="remove">Entfernen</button></td>
    `;

    // Hinzufügen eines Ereignislisteners für den Entfernen-Button in der neuen Zeile
    newRow.querySelector('.remove').addEventListener('click', function() {
        newRow.remove();
    });
});

document.getElementById('routeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const kurzName = document.getElementById('kurzName').value;
    const rows = document.querySelectorAll('#routeTable tbody tr');

    // Überprüfung, ob der Name und der Kurzname eingegeben wurden
    if (!name.trim() || !kurzName.trim()) {
        alert("Bitte geben Sie sowohl einen Namen als auch einen Kurznamen ein.");
        return;
    }

    // Start der JSON-Datei mit Titel und Checkpoints
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

    // JSON-String aus dem raceData-Objekt erzeugen
    const data = JSON.stringify(raceData, null, 4);

    // Datei-Generierung und Speicherung
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
