<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture #{{ $reservation->id }}</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #000;
            margin: 20px;
        }

        .container {
            max-width: 800px;
            margin: auto;
        }

        h1 {
            font-size: 22px;
            margin-bottom: 5px;
        }

        .muted {
            color: #666;
            font-size: 13px;
        }

        .row {
            margin-bottom: 20px;
        }

        .flex {
            display: flex;
            justify-content: space-between;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        th {
            background: #f5f5f5;
            text-align: left;
        }

        .text-right {
            text-align: right;
        }

        .total {
            font-weight: bold;
        }

        footer {
            margin-top: 40px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="container">

 
    <div class="row flex">
        <div>
            <img src="{{ public_path('logo-bg.png') }}" width="120">
            <h1>FACTURE</h1>
            <div class="muted">N° {{ $reservation->id }}</div>
            <div class="muted">Date : {{ $reservation->created_at->format('d/m/Y') }}</div>
        </div>
        <div>
            <strong>EasyRent</strong><br>
            easyrent@service.com
        </div>
    </div>

    <!-- CLIENT -->
    <div class="row">
        <strong>Client</strong><br>
        {{ $reservation->user->nom }} {{ $reservation->user->prenom }}<br>
        {{ $reservation->user->email }} <br>
        {{ $reservation->user->details->tel }}
    </div>

    <!-- VEHICULE -->
    <div class="row">
        <strong>Véhicule</strong><br>
        {{ $reservation->vehicule->marque->nom ?? '' }}
        {{ $reservation->vehicule->nom ?? '' }}<br>
        Couleur : {{ $reservation->vehicule->color ?? 'N/A' }}
    </div>

    <!-- TABLE -->
    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Prix / jour</th>
                <th>Jours</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Location véhicule</td>
                <td>{{ number_format($reservation->vehicule->prix_day ?? 0, 2) }} DH</td>
                <td>{{ $reservation->days }}</td>
                <td>
                    {{ number_format(
                        ($reservation->vehicule->prix_day ?? 0) * $reservation->days,
                        2
                    ) }} DH
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="total">
                <td colspan="3" class="text-right">TOTAL</td>
                <td>{{ number_format($reservation->total_price, 2) }} DH</td>
            </tr>
        </tfoot>
    </table>

    <footer>
        Merci pour votre confiance.<br>
        Facture générée automatiquement.
    </footer>

</div>

</body>
</html>
