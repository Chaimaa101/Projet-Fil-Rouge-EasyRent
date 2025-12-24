<x-mail::message>
# Nouveau message de contact

**Nom :** {{ $data['nom'] }}  
**Email :** {{ $data['email'] }}  
**Pohone :** {{ $data['phone'] }}  

**Message :**  
{{ $data['message'] }}

<x-mail::button :url="'mailto:' . $data['email']">
Répondre à l'utilisateur
</x-mail::button>

Merci,<br>
{{ config('app.name') }}
</x-mail::message>
