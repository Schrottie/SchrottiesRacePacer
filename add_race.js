document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addRow').addEventListener('click', function () {
        const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
        const lastRowIndex = table.rows.length - 1;

        const newRow = table.insertRow(lastRowIndex);
        newRow.innerHTML = `
            <td><input type="text" placeholder="VP Name"></td>
            <td><input type="text" placeholder="Kilometer" pattern="\\d*\\.?\\d{0,2}"></td>
            <td><input type="text" placeholder="--:--" pattern="\\d{1,2}:\\d{2}" title="Zeitformat H:MM (z.B. 25:30)"></td>
            <td><input type="time"></td>
            <td><input type="time"></td>
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
                    cutoff: formatCutoffTime(inputs[2].value),
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

    function formatCutoffTime(time) {
        if (!time.trim() || time === '--:--') return ''; // Bei leerem Eingabefeld oder '--:--' nichts zurückgeben
        const [hours, minutes] = time.split(':').map(part => parseInt(part, 10));
        if (isNaN(hours) || isNaN(minutes)) return ''; // Bei ungültigen Eingaben nichts zurückgeben
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    function loadRaceForEdit(filename) {
        fetch(`races/${filename}`)
        .then(response => response.json())
        .then(data => {
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
                    <td><input type="text" value="${cp.cutoff || '--:--'}" placeholder="--:--" pattern="\\d{1,2}:\\d{2}" title="Zeitformat H:MM (z.B. 25:30)"></td>
                    <td><input type="time" value="${cp.open || ''}"></td>
                    <td><input type="time" value="${cp.close || ''}"></td>
                    <td><button type="button" class="remove">Entfernen</button></td>
                `;

                newRow.querySelector('.remove').addEventListener('click', function () {
                    newRow.remove();
                });
            });
        })
        .catch(error => console.error('Fehler beim Laden des Rennens:', error));
    }

    document.getElementById('uploadButton').addEventListener('click', function () {
        const fileInput = document.getElementById('fileUpload');
        if (fileInput.files.length === 0) {
            alert('Bitte wählen Sie eine Datei aus.');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function (e) {
            try {
                const json = JSON.parse(e.target.result);
                if (json && json.title && json.checkpoints) {
                    // Setze die Werte in das Formular ein
                    document.getElementById('name').value = json.title || '';
                    
                    // Dateiname ohne Endung als Kurzname übernehmen
                    const kurzName = file.name.replace('.json', '');
                    document.getElementById('kurzName').value = kurzName;
                    document.getElementById('kurzName').setAttribute('readonly', true);
                    document.getElementById('startTime').value = json.startTime || '06:00';
                    document.getElementById('raceName').textContent = `Rennen bearbeiten: ${json.title || 'Unbenannt'}`;
                    document.getElementById('saveButton').textContent = 'Änderungen speichern';

                    const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
                    table.innerHTML = '';

                    json.checkpoints.forEach(cp => {
                        const newRow = table.insertRow();
                        newRow.innerHTML = `
                            <td><input type="text" value="${cp.vp || ''}"></td>
                            <td><input type="text" value="${cp.kilometer || ''}"></td>
                            <td><input type="text" value="${cp.cutoff || '--:--'}" placeholder="--:--" pattern="\\d{1,2}:\\d{2}" title="Zeitformat H:MM (z.B. 25:30)"></td>
                            <td><input type="time" value="${cp.open || ''}"></td>
                            <td><input type="time" value="${cp.close || ''}"></td>
                            <td><button type="button" class="remove">Entfernen</button></td>
                        `;

                        newRow.querySelector('.remove').addEventListener('click', function () {
                            newRow.remove();
                        });
                    });
                } else {
                    alert('Die hochgeladene Datei enthält keine gültigen Renndaten.');
                }
            } catch (error) {
                alert('Fehler beim Verarbeiten der Datei.');
                console.error('Fehler:', error);
            }
        };

        reader.readAsText(file);
    });

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
});
