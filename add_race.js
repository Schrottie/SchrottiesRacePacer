document.getElementById('addRow').addEventListener('click', function() {
    const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const lastRowIndex = rows.length - 1;

    const newRow = table.insertRow(lastRowIndex);
    newRow.innerHTML = `
        <td><input type="text" placeholder="VP Name"></td>
        <td><input type="number" placeholder="Kilometer"></td>
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

    // Start der Datei mit dem Kommentar für den vollen Namen
    let data = `// ${name}\n\nconst ${kurzName} = [\n`;
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value) {
            data += `    { vp: '${inputs[0].value}', kilometer: ${inputs[1].value || 0}, cutoff: '${inputs[2].value}', open: '${inputs[3].value}', close: '${inputs[4].value}' },\n`;
        }
    });
    data += `];`;

    // Datei-Generierung und Speicherung
    const formData = new FormData();
    formData.append('filename', `${kurzName}.js`);
    formData.append('content', data);

    fetch('saveFile.php', {
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
