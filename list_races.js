document.addEventListener('DOMContentLoaded', function () {
    const racesTableBody = document.querySelector('#racesTable tbody');
    const editRaceButton = document.getElementById('editRace');

    // Geschützte Rennen, die nicht gelöscht werden können
    const protectedRaces = ['mwl_iuzs.json', 'mwl_ggduzs.json'];

    function fetchRaces() {
        fetch('list_races.php')
            .then(response => response.json())
            .then(data => {
                let rowIndex = 1; // Zähler für die Reihenfolge
                data.forEach(race => {
                    const row = document.createElement('tr');

                    // Reihenfolge-Spalte
                    const indexCell = document.createElement('td');
                    indexCell.textContent = rowIndex++;

                    // Titel
                    const titleCell = document.createElement('td');
                    titleCell.textContent = race.fullName;

                    // Dateiname
                    const filenameCell = document.createElement('td');
                    filenameCell.textContent = race.filename;

                    // Aktionen
                    const actionsCell = document.createElement('td');

                    // Bearbeiten-Button (Font Awesome: fa-edit)
                    const editButton = document.createElement('button');
                    editButton.innerHTML = '<i class="fas fa-edit"></i>';
                    editButton.className = 'action-button edit';
                    editButton.title = 'Bearbeiten';
                    editButton.addEventListener('click', () => editRace(race.filename));
                    actionsCell.appendChild(editButton);

                    // Löschen-Button (Font Awesome: fa-trash), nur wenn das Rennen nicht geschützt ist
                    if (!protectedRaces.includes(race.filename)) {
                        const deleteButton = document.createElement('button');
                        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
                        deleteButton.className = 'action-button delete';
                        deleteButton.title = 'Löschen';
                        deleteButton.addEventListener('click', () => deleteRace(race.filename));
                        actionsCell.appendChild(deleteButton);
                    }

                    // Download-Button (Font Awesome: fa-download)
                    const downloadButton = document.createElement('button');
                    downloadButton.innerHTML = '<i class="fas fa-download"></i>';
                    downloadButton.className = 'action-button download';
                    downloadButton.title = 'Download';
                    downloadButton.addEventListener('click', () => downloadRace(race.filename));
                    actionsCell.appendChild(downloadButton);

                    row.appendChild(indexCell);
                    row.appendChild(titleCell);
                    row.appendChild(filenameCell);
                    row.appendChild(actionsCell);

                    racesTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Fehler beim Laden der Rennen:', error));
    }

    function editRace(filename) {
        window.location.href = `add_race.html?edit=${encodeURIComponent(filename)}`;
    }

    function deleteRace(filename) {
        if (protectedRaces.includes(filename)) {
            alert('Dieses Rennen kann nicht gelöscht werden.');
            return;
        }

        if (confirm('Sind Sie sicher, dass Sie dieses Rennen löschen möchten?')) {
            fetch(`delete_race.php?filename=${encodeURIComponent(filename)}`)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    window.location.reload(); // Seite neu laden, um aktualisierte Liste zu zeigen
                })
                .catch(error => console.error('Fehler beim Löschen der Rennen:', error));
        }
    }

    function downloadRace(filename) {
        const downloadLink = document.createElement('a');
        downloadLink.href = `races/${encodeURIComponent(filename)}`;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    editRaceButton.addEventListener('click', function () {
        const selectedRace = racesTableBody.querySelector('input[type="checkbox"]:checked');
        if (!selectedRace) {
            alert('Bitte wählen Sie ein Rennen zur Bearbeitung aus.');
            return;
        }

        editRace(selectedRace.value);
    });

    fetchRaces();
});
