<?php

namespace App\Listeners;

use App\Events\VehiculeCreated;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Queue\InteractsWithQueue;

class UploadVehiculeImages
{

    use InteractsWithQueue;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
       public function handle(VehiculeCreated $event)
    {
        foreach ($event->images as $image) {

            $uploaded = Cloudinary::upload(
                $image->getRealPath(),
                ['folder' => 'vehicules']
            );

            $event->vehicule->images()->create([
                'path' => $uploaded->getSecurePath(),
                'public_id' => $uploaded->getPublicId(),
            ]);
        }
    }
}
