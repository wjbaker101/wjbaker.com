function NormalDistributionGraph(c)
{
    this.canvas = c; // Canvas the graph is in
    this.standardDeviation = 1; // Standard deviation of the graph
    this.mean = 0; // Mean of the graph
    this.yAxisOffset = 30; // Offset of the y axis from the bottom of the canvas
    this.minValue = -4.00; // Minimum value of the graph
    this.maxValue = 4.00; // Maximum value of the graph
    this.maxPoint = 500; // Maximum position from the centre of the graph lines can move to
    this.defaultDirection = true; // Whether the graph is in the default direction
    
    /*
    * Sets the mean of the graph
    *
    * ARGS:
    * newMean - Value to set the mean to
    */
    this.setMean = function(newMean)
    {
        this.mean = newMean; // Sets the mean to the new mean
        this.setMinMaxValue(); // Updates the minimum and maximum values
    }
    
    /*
    * Sets the standard deviation of the graph
    *
    * ARGS:
    * newStandardDevation - Value to set the standard deviation to
    */
    this.setStandardDeviation = function(newStandardDevation)
    {
        this.standardDeviation = newStandardDevation; // Sets the standard deviation to the new standard deviation
        this.setMinMaxValue(); // Updates the minimum and maximum values
    }
    
    /*
    * Sets the minimum and maximum value of the graph
    */
    this.setMinMaxValue = function()
    {
        this.minValue = (-4.00 * parseFloat(this.standardDeviation)) + parseFloat(this.mean); // Calculates the new minimum value
        this.maxValue = (4.00 * parseFloat(this.standardDeviation)) + parseFloat(this.mean);  // Calculates the new maximum value
    }
    
    /*
    * Calculates the y value on the curve at the point x
    *
    * ARGS:
    * posX - X position to form the y position
    */
    this.getCurveY = function(posX)
    {
        // Translates the standard deviation to fit onto the canvas
        var standardDeviationTranslatedY = (this.standardDeviation / 10) + 2.5;
        var standardDeviationTranslatedX = (this.standardDeviation / 10) + 8;
        
        // Calculates and returns the y position using the normal distribution function
        return this.canvas.height - (this.yAxisOffset + 3) - (((1 / Math.sqrt(2 * Math.PI)) * Math.pow(Math.exp(1), -(Math.pow((posX / standardDeviationTranslatedX), 2)) / 2)) * (4 / standardDeviationTranslatedY) * this.canvas.height);
    }
    
    /*
    * Calculates the translated version of y to output onto the Canvas
    *
    * ARGS:
    * posX - X position to form the y position
    */
    this.getCurveYTranslated = function(posX)
    {
        // Calculates the y position from the getCurveY function and returns the value
        return this.getCurveY((-(this.canvas.width / 2) + posX) / 15);
    }
}