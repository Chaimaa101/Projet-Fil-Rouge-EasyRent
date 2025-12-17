<x-mail::message>
 {{ $maildata['title']}}

{{ $maildata['body']}}
<x-mail::button :url="$maildata['url']">
Confirmer
</x-mail::button>

Cordialement,<br>
{{ config('app.name') }}
</x-mail::message>
