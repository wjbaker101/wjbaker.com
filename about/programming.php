<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Programming</title>
        
        <?php printHead(); ?>
        
        <style>
            .programming-icon
            {
                width: 45px;
                height: 45px;
                display: inline-block;
            }
            
            .html-brackets
            {
                background-image: url('data:image/svg+xml;utf8,<svg width="45" height="45" class="cell-middle" version="1.1" viewBox="0 0 14.552083 14.552084" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -282.45)"><path d="m6.0854 287.74-2.6458 1.8521v.26458l2.6458 1.8521" fill="none" stroke="#17c06c" stroke-width=".52917"/><path d="m8.4667 287.74 2.6458 1.8521v.26458l-2.6458 1.8521" fill="none" stroke="#17c06c" stroke-width=".52917"/></g></svg>');
            }
            
            .curley-brackets
            {
                background-image: url('data:image/svg+xml;utf8,<svg width="45" height="45" version="1.1" viewBox="0 0 14.552083 14.552084" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -282.45)"><text transform="scale(.97458 1.0261)" x="1.1575487" y="284.43738" fill="#17c06c" font-family="sans-serif" font-size="7.3156px" letter-spacing="0px" stroke-width=".18289" word-spacing="0px" style="line-height:4.57226276px" xml:space="preserve"><tspan x="1.1575487" y="284.43738" fill="#17c06c" stroke-width=".18289">{;}</tspan></text></g></svg>');
            }
        </style>
        
        <script></script>
    </head>
    
    <body>
        <?php printHeader(); ?>
        <div class="main-page hpadding-small">
            <div class="content-width vpadding-regular">
                <section class="cell-row section">
                    <div class="cell l12 vpadding-large hpadding-regular bg-secondary text-centered">
                        <h1 class="fancy-header">Programming</h1>
                    </div>
                </section>
                <section class="cell-row section title-bar">
                    <div class="cell l12 vpadding-small hpadding-regular bg-theme-d5">
                        <p><a class="return-link" href="/about/">To about page...</a></p>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Web Development</h2>
                        <div>
                            <i class="programming-icon html-brackets cell-middle"></i>
                            <span>HTML5</span>
                        </div>
                        <div>
                            <i class="programming-icon html-brackets cell-middle"></i>
                            <span>CSS3</span>
                        </div>
                        <div>
                            <i class="programming-icon html-brackets cell-middle"></i>
                            <span>ES6 (JavaScript)</span>
                        </div>
                        <div>
                            <i class="programming-icon html-brackets cell-middle"></i>
                            <span>PHP</span>
                        </div>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Software Development</h2>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>C#</span>
                        </div>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>Java</span>
                        </div>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>C/ C++</span>
                        </div>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>Visual Basic</span>
                        </div>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>Pascal</span>
                        </div>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>Haskell</span>
                        </div>
                    </div>
                </section>
                <section class="cell-row section scroll-fade-in">
                    <div class="cell l12 vpadding-large hpadding-regular bg-white">
                        <h2>Databases</h2>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>MySQL</span>
                        </div>
                        <div>
                            <i class="programming-icon curley-brackets cell-middle"></i>
                            <span>MSSQL</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>