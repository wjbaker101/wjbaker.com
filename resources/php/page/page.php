<?php

class Page
{
    private static function getFile($file)
    {
        return ($_SERVER['DOCUMENT_ROOT'] . "/resources/php/page/{$file}");
    }
    
    public static function nav()
    {
        require_once(self::getFile('nav.php'));
    }
    
    public static function header($title)
    {
        require_once(self::getFile('header.php'));
    }
    
    public static function meta()
    {
        require_once(self::getFile('meta.php'));
    }
    
    public static function footer()
    {
        require_once(self::getFile('footer.php'));
    }
    
    public static function style()
    {
        require_once(self::getFile('style.php'));
    }
    
    public static function scripts()
    {
        require_once(self::getFile('scripts.php'));
    }
}

?>