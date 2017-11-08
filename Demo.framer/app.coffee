Background.image = Utils.randomImage()

Design = require "DesignComponents"

# reference = new Layer
# 	name: "reference"
# 	backgroundColor: "red"
# 	size: 50
# 	x: 100
# 	y: 100
# 
# layer = new Layer
# 	size: 50
# 	name: "layer"
# 	backgroundColor: "blue"
# 
# layer.constraints =
# 	top:
# 		layer: "reference"
# 		value: 10
# 		align: "top"
# 	left:
# 		layer: "reference"
# 		value: 10
# 
# reference.animate
# 	y: reference.y + 100
# 	x: reference.x + 100
# 	width: 75
# 	height: 75

# card1 = new Design.Card
# 
# 
# card2 = new Design.Card
# 	y: card1.maxY + 10
# 	avatar:
# 		borderRadius: 0
# 		image: Utils.randomImage()
# 	subheader:
# 		text: "This is a new subheader"
# 	content:
# 		text: "This is some content that has changed"

string = "Lorem ipsum dolor sit amet.\nNew content\nMore new content"

card3 = new Design.Card
# 	y: card2.maxY + 10
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

for i in [0..string.length-1]
	Utils.delay i*0.5, ->
		print @


# button = new Design.Button
# 	y: card3.maxY + 50
# 	x: Align.center
# 
# 
# 
# 
# 
# toggle = new Design.Toggle
# 	y: button.maxY + 50
# 	x: Align.center
# 
# 
# 
# 
# 
# slider = new Design.SliderComponent
# 	y: toggle.maxY + 50
# 	x: Align.center
# 
# 
# 
# 
# 
# rangeSlider = new Design.RangeSliderComponent
# 	y: slider.maxY + 75
# 	x: Align.center