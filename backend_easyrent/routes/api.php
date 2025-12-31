<?php

use App\Events\ReservationPaid;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehiculeController;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| Routes that can be accessed without authentication
|
*/
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/contact', [ContactController::class, 'contact']);

Route::get('/stripe/public-key', function () {
    return response()->json([
        'key' => config('services.stripe.public'),
    ]);
});

Route::get('vehicules', [VehiculeController::class, 'index']);
Route::get('vehicules/{vehicule}', [VehiculeController::class, 'show']);
Route::get('brands', [MarqueController::class, 'index']);
Route::get('categories', [MarqueController::class,'getCategories']); 
Route::get('getTopVehicules', [VehiculeController::class, 'getTopVehicules']);
Route::get('getPublicAvis', [AvisController::class, 'getPublicAvis']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('reservations', ReservationController::class)->except('store');
    Route::post('reservations/{vehicule}', [ReservationController::class, 'store']);

    Route::post('/create-payment/{reservation}', [PaymentController::class, 'createPayment']);
    Route::post('/confirmPayment/{reservation}', [PaymentController::class, 'confirmPayment']);
    Route::get('/getUserPaiments', [PaymentController::class, 'getUserPaiments']);

    Route::post('avis/{reservation}', [AvisController::class, 'store']);
    Route::apiResource('avis', AvisController::class)->except([ 'store']); 
    Route::apiResource('users',UserController::class)->only('show');

     Route::post('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/profile/password', [AuthController::class, 'updatePassword']);

     Route::get('/reservations/{reservation}/invoice', [InvoiceController::class, 'show']);
    Route::get('/reservations/{reservation}/invoice/download', [InvoiceController::class, 'download']);
    
    Route::get('/notifications', [AuthController::class, 'notifications']);
     Route::post('/notifications/{id}/read', [AuthController::class, 'markAsRead']);
});


Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::apiResource('users', UserController::class)->except('show');
    Route::apiResource('brands', MarqueController::class)->except(['index']); 
    Route::apiResource('vehicules', VehiculeController::class)->except(['index', 'show']); 
    Route::get('admin/Allreservations', [AdminController::class,'reservations']); 
    Route::get('admin/paiments', [AdminController::class,'paiments']); 
    Route::get('admin/avis', [AdminController::class,'avis']); 
    Route::get('admin/dashboard', [AdminController::class,'dashboard']); 
    Route::put('updateVehiculeStatus/{vehicule}', [AdminController::class,'updatevehiculeStatus']); 
   Route::patch('/admin/vehicules/{vehicule}/toggle-top', 
    [AdminController::class, 'toggleVehiculeIsTop']
); 
   Route::patch('/admin/avis/{avis}/toggle-public', 
    [AdminController::class, 'toggleAvisIsPublic']
);
});

Route::post('/test-confirm/{reservation}', function (Reservation $reservation) {
    event(new ReservationPaid($reservation));
    return response()->json(['ok']);
});
