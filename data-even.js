// data-even.js
// VP-Daten inklusive Cutoff-Zeiten für die Staffeln

const gdUZSWerte = [
    { vp: 'Start - Erika-Hess-Stadion', kilometer: 0, cutoff: '07:00', open: '04:00', close: '08:30', cutoff2er: '-', cutoff4er: '-', cutoff10er: '-' },
    { vp: 'VP 1 - Mauerpark', kilometer: 4.5, cutoff: '07:50', open: '06:05', close: '08:45', cutoff2er: '07:45', cutoff4er: '08:14', cutoff10er: '08:43' },
    { vp: 'VP 2 - S-Bahnhof Wilhelmsruh', kilometer: 10, cutoff: '08:51', open: '06:30', close: '09:40', cutoff2er: '08:40', cutoff4er: '09:08', cutoff10er: '09:37' },
    { vp: 'VP 3 - Lübars', kilometer: 15.6, cutoff: '09:51', open: '07:00', close: '10:35', cutoff2er: '09:36', cutoff4er: '10:04', cutoff10er: '10:31' },
    { vp: 'VP 4 - Oranienburger Chaussee', kilometer: 21.1, cutoff: '11:00', open: '07:25', close: '11:25', cutoff2er: '10:32', cutoff4er: '10:58', cutoff10er: '11:24' },
    { vp: 'VP 5 - Naturschutzturm', kilometer: 26.1, cutoff: '12:18', open: '07:50', close: '12:15', cutoff2er: '11:22', cutoff4er: '11:47', cutoff10er: '12:13' },
    { vp: 'VP 6 - Frohnau', kilometer: 31.2, cutoff: '13:36', open: '08:15', close: '13:05', cutoff2er: '12:13', cutoff4er: '12:37', cutoff10er: '13:02' },
    { vp: 'VP 7/WP 1 - Ruderclub Oberhavel', kilometer: 36.6, cutoff: '14:42', open: '08:40', close: '14:00', cutoff2er: '13:08', cutoff4er: '13:31', cutoff10er: '13:55' },
    { vp: 'VP 8 - Grenzturm Nieder Neuendorf', kilometer: 41.4, cutoff: '15:51', open: '09:00', close: '14:45', cutoff2er: '13:57', cutoff4er: '14:18', cutoff10er: '14:41' },
    { vp: 'VP 9 - Schönwalde', kilometer: 48.9, cutoff: '17:01', open: '09:40', close: '15:55', cutoff2er: '15:12', cutoff4er: '15:32', cutoff10er: '15:54' },
    { vp: 'VP 10 - Falkenseer Chaussee', kilometer: 54.6, cutoff: '18:18', open: '10:05', close: '16:50', cutoff2er: '16:10', cutoff4er: '16:29', cutoff10er: '16:49' },
    { vp: 'VP 11 - Karolinenhöhe', kilometer: 61, cutoff: '19:34', open: '10:35', close: '17:55', cutoff2er: '17:14', cutoff4er: '17:32', cutoff10er: '17:51' },
    { vp: 'VP 12 - Pagel & Friends', kilometer: 66, cutoff: '20:36', open: '11:00', close: '18:40', cutoff2er: '18:04', cutoff4er: '18:21', cutoff10er: '18:40' },
    { vp: 'VP 13/WP 2 - Schloss Sacrow', kilometer: 73.6, cutoff: '21:47', open: '11:35', close: '19:55', cutoff2er: '19:21', cutoff4er: '19:36', cutoff10er: '19:53' },
    { vp: 'VP 14 - Revierförsterei Krampnitz', kilometer: 79.9, cutoff: '23:13', open: '12:05', close: '20:55', cutoff2er: '20:24', cutoff4er: '20:38', cutoff10er: '20:54' },
    { vp: 'VP 15 - Brauhaus Meierei', kilometer: 85.5, cutoff: '00:09', open: '12:30', close: '21:50', cutoff2er: '21:21', cutoff4er: '21:34', cutoff10er: '21:49' },
    { vp: 'VP 16 - Gedenkstätte Griebnitzsee', kilometer: 92.3, cutoff: '01:22', open: '13:00', close: '22:55', cutoff2er: '22:29', cutoff4er: '22:41', cutoff10er: '22:54' },
    { vp: 'VP 17 - Königsweg', kilometer: 99.2, cutoff: '02:25', open: '13:35', close: '00:05', cutoff2er: '23:39', cutoff4er: '23:49', cutoff10er: '00:01' },
    { vp: 'VP 18/WP 3 - Sportplatz Teltow', kilometer: 105.4, cutoff: '03:49', open: '14:05', close: '01:05', cutoff2er: '00:41', cutoff4er: '00:50', cutoff10er: '01:01' },
    { vp: 'VP xx - Privat-VP - Paul-Gerhardt-Straße', kilometer: 108.8, cutoff: '', open: '14:00', close: '01:00', cutoff2er: '', cutoff4er: '', cutoff10er: '' },
    { vp: 'VP 19 - Osdorfer Straße', kilometer: 111.9, cutoff: '04:42', open: '14:35', close: '02:15', cutoff2er: '01:46', cutoff4er: '01:54', cutoff10er: '02:04' },
    { vp: 'VP 20 - Ninas Eltern', kilometer: 118, cutoff: '05:48', open: '15:05', close: '03:25', cutoff2er: '02:48', cutoff4er: '02:54', cutoff10er: '03:04' },
    { vp: 'VP 21 - Buckow', kilometer: 126.5, cutoff: '06:49', open: '15:45', close: '05:10', cutoff2er: '04:13', cutoff4er: '04:18', cutoff10er: '04:26' },
    { vp: 'VP 22 - Rudow', kilometer: 133.6, cutoff: '07:43', open: '16:20', close: '06:35', cutoff2er: '05:25', cutoff4er: '05:28', cutoff10er: '05:35' },
    { vp: 'VP 23 - Johannisthaler Chaussee', kilometer: 139.5, cutoff: '08:49', open: '16:50', close: '07:45', cutoff2er: '06:24', cutoff4er: '06:26', cutoff10er: '06:32' },
    { vp: 'VP 24 - Dammweg', kilometer: 145.1, cutoff: '09:58', open: '17:15', close: '08:50', cutoff2er: '07:20', cutoff4er: '07:22', cutoff10er: '07:26' },
    { vp: 'VP 25 - East Side Gallery', kilometer: 150.8, cutoff: '11:07', open: '17:45', close: '10:00', cutoff2er: '08:18', cutoff4er: '08:18', cutoff10er: '08:22' },
    { vp: 'VP 26 - Checkpoint Charlie', kilometer: 155.6, cutoff: '12:00', open: '18:05', close: '10:55', cutoff2er: '09:06', cutoff4er: '09:06', cutoff10er: '09:08' },
    { vp: 'Ziel - Erika-Hess-Stadion', kilometer: 161.3, cutoff: '12:00', open: '18:00', close: '12:00', cutoff2er: '10:00', cutoff4er: '10:00', cutoff10er: '10:00' }
];
