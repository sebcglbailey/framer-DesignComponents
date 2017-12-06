# To see a full working demo of the DesignComponent module, please download the demo file at:

# https://github.com/sebcglbailey/framer-DesignComponents/tree/master/Demo.framer

# The demo file includes some pre-made components, and shows you how to edit and use the Design Components


###

---------------------------------------
REQUIRING THE MODULE
---------------------------------------

The usual line of code for requiring the module will be:

Design = require "DesignComponents"

###



###

---------------------------------------
NAMING CONVENTIONS
---------------------------------------

For native components:

Prefix the group of layers with an underscore

Examples:
_SliderComponent
_RangeSliderComponent

These will then be accessible within the code view by typing:

slider = new Design.SliderComponent
rangeSlider = new Design.RangeSliderComponent


-------------------


For custom classes:

Prefix the custom component name with "Custom_"

Example:
Custom_Card

This will be built in code using:

card = new Design.Card

Child layers are accessible by name on initiating the class, and also after initilisation.

card = new Design.Card
	avatar:
		image: "image_url"
	title:
		text: "Title text here"


-------------------

To add states to your custom classes:

Prefix the group name with "State_", and append the name with an event (optional)
To give the state a name, prefix the entire group name again with the name of the state. (optional)

Examples:
Custom_Button
Custom_Input
Custom_Emoji

State_Button_MouseDown
Success_State_Input_Tap
Error_State_Input_Tap
Congrats_State_Emoji

###