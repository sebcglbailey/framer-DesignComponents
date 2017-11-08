Design = require "DesignComponents"


# DEMO SETUP

Background.image = Utils.randomImage()

scroll = new ScrollComponent
	size: Screen
	scrollHorizontal: false
scroll.content.clip = false


# SLIDERS - NATAIVE COMPONENTS

slider = new Design.SliderComponent
	parent: scroll.content
	y: 50
	x: Align.center



rangeSlider = new Design.RangeSliderComponent
	parent: scroll.content
	y: slider.maxY + 75
	x: Align.center


# CARDS - CUSTOM CLASS

card1 = new Design.Card
	parent: scroll.content
	name: "card1"
	y: rangeSlider.maxY + 50


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

contentString = "Lorem ipsum dolor sit amet.\nNew content\nMore new content"

card3 = new Design.Card
	parent: scroll.content
	name: "card3"
	y: card2.maxY + 10
	avatar:
		borderRadius: 0
		image: Utils.randomImage()
	subheader:
		text: "Lorem ipsum\nNew subheader"
	content:
		constraints:
			top:
				layer: "subheader"
			pushDown: true

card3.onTap ->
	for i in [0..contentString.length]
		do (i) ->
			Utils.delay i*0.05, ->
				card3.content.text = contentString.slice(0, i)


# STATES WITH CUSTOM CLASSES

button = new Design.Button
	parent: scroll.content
	name: "button"
	y: card3.maxY + 50
	x: Align.center
	constraints:
		top:
			layer: "card3"
			value: 50

toggle = new Design.Toggle
	parent: scroll.content
	y: button.maxY + 50
	x: Align.center
	constraints:
		top:
			layer: "button"
			value: 50
