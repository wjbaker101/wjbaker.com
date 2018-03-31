<?php

// Requires code for connecting to the database
require_once ('connection.php');

// Requires code containing the Response object
require_once ('response.php');

$databaseErrorResponse = new Response('failed_database', 'An error occured whilst connecting to the database.', 'error');
$queryErrorResponse = new Response('failed_query', 'An error occured whilst querying the database.', 'error');

$successfulResponse = new Response('success', 'Success!', 'success');

class Queries
{
    /**
     * Prepares the given text so that it is clean when inserting into the SQL query.
     * 
     * @param  String $text The text to clean.
     * @param  Boolean [$stripTags = true] Whether or not to remove any HTML tags found in the text.
     * @return String Cleaned text.
     */
    private static function getCleanText($text, $stripTags = true)
    {
        global $connection;
        
        $cleanText = $text;
        
        // Removes any HTML tags found in the text
        if ($stripTags) $cleanText = strip_tags($text);
        
        // Replaces any special characters to the HTML code equivalant
        $cleanText = htmlspecialchars($cleanText);
        
        // Escapes special characters using mysqli
        $cleanText = mysqli_real_escape_string($connection, $cleanText);
        
        return $cleanText;
    }
    
    /**
     * Queries the database, retrieving all blog posts.
     * 
     * @return Response Object containing the response, including blog posts if successful.
     */
    public static function getBlogPosts()
    {
        global $connection;
        
        if (!$connection) return $GLOBALS['databaseErrorResponse'];
        
        $sql = 'SELECT * FROM BlogPosts';
        
        $result = $connection->query($sql);
        
        if (!$result) return $GLOBALS['queryErrorResponse'];
        
        $posts = $result->fetch_all(MYSQLI_ASSOC);
        
        return $GLOBALS['successfulResponse']->setMessage('Sucessfully found blog posts.')->setContents($posts);
    }
    
    /**
     * Queries the database, retrieving a blog post with the given Blog ID.
     * 
     * @param  String $id Blog ID of the post to get information about.
     * @return Response Object containing the response, including the blog post if successful.
     */
    public static function getBlogPost($id)
    {
        global $connection;
        
        if (!$connection) return $GLOBALS['databaseErrorResponse'];
        
        $cleanId = self::getCleanText($id);
        
        $sql = "SELECT * FROM BlogPosts WHERE BlogID='{$cleanId}'";
        
        $result = $connection->query($sql);
        
        if (!$result) return $GLOBALS['queryErrorResponse'];
        
        $post = $result->fetch_assoc();
        
        return $GLOBALS['successfulResponse']->setMessage('Successfully found blog post.')->setContents($post);
    }
    
    public static function login($username, $password)
    {
        global $connection;
        
        if (!$connection) return $GLOBALS['databaseErrorResponse'];
        
        $cleanUsername = self::getCleanText($username);
        $cleanPassword = self::getCleanText($password);
        
        $values = 'UserID, Username, Password';
        
        $sql = "SELECT {$values} FROM Users WHERE Username='{$cleanUsername}'";
        
        $result = $connection->query($sql);
        
        if (!$result) return $GLOBALS['queryErrorResponse'];
        
        if ($result->num_rows === 0)
        {
            return new Response('failed_invalid_user', 'Sorry, these credentials are invalid.', 'error');
        }
        
        $user = $result->fetch_assoc();
        
        if (!password_verify($cleanPassword, $user['Password']))
        {
            return new Response('failed_invalid_user', 'Sorry, these credentials are invalid.', 'error');
        }
        
        return $GLOBALS['successfulResponse']->setMessage('Successfully logged you in!');
    }
    
    public static function signup($username, $password)
    {
        global $connection;
        
        if (!$connection) return $GLOBALS['databaseErrorResponse'];
        
        $cleanUsername = self::getCleanText($username);
        $cleanPassword = self::getCleanText($password);
        
        $hashedPassword = password_hash($cleanPassword, PASSWORD_DEFAULT);
        $creationDate = (new DateTime())->format('Y-m-d H:i:S');
        
        $sql = "INSERT INTO Users (Username, Password, CreationDate) VALUES ('{$cleanUsername}', '{$hashedPassword}', '{$creationDate}')";
        
        $result = $connection->query($sql);
        
        if (!$result) return $GLOBALS['queryErrorResponse'];
        
        return $GLOBALS['successfulResponse']->setMessage('Successfully created a new user!');
    }

    public static function getProjects()
    {
        global $connection;
        
        if (!$connection) return $GLOBALS['databaseErrorResponse'];
        
        $sql = 'SELECT * FROM Projects WHERE IsVisible=1';
        
        $result = $connection->query($sql);
        
        if (!$result) return $GLOBALS['queryErrorResponse'];
        
        $projects = $result->fetch_all(MYSQLI_ASSOC);
        
        return $GLOBALS['successfulResponse']->setMessage('Successfully found projects!')->setContents($projects);
    }
}

?>