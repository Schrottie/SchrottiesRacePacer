document.addEventListener('DOMContentLoaded', function () {
    const racesTableBody = document.querySelector('#racesTable tbody');
    let protectedRaces = []; // Liste der geschützten Rennen

    function fetchRaces() {
        fetch('list_races.php')
            .then(response => response.json())
            .then(data => {
                // Rennen sortieren: Zuerst nach pinned, dann alphabetisch
                data.sort((a, b) => {
                    if (a.pinned && !b.pinned) return -1; // a ist gepinnt, b nicht
                    if (!a.pinned && b.pinned) return 1;  // b ist gepinnt, a nicht
                    return a.fullName.localeCompare(b.fullName); // Alphabetisch sortieren
                });

                let rowIndex = 1; // Zähler für die Reihenfolge

                // Liste der geschützten Rennen (gepinnte Rennen)
                protectedRaces = data.filter(race => race.pinned).map(race => `${race.filename}`);
                
               // Debug: Ausgabe der Liste der geschützten Rennen
               console.log('Gepinnte Rennen:', protectedRaces);

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

    fetchRaces();
});
