function Line(_graph, _name, _colour, _display)
{
    this.graph = _graph; // The graph the line is on
    this.name = _name; // Name of the line
    this.position = 0; // Position of the line
    this.zValue = 0; // z value of the line
    this.nonStandardizedzValue = 0; // Non standardized value of the line
    this.dragged = false; // Whether the line is being dragged
    this.colour = _colour; // The colour of the line
    this.display = _display; // Whether the line is being displayed
    this.height = 147; // The height of the line
    
    /*
    * Sets the z value of the line
    *
    * ARGS:
    * newzValue - The new z value the line will have
    */
    this.setzValue = function(newzValue)
    {
        var z = newzValue;
        // Calculates the correct z values so that they can be read from the array containing z values
        // Uses modulus to subtract the remainder to get correct value
        var zAbs = Math.abs(z);
            
        // Between 2.00 and 2.50 values increase by 0.02
        if (zAbs > 2.00 && zAbs < 2.50)
            z = z - (z % 0.02);
            
        // Between 2.50 and 3.40 values increase by 0.05
        if (zAbs > 2.50 && zAbs < 3.40)
            z = z - (z % 0.05);
            
        // Between 3.40 and 4.00 values increase by 0.10
        if (zAbs > 3.40 && zAbs < 4.00)
            z = z - (z % 0.10);
        
        this.zValue = Math.round(z * 100) / 100; // Rounds the z value to 2 decimal places
        this.setNonStandardizedzValue(); // Updates the non standardized z value
    }
    
    /*
    * Sets the non standardized z value of the line
    */
    this.setNonStandardizedzValue = function()
    {
        // Calculates the non standardized z value and set it for the line
        this.nonStandardizedzValue = (parseFloat(this.zValue) * parseFloat(this.graph.standardDeviation)) + parseFloat(this.graph.mean);
    }
    
    /*
    * Sets the position of the line
    *
    * ARGS:
    * newPos - New position for the line to have
    */
    this.setPosition = function(newPos)
    {
        this.position = newPos; // Sets the position of the line to the new position
        this.setzValue((4.00 / this.graph.maxPoint) * this.position); // Updates the z value of the line
        this.height = this.graph.getCurveYTranslated(newPos + (this.graph.canvas.width / 2)); // Updates the height of the line
    }
    
    /*
    * Function called when the line is being dragged
    *
    * ARGS:
    * dragPos - Drag position of the line
    */
    this.onLineDragged = function(dragPos)
    {
        this.dragged = true; // Sets the line being dragged to true
        this.setPosition(dragPos); // Update the position of the line
    }
    
    /*
    * Toggles whether the line is being displayed
    */
    this.toggleDisplayed = function()
    {
        if (this.display) // Checks if the line is currently being displayed
            this.display = false; // Sets the line displayed to false
        else
            this.display = true; // Sets the line displayed to true
    }
}