<?php require ($_SERVER['DOCUMENT_ROOT'] . "/resources/page/page.php"); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>William Baker | Programming</title>
        
        <?php printHead(); ?>
        
        <style>
            .programming-icon
            {
                width: 30px;
                height: 30px;
                display: inline-block;
                background-repeat: no-repeat;
            }
            
            .html-brackets
            {
                background-image: url('data:image/svg+xml;utf8,<svg width="30" height="30" class="cell-middle" version="1.1" viewBox="0 0 14.552083 14.552084" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -282.45)"><path d="m6.0854 287.74-2.6458 1.8521v.26458l2.6458 1.8521" fill="none" stroke="#17c06c" stroke-width=".52917"/><path d="m8.4667 287.74 2.6458 1.8521v.26458l-2.6458 1.8521" fill="none" stroke="#17c06c" stroke-width=".52917"/></g></svg>');
            }
            
            .curley-brackets
            {
                background-image: url('data:image/svg+xml;utf8,<svg width="30" height="30" version="1.1" viewBox="0 0 14.552083 14.552084" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -282.45)"><text transform="scale(.97458 1.0261)" x="1.1575487" y="284.43738" fill="#17c06c" font-family="sans-serif" font-size="7.3156px" letter-spacing="0px" stroke-width=".18289" word-spacing="0px" style="line-height:4.57226276px" xml:space="preserve"><tspan x="1.1575487" y="284.43738" fill="#17c06c" stroke-width=".18289">{;}</tspan></text></g></svg>');
            }
            
            .database-icon
            {
                background-image: url('data:image/svg+xml;utf8,<svg width="30" height="30" version="1.1" viewBox="0 0 14.552083 14.552084" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -282.45)"><g transform="translate(7.9473e-8 .58891)"><g transform="matrix(.80018 0 0 .80018 .5287 56.653)"><g transform="translate(1.9819 -3.0431)"><g transform="translate(-.82766 .055391)" fill="#17c06c"><g transform="translate(.0020369 5.4775)"><ellipse cx="7.276" cy="289.34" rx="4.6302" ry=".79375" style="paint-order:stroke markers fill"/><ellipse cx="7.276" cy="292.26" rx="4.6302" ry=".79375" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".52917" style="paint-order:stroke markers fill"/><rect x="2.6458" y="289.33" width="9.2604" height="2.9104" style="paint-order:stroke markers fill"/></g><ellipse transform="translate(-1.9819 3.0431)" cx="9.2579" cy="289.47" rx="4.6302" ry=".79375" style="paint-order:stroke markers fill"/><ellipse transform="translate(-1.9819 3.0431)" cx="9.26" cy="291.38" rx="4.6302" ry=".79375" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9839" style="paint-order:stroke markers fill"/><rect transform="translate(-1.9819 3.0431)" x="4.6298" y="288.45" width="9.2604" height="2.9104" style="paint-order:stroke markers fill"/><ellipse cx="7.2781" cy="289.06" rx="4.6302" ry=".79375" style="paint-order:stroke markers fill"/><ellipse cx="7.2781" cy="291.12" rx="4.6302" ry=".79375" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9839" style="paint-order:stroke markers fill"/><rect x="2.6479" y="289.12" width="9.2604" height="1.9839" style="paint-order:stroke markers fill"/></g></g></g></g></g></svg>');
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
                        <p>
                            <a class="page-link" href="/about/">
                                <svg width="17" height="17" class="back-arrow" version="1.1" viewBox="0 0 4.2333332 4.2333334" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(0 -292.77)" fill="none" stroke="#fff">
                                        <path d="m1.5875 294.09-.79375.79375.79375.79375" stroke-width=".52917"/>
                                        <path d="m.79375 294.88h2.9104" stroke-width=".50664"/>
                                    </g>
                                </svg>
                                To about page...
                            </a>
                        </p>
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
                        <div>
                            <i class="programming-icon html-brackets cell-middle"></i>
                            <span>Node.js</span>
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
                            <i class="programming-icon database-icon cell-middle"></i>
                            <span>MySQL</span>
                        </div>
                        <div>
                            <i class="programming-icon database-icon cell-middle"></i>
                            <span>MSSQL</span>
                        </div>
                        <div>
                            <i class="programming-icon database-icon cell-middle"></i>
                            <span>Firebase</span>
                        </div>
                        <div>
                            <i class="programming-icon database-icon cell-middle"></i>
                            <span>MongoDB</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <?php printFooter(); ?>
    </body>
</html>