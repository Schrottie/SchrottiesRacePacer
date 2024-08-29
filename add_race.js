document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addRow').addEventListener('click', function () {
        const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
        const lastRowIndex = table.rows.length - 1;

        const newRow = table.insertRow(lastRowIndex);
        newRow.innerHTML = `
            <td><input type="text" placeholder="VP Name"></td>
            <td><input type="text" placeholder="Kilometer" pattern="\\d*\\.?\\d{0,2}"></td>
            <td><input type="text" placeholder="H:MM" pattern="\\d{1,2}:\\d{2}"></td>
            <td><input type="text" placeholder="H:MM" pattern="\\d{1,2}:\\d{2}"></td>
            <td><input type="text" placeholder="H:MM" pattern="\\d{1,2}:\\d{2}"></td>
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
        const startTime = document.getElementById('startTime').value;
        const rows = document.querySelectorAll('#routeTable tbody tr');

        if (!name.trim() || !kurzName.trim()) {
            alert("Bitte geben Sie sowohl einen Namen als auch einen Kurznamen ein.");
            return;
        }

        let raceData = {
            title: name,
            startTime: startTime,
            checkpoints: []
        };

        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            if (inputs[0].value) {
                raceData.checkpoints.push({
                    vp: inputs[0].value,
                    kilometer: parseFloat(inputs[1].value) || 0,
                    cutoff: formatTime(inputs[2].value),
                    open: formatTime(inputs[3].value),
                    close: formatTime(inputs[4].value)
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

    function formatTime(time) {
        const [hours, minutes] = time.split(':').map(part => parseInt(part, 10));
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    function loadRaceForEdit(filename) {
        fetch(`races/${filename}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('name').value = data.title || '';
            const kurzName = filename.replace('.json', '');
            document.getElementById('kurzName').value = kurzName;
            document.getElementById('kurzName').setAttribute('readonly', true); 
            document.getElementById('startTime').value = data.startTime || '06:00';
            document.getElementById('raceName').textContent = `Rennen bearbeiten: ${data.title || 'Unbenannt'}`;
            document.getElementById('saveButton').textContent = 'Änderungen speichern';

            const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
            table.innerHTML = '';

            data.checkpoints.forEach(cp => {
                const newRow = table.insertRow();
                newRow.innerHTML = `
                    <td><input type="text" value="${cp.vp || ''}"></td>
                    <td><input type="text" value="${cp.kilometer || ''}"></td>
                    <td><input type="text" value="${cp.cutoff || ''}" placeholder="H:MM"></td>
                    <td><input type="text" value="${cp.open || ''}" placeholder="H:MM"></td>
                    <td><input type="text" value="${cp.close || ''}" placeholder="H:MM"></td>
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
            document.getElementById('kurzName').removeAttribute('readonly');
        }
    }

    checkEditMode();

    // Upload-Funktion
    document.getElementById('uploadButton').addEventListener('click', function () {
        const fileInput = document.getElementById('fileUpload');
        const file = fileInput.files[0];

        if (!file) {
            alert('Bitte wählen Sie eine JSON-Datei zum Hochladen aus.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);
                populateFormWithData(data, file.name);
            } catch (error) {
                console.error('Fehler beim Verarbeiten der JSON-Datei:', error);
                alert('Die hochgeladene Datei ist kein gültiges JSON.');
            }
        };
        reader.onerror = function (error) {
            console.error('Fehler beim Lesen der Datei:', error);
            alert('Fehler beim Lesen der Datei.');
        };
        reader.readAsText(file);
    });

    function populateFormWithData(data, filename) {
        document.getElementById('name').value = data.title || '';
        
        // Dateiname ohne Endung als Kurzname übernehmen
        const kurzName = filename.replace('.json', '');
        document.getElementById('kurzName').value = kurzName;
        document.getElementById('kurzName').setAttribute('readonly', true);
        
        document.getElementById('startTime').value = data.startTime || '06:00';
        document.getElementById('raceName').textContent = `Rennen bearbeiten: ${data.title || 'Unbenannt'}`;
        document.getElementById('saveButton').textContent = 'Änderungen speichern';

        const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';

        data.checkpoints.forEach(cp => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td><input type="text" value="${cp.vp || ''}"></td>
                <td><input type="text" value="${cp.kilometer || ''}"></td>
                <td><input type="text" value="${cp.cutoff || ''}" placeholder="H:MM"></td>
                <td><input type="text" value="${cp.open || ''}" placeholder="H:MM"></td>
                <td><input type="text" value="${cp.close || ''}" placeholder="H:MM"></td>
                <td><button type="button" class="remove">Entfernen</button></td>
            `;

            newRow.querySelector('.remove').addEventListener('click', function () {
                newRow.remove();
            });
        });
    }
});
