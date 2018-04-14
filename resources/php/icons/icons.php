<?php

/**
 * Provides a way of getting the SVG contents of icons found in the icons folder.<br>
 * 
 * Icons made by Anton Saputro from flaticon.com is licensed by CC 3.0.
 */
class Icons
{
    /**
     * Gets the location of the icon in the icons folder.
     * 
     * @param  String $icon File name of the icon to be found.
     * @return String Full location of the icon.
     */
    private static function getIconLocation($icon)
    {
        return ($_SERVER['DOCUMENT_ROOT'] . '/resources/images/icons/' . $icon);
    }
    
    /**
     * Gets the SVG of the home icon.
     * 
     * @return String SVG of the icon.
     */
    public static function home()
    {
        $icon = file_get_contents(self::getIconLocation('home.svg'));
        
        return $icon;
    }
    
    /**
     * Gets the SVG of the projects icon.
     * 
     * @return String SVG of the icon.
     */
    public static function projects()
    {
        $icon = file_get_contents(self::getIconLocation('projects.svg'));
        
        return $icon;
    }
    
    /**
     * Gets the SVG of the blog icon.
     * 
     * @return String SVG of the icon.
     */
    public static function blog()
    {
        $icon = file_get_contents(self::getIconLocation('blog.svg'));
        
        return $icon;
    }
    
    /**
     * Gets the SVG of the user icon.
     * 
     * @return String SVG of the icon.
     */
    public static function user()
    {
        $icon = file_get_contents(self::getIconLocation('user.svg'));
        
        return $icon;
    }
    
    /**
     * Gets the SVG of the edit icon.
     * 
     * @return String SVG of the icon.
     */
    public static function edit()
    {
        $icon = file_get_contents(self::getIconLocation('edit.svg'));
        
        return $icon;
    }
}

?>