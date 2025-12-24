<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function contact(ContactRequest $request){
        $validateInfo = $request->validated();
          Mail::to('afkirshaimaa101@gmail.com')
        ->queue(new ContactMessageMail(
             $validateInfo
        ));

    return response()->json([
        'message' => 'Votre message a été envoyé avec succès.'
    ]);
    }
}
