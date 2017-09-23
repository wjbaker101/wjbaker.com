<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Home</title>
        
        <?php printHead(); ?>
        
        <style>
            .sliding-background
            {
                height: calc(100vh - 90px);
                min-height: 216px;
                position: relative;
                overflow: hidden;
            }
            
            .sliding-background .panel
            {
                position: absolute;
                top: 0;
                bottom: 0;
                left: -50%;
                right: -50%;
                background-image: linear-gradient(-60deg, #176bc0 50%, #17c06c 50%);
                z-index: -1;
                opacity: 0.5;
                animation: sliding 16s ease-in-out infinite alternate;
            }
            
            @keyframes sliding
            {
                from { transform: translateX(-25%); }
                to { transform: translateX(25%); }
            }
            
            .sliding-background .panel:nth-child(2)
            {
                animation-direction:alternate-reverse;
                animation-duration:15s;
            }
            
            .sliding-background .panel:nth-child(3)
            {
                animation-duration:14s;
            }
            
            .logo-container
            {
                width: 100%;
                height: 100%;
            }
            
            .logo-container .logo-content
            {
                display: table;
                margin: 0 auto;
            }
            
            .logo
            {
                width: 100%;
                height: 90px;
            }
            
            .logo .name
            {
                fill: url(#background);
                text-anchor: middle;
                alignment-baseline: central;
                font-weight: bold;
                font-size: 6em;
                font-family: "Athiti", sans-serif;
                letter-spacing: 0;
            }
            
            @media (max-width: 540px)
            {
                .logo .name
                {
                    font-size: 4em;
                }
            }
        </style>
        
        <script></script>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <section class="sliding-background">
            <div class="panel"></div>
            <div class="panel"></div>
            <div class="logo-container cell-row">
                <div class="cell cell-middle hpadding-small text-centered">
                    <div class="logo-content vpadding-regular hpadding-regular bg-theme-l5">
                        <svg class="logo">
                            <defs>
                                <linearGradient id="background" x1="30%" y1="0%" x2="70%" y2="100%">
                                    <stop offset="0%" style="stop-color: #176bc0;" />
                                    <stop offset="100%" style="stop-color: #17c06c;" />
                                </linearGradient>
                            </defs>
                            <g>
                                <text class="name" x="50%" y="50%">Will Baker</text>
                            </g>
                        </svg>
                        <h2>Software Engineer and Web Developer</h2>
                    </div>
                </div>
            </div>
        </section>
        <?php printFooter(); ?>
    </body>
</html>