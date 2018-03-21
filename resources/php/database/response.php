<?php

class Response implements JsonSerializable
{
    private $code;
    
    private $message;
    
    private $type;
    
    private $contents;
    
    public function __construct($code, $message, $type, $contents = null)
    {
        $this->code = $code;
        $this->message = $message;
        $this->type = $type;
        $this->contents = $contents;
    }
    
    public function setCode($code)
    {
        return new Response($code, $this->message, $this->type);
    }
    
    public function setMessage($message)
    {
        return new Response($this->code, $message, $this->type);
    }
    
    public function setType($type)
    {
        return new Response($this->code, $this->message, $type);
    }
    
    public function setContents($contents)
    {
        return new Response($this->code, $this->message, $type, $contents);
    }
    
    public function getCode()
    {
        return $this->code;
    }
    
    public function getMessage()
    {
        return $this->message;
    }
    
    public function getType()
    {
        return $this->type;
    }
    
    public function getContents()
    {
        return $this->contents;
    }
    
    public function jsonSerialize()
    {
        return array
        (
            'code' => $this->code,
            'message' => $this->message,
            'type' => $this->type,
            'contents' => $this->contents,
        );
    }
}

?>