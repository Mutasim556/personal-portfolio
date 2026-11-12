<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $siteSetting = \App\Models\ProfileSetting::first();
            $faviconUrl = $siteSetting?->favicon_url ?? asset('favicon.ico');
        @endphp
        <link rel="icon" href="{{ $faviconUrl }}" sizes="any">
        <link rel="icon" href="{{ $faviconUrl }}" type="image/svg+xml">
        <link rel="apple-touch-icon" href="{{ $faviconUrl }}">

        @if(($page['component'] ?? '') === 'Home')
        <!-- Visiblo Theme Stylesheets (Only loaded for public portfolio) -->
        <style>
            html, body {
                background-color: #000000 !important;
                color: #ffffff !important;
                margin: 0;
                padding: 0;
            }
        </style>
        <link rel="stylesheet" href="{{ asset('theme/css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('theme/icon-fonts/remixicon/remixicon.css') }}">
        <link rel="stylesheet" href="{{ asset('theme/css/swiper.css') }}">
        <link rel="stylesheet" href="{{ asset('theme/css/magnific.css') }}">
        <link rel="stylesheet" href="{{ asset('theme/css/colors/purple.css') }}">
        <link rel="stylesheet" href="{{ asset('theme/css/main.css') }}">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @else
        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <!-- Google Fonts Inter -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @endif

        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="{{ ($page['component'] ?? '') === 'Home' ? '' : 'font-sans antialiased' }}">
        <x-inertia::app />
    </body>
</html>
