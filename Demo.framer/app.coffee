Design = require "DesignComponents"

# DEMO SETUP

Layer.select(".UIKit").x = Screen.width

Screen.backgroundColor = "#886AE2"

scroll = new ScrollComponent
	size: Screen
	scrollHorizontal: false
	mouseWheelEnabled: true
	mouseWheelSpeedMultiplier: 0.125
scroll.content.clip = false






# Designing sliders in the design tab, and using the class
# SLIDERS - NATIVE COMPONENTS

slider = new Design.SliderComponent
	parent: scroll.content
	y: 50
	x: Align.center



rangeSlider = new Design.RangeSliderComponent
	parent: scroll.content
	y: slider.maxY + 75
	x: Align.center

# Designing a custom component in the design tab, and using it as a class
# CARDS - CUSTOM CLASS

# Recreate the card without editing the content
card1 = new Design.Card
	parent: scroll.content
	name: "card1"
	y: rangeSlider.maxY + 50


# Recreate the card and edit the content
card2 = new Design.Card
	parent: scroll.content
	name: "card2"
	y: card1.maxY + 10
	avatar:
		borderRadius: 0
		image: Utils.randomImage()
	subheader:
		text: "This is a new subheader"
	content:
		text: "This is some content that has changed"


# Recreate the card, edit the content, and apply some constraints to the child layers
card3 = new Design.Card
	parent: scroll.content
	name: "card3"
	y: card2.maxY + 10
	avatar:
		borderRadius: 0
		image: Utils.randomImage()
	subheader:
		text: "Lorem ipsum"
	content:
		constraints:
			pushDown: true
		pin:
			layer: "subheader"
			value: 10

card3.subheader.text = "Lorem ipsum\nNew Line"
textString = "This is a string that can type itself\nTo show it animating over multiple lines\nWhich is really cool!"

for i in [0..textString.length]
	do (i) ->
		Utils.delay i*0.05, ->
			card3.content.text = textString.slice 0, i

# Using states on a custom class to add events
# # STATES WITH CUSTOM CLASSES

# # Button will have a "MouseDown" and "MouseUp" event listener
button = new Design.Button
	parent: scroll.content
	name: "button"
	y: card3.maxY + 50
	x: Align.center

# # # Toggle will have multiple states that it will cycle through on "Tap"
toggle = new Design.Toggle
	parent: scroll.content
	name: "toggle"
	y: button.maxY + 50
	x: Align.center

# Using states on a custom class without an event
# STATES WITHOUT AN EVENT LISTENER


# Setting the state upon initilisation
emoji = new Design.Emoji
	parent: scroll.content
	y: toggle.maxY + 50
	x: Align.center
	state: "Angel"

# Setting a state after initilisation
emoji.state = "Wink"
emoji.state = Utils.randomChoice ["Smile", "Angel", "Wink", "Unamused"]

# # Animating between states
emoji.onTap ->
	currentState = @states.current.name

	if currentState == "default" || currentState == "Smile"
		@animateState "Wink", true
	else if currentState == "Wink"
		@animateState "Angel", true
	else if currentState == "Angel"
		@animateState "Unamused", true
	else if currentState == "Unamused"
		@animateState "Smile", true
