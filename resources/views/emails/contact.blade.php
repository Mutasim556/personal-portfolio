<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Portfolio Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    <h2>New Contact Inquiry from Portfolio Website</h2>
    <p><strong>Name:</strong> {{ $contactData['name'] }}</p>
    <p><strong>Email:</strong> {{ $contactData['email'] }}</p>
    @if(!empty($contactData['website']))
        <p><strong>Website:</strong> <a href="{{ $contactData['website'] }}">{{ $contactData['website'] }}</a></p>
    @endif
    <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
    <p><strong>Message:</strong></p>
    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #7c3aed; border-radius: 4px; white-space: pre-wrap;">
{{ $contactData['message'] }}
    </div>
</body>
</html>
