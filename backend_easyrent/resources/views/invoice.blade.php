<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $reservation->id }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; color: #333; }
        .header { text-align: center; margin-bottom: 20px; }
        .invoice-details, .user-details, .vehicle-details { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        .total { font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Invoice #{{ $reservation->id }}</h1>
        <p>Date: {{ $reservation->created_at->format('d/m/Y') }}</p>
    </div>

    <div class="user-details">
        <h3>Client Information</h3>
        <p>Name: {{ $reservation->user->nom }} {{ $reservation->user->prenom }}</p>
        <p>Email: {{ $reservation->user->email }}</p>
    </div>

    <div class="vehicle-details">
        <h3>Vehicle Information</h3>
        <p>Model: {{ $reservation->vehicule->nom ?? 'N/A' }}</p>
        <p>Brand: {{ $reservation->vehicule->marque->nom ?? 'N/A' }}</p>
        <p>Color: {{ $reservation->vehicule->color ?? 'N/A' }}</p>
    </div>

    <div class="invoice-details">
        <h3>Reservation Details</h3>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Price per day</th>
                    <th>Days</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $reservation->vehicule->nom ?? 'N/A' }}</td>
                    <td>${{ number_format($reservation->vehicule->prix_day ?? 0, 2) }}</td>
                    <td>{{ $reservation->days ?? 1 }}</td>
                    <td>${{ number_format(($reservation->vehicule->prix_day ?? 0) * ($reservation->days ?? 1), 2) }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="total">Total</td>
                    <td class="total">${{ number_format(($reservation->total_pric), 2) }}</td>
                </tr>
            </tfoot>
        </table>
    </div>

    <p>Thank you for choosing our service!</p>
</body>
</html>
