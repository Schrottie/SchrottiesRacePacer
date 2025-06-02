<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link in Bio - Maik Bischoff</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body {
            background-color: #f8f9fa; /* Heller Hintergrund für Kontrast */
        }
        .profile-img {
            width: 150px;
            height: 150px;
            object-fit: cover; /* Stellt sicher, dass das Bild den Kreis ausfüllt */
        }
        .book-cover {
            width: 100%;
            aspect-ratio: 1 / 1; /* Sorgt für quadratische Bilder */
            object-fit: cover;
        }
        .card-body { /* Sorgt für eine bessere vertikale Ausrichtung */
             display: flex;
             flex-direction: column;
        }
        .card-body .btn-group-custom {
            margin-top: auto; /* Schiebt die Buttons an den unteren Rand der card-body */
        }
        .card-footer .price-info {
            font-size: 0.9rem;
        }
        .affiliate-notice {
            font-size: 0.75rem;
            color: #6c757d; /* Dezente Farbe */
            text-align: center;
            margin-top: 15px;
        }
        .icon-kuschel { /* Stellt sicher, dass Icons und Text auf einer Linie sind und etwas Abstand haben */
            display: flex;
            align-items: center;
        }
        .icon-kuschel .bi {
            margin-right: 0.4rem;
        }
    </style>
</head>
<body>
    <div class="container mt-5 mb-5" style="max-width: 800px;">
        <header class="text-center mb-5">
            <img src="https://maik-bischoff.de/wp-content/uploads/2022/10/IMG20220403155420-01-scaled.jpeg" alt="Foto von Maik Bischoff" class="rounded-circle profile-img mb-3">
            <h1>Maik Bischoff</h1>
            <p class="lead text-muted">Krimis aus Spandau</p>
        </header>

        <div class="row g-4">
            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <img src="https://i0.wp.com/maik-bischoff.de/wp-content/uploads/2021/01/IMG_20210108_110154-01-scaled.jpeg" class="card-img-top book-cover" alt="Buchcover Die Seeburg-Verschwörung">
                    <div class="card-body">
                        <h5 class="card-title">Die Seeburg-Verschwörung</h5>
                        <p class="card-text">Ein Fall für Böhme & Dost</p>
                        <div class="d-grid gap-2 btn-group-custom">
                           <a href="https://amzn.to/3HhXrry" target="_blank" class="btn btn-primary"><i class="bi bi-book"></i> Taschenbuch kaufen*</a>
                           <a href="https://amzn.to/43S6Xu4" target="_blank" class="btn btn-secondary"><i class="bi bi-tablet-landscape"></i> E-Book kaufen*</a>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-book"></i> <span>8,99€</span>
                            </div>
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-tablet-landscape"></i> <span>0,99€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <img src="https://i0.wp.com/maik-bischoff.de/wp-content/uploads/2021/01/IMG_20210108_110218-01-scaled.jpeg" class="card-img-top book-cover" alt="Buchcover Nachts am Teufelsberg">
                    <div class="card-body">
                        <h5 class="card-title">Nachts am Teufelsberg</h5>
                        <p class="card-text">Ein neuer Fall für Böhme & Dost</p>
                        <div class="d-grid gap-2 btn-group-custom">
                            <a href="https://amzn.to/4dHBhuX" target="_blank" class="btn btn-primary"><i class="bi bi-book"></i> Taschenbuch kaufen*</a>
                            <a href="https://amzn.to/455Ul3P" target="_blank" class="btn btn-secondary"><i class="bi bi-phone"></i> E-Book kaufen*</a>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-book"></i> <span>11,99€</span>
                            </div>
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-phone"></i> <span>0,99€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <img src="https://i0.wp.com/maik-bischoff.de/wp-content/uploads/2021/01/IMG_20210108_110205-01-scaled.jpeg" class="card-img-top book-cover" alt="Buchcover Mord Hahneberg">
                    <div class="card-body">
                        <h5 class="card-title">Mord Hahneberg</h5>
                        <p class="card-text">Der dritte Fall für Böhme & Dost</p>
                        <div class="d-grid gap-2 btn-group-custom">
                           <a href="https://amzn.to/3HvvLiM" target="_blank" class="btn btn-primary"><i class="bi bi-book"></i> Taschenbuch kaufen*</a>
                           <a href="https://amzn.to/4kA7tlW" target="_blank" class="btn btn-secondary"><i class="bi bi-tablet-landscape"></i> E-Book kaufen*</a>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-book"></i> <span>10,99€</span>
                            </div>
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-tablet-landscape"></i> <span>0,99€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <img src="https://i0.wp.com/maik-bischoff.de/wp-content/uploads/2022/09/IMG20220923163954-01-scaled.jpeg" class="card-img-top book-cover" alt="Buchcover Menschenfischer">
                    <div class="card-body">
                        <h5 class="card-title">Menschenfischer</h5>
                        <p class="card-text">Mansfeld & Jensens erster Fall</p>
                        <div class="d-grid gap-2 btn-group-custom">
                            <a href="https://amzn.to/4mVzW87" target="_blank" class="btn btn-primary"><i class="bi bi-book"></i> Taschenbuch kaufen*</a>
                            <a href="https://amzn.to/3SZJ3GQ" target="_blank" class="btn btn-secondary"><i class="bi bi-tablet-landscape"></i> E-Book kaufen*</a>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-book"></i> <span>14,99€</span>
                            </div>
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-tablet-landscape"></i> <span>5,99€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <img src="https://i0.wp.com/maik-bischoff.de/wp-content/uploads/2024/11/wp-17318081758662372478685061535947.jpg" class="card-img-top book-cover" alt="Buchcover Rest in Kies">
                    <div class="card-body">
                        <h5 class="card-title">Rest in Kies</h5>
                        <p class="card-text">Ein neuer Fall für Mansfeld & Jensen</p>
                        <div class="d-grid gap-2 btn-group-custom">
                            <a href="https://amzn.to/4dI80QT" target="_blank" class="btn btn-primary"><i class="bi bi-book"></i> Taschenbuch kaufen*</a>
                            <a href="https://amzn.to/4kfglh9" target="_blank" class="btn btn-secondary"><i class="bi bi-tablet-landscape"></i> E-Book kaufen*</a>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-book"></i> <span>11,99€</span>
                            </div>
                            <div class="price-info icon-kuschel">
                                <i class="bi bi-tablet-landscape"></i> <span>3,99€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <p class="affiliate-notice mt-4">
            *Bei den mit Sternchen gekennzeichneten Links handelt es sich um Affiliate-Links. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Für dich entstehen dadurch keine zusätzlichen Kosten.
        </p>

        <footer class="text-center mt-5 pt-3 border-top">
            <p>&copy; <script>document.write(new Date().getFullYear())</script> Maik Bischoff | <a href="https://maik-bischoff.de/impressum/" class="text-decoration-none">Impressum</a></p>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>