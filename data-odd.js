// data-odd.js
// VP-Daten, ohne Staffel-Cutoff-Zeiten

const imUZSWerte  = [
    { vp: 'Start - Erika-Hess-Stadion', kilometer: 0, cutoff: '07:00', open: '04:00', close: '08:30' },
    { vp: 'VP 1 - Checkpoint Charlie', kilometer: 5.7, cutoff: '07:50', open: '06:10', close: '08:55' },
    { vp: 'VP 2 - East Side Gallery', kilometer: 10.4, cutoff: '08:51', open: '06:30', close: '09:40' },
    { vp: 'VP 3 - Dammweg', kilometer: 16.2, cutoff: '09:51', open: '07:00', close: '10:40' },
    { vp: 'VP 4 - Johannisthaler Chaussee', kilometer: 21.9, cutoff: '11:00', open: '07:25', close: '11:35' },
    { vp: 'VP 5 - Imbiss „Am Ziel“', kilometer: 28.5, cutoff: '12:18', open: '07:50', close: '12:40' },
    { vp: 'VP 6 - Buckow', kilometer: 35.9, cutoff: '13:36', open: '08:25', close: '13:50' },
    { vp: 'VP 7 - Ninas Eltern', kilometer: 43.3, cutoff: '14:42', open: '09:00', close: '15:00' },
    { vp: 'VP 8 - Osdorfer Straße', kilometer: 49.6, cutoff: '15:51', open: '09:30', close: '16:00' },
    { vp: 'VP xx - Privat-VP - Paul-Gerhardt-Straße', kilometer: 52.7, cutoff: '', open: '09:30', close: '16:00' },
    { vp: 'VP 9/WP 1 - Sportplatz Teltow', kilometer: 56.1, cutoff: '17:01', open: '10:00', close: '17:05' },
    { vp: 'VP 10 - Königsweg', kilometer: 62.3, cutoff: '18:18', open: '10:25', close: '18:05' },
    { vp: 'VP 11 - Gedenkstätte Griebnitzsee', kilometer: 69.2, cutoff: '19:34', open: '11:00', close: '19:10' },
    { vp: 'VP 12 - Brauhaus Meierei', kilometer: 75.9, cutoff: '20:36', open: '11:25', close: '20:15' },
    { vp: 'VP 13 - Revierförsterei Krampnitz', kilometer: 81.5, cutoff: '21:47', open: '11:55', close: '21:10' },
    { vp: 'VP 14/WP 2 - Schloss Sacrow', kilometer: 87.8, cutoff: '23:13', open: '12:20', close: '22:10' },
    { vp: 'VP 15 - Pagel & Friends', kilometer: 95.4, cutoff: '00:09', open: '12:55', close: '23:25' },
    { vp: 'VP 16 - Karolinenhöhe', kilometer: 100.4, cutoff: '01:22', open: '13:15', close: '00:15' },
    { vp: 'VP 17 - Falkenseer Chaussee', kilometer: 106.9, cutoff: '02:25', open: '13:45', close: '01:25' },
    { vp: 'VP 18 - Schönwalde', kilometer: 112.5, cutoff: '03:49', open: '14:15', close: '02:25' },
    { vp: 'VP 19 - Grenzturm Nieder Neuendorf', kilometer: 120, cutoff: '04:42', open: '14:45', close: '03:50' },
    { vp: 'VP 20/WP 3 - Ruderclub Oberhavel', kilometer: 124.7, cutoff: '05:48', open: '15:05', close: '04:45' },
    { vp: 'VP 21 - Frohnau', kilometer: 130.1, cutoff: '06:49', open: '15:30', close: '05:50' },
    { vp: 'VP 22 - Naturschutzturm', kilometer: 135.3, cutoff: '07:43', open: '15:55', close: '06:50' },
    { vp: 'VP 23 - Oranienburger Chaussee', kilometer: 139.8, cutoff: '08:49', open: '16:15', close: '07:45' },
    { vp: 'VP 24 - Lübars', kilometer: 145.3, cutoff: '09:58', open: '16:40', close: '08:50' },
    { vp: 'VP 25 - Bahnhof Wilhelmsruh', kilometer: 151, cutoff: '11:07', open: '17:05', close: '10:00' },
    { vp: 'VP 26 - Mauerpark', kilometer: 156.8, cutoff: '12:00', open: '17:30', close: '11:10' },
    { vp: 'Ziel - Erika-Hess-Stadion', kilometer: 161.3, cutoff: '12:00', open: '18:00', close: '12:00' }
];
