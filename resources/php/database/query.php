<?php

require_once ('queries.php');

class Query
{
    private static function isBlank($parameter)
    {
        return ($parameter === null) || (strlen($parameter) === 0);
    }
    
    public static function getBlogPosts()
    {
        return Queries::getBlogPosts();
    }
    
    public static function getBlogPost($id)
    {
        if (self::isBlank($id))
        {
            return new Response('failed_id', 'The ID of the post cannot be blank.', 'error');
        }
        
        return Queries::getBlogPost($id);
    }
    
    public static function updateBlogPost($id, $title, $blogContent)
    {
        if (self::isBlank($id))
        {
            return new Response('failed_id', 'The ID of the post cannot be blank.', 'error');
        }
        
        if (self::isBlank($title))
        {
            return new Response('failed_title', 'The title of the post cannot be blank.', 'error');
        }
        
        if (self::isBlank($blogContent))
        {
            return new Response('failed_content', 'The content of the post cannot be blank.', 'error');
        }
        
        return Queries::updateBlogPost($id, $title, $blogContent);
    }
    
    public static function login($username, $password)
    {
        if (self::isBlank($username))
        {
            return new Response('failed_username', 'The username cannot be blank.', 'error');
        }
        
        if (self::isBlank($password))
        {
            return new Response('failed_password', 'The password cannot be blank.', 'error');
        }
        
        return Queries::login($username, $password);
    }
    
    public static function signup($username, $password1, $password2)
    {
        if (self::isBlank($username))
        {
            return new Response('failed_username', 'The username cannot be blank.', 'error');
        }
        
        if (self::isBlank($password1))
        {
            return new Response('failed_password1', 'The password cannot be blank.', 'error');
        }
        
        if (self::isBlank($password2))
        {
            return new Response('failed_password2', 'The confirmation password cannot be blank.', 'error');
        }
        
        if ($password1 !== $password2)
        {
            return new Response('failed_passwords', 'The passwords do not match.', 'error');
        }
        
        return Queries::signup($username, $password1);
    }

    public static function getProjects()
    {
        return Queries::getProjects();
    }
    
    public static function getProject($id)
    {
        if (self::isBlank($id))
        {
            return new Response('failed_id', 'The project ID cannot be blank.', 'error');
        }
        
        return Queries::getProject($id);
    }
}

?>