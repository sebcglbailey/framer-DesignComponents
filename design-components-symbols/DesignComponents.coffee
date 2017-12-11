
moveFromRef = (layer, reference, moveRef, layerRef, refType) ->

	originalConstraints = layer.constraintValues

	originalRefValue = reference[layerRef]
	originalLayerValue = layer[moveRef]

	layer[moveRef] = reference[layerRef] + layer.constraintValues[refType].value

	# reference.onChange layerRef, (value) ->
	# 	layer[moveRef] = originalLayerValue + (value - originalRefValue)

	layer.constraintValues = originalConstraints


pushParent = (layer, direction) ->

	if direction == "down"
		originalY = layer.y
		originalHeight = layer.height

		layer.onChange "y", (value) ->
			@parent.height += value - originalY
			originalY = value
			originalHeight = @height
		layer.onChange "height", (value) ->
			@parent.height += value - originalHeight
			originalY = @y
			originalHeight = value
	
	if direction == "right"
		originalX = layer.x
		originalWidth - layer.width

		layer.onChange "x", (value) ->
			@parent.width += value - originalX
			originalX = value
			originalWidth = @width
		layer.onChange "width", (value) ->
			@parent.width += value - originalWidth
			originalX = @x
			originalWidth = value


addReferenceEvents = (layer) ->

	originalConstraints = layer.constraintValues

	if layer.constraintValues?.topRef?.layer? || layer.constraintValues?.bottomRef?.layer?

		reference = layer.constraintValues?.topRef?.layer || layer.constraintValues?.bottomRef?.layer

		originalYRef = reference.y
		originalHeightRef = reference.height
		originalY = layer.y

		reference.onChange "y", (value) ->
			layer.y = originalY + (value - originalYRef)
			originalYRef = value
			originalY = layer.y

		unless layer.constraintValues?.topRef?.align == "y"
			reference.onChange "height", (value) ->
				layer.y = originalY + (value - originalHeightRef)
				originalHeightRef = value
				originalY = layer.y

		if layer.constraintValues?.topRef? && layer.constraintValues?.bottomRef?
			reference.onChange "height", (value) ->
				layer.height = value - layer.constraintValues?.topRef.value - layer.constraintValues?.bottomRef.value
				layer.y = reference.y + layer.constraintValues?.topRef.value
				originalHeightRef = value

	if layer.constraintValues?.leftRef?.layer? || layer.constraintValues?.rightRef?.layer?
		reference = layer.constraintValues?.leftRef?.layer || layer.constraintValues?.rightRef?.layer

		originalXRef = reference.x
		originalWidthRef = reference.width
		originalX = layer.x

		reference.onChange "x", (value) ->
			layer.x = originalX + (value - originalXRef)
			originalXRef = value
			originalX = layer.x

		unless layer.constraintValues?.left?.align == "x"
			reference.onChange "width", (value) ->
				layer.x = originalX + (value - originalWidthRef)
				originalWidthRef = value
				originalX = layer.x

		if layer.constraintValues?.leftRef? && layer.constraintValues?.rightRef?
			reference.onChange "width", (value) ->
				layer.width = value - layer.constraintValues?.leftRef.value - layer.constraintValues?.rightRef.value
				layer.x = reference.x + layer.constraintValues?.leftRef.value
				originalWidthRef = value


buildConstraintsProtos = (constructorName) ->

	constructorName = eval constructorName

	constructorName::setConstraints = (options={}, origin) ->

		@constraintValues =
			top: if typeof options.top == "object" then null else if options.top? then options.top else if origin?.constraintValues? then origin.constraintValues.top else null
			left: if typeof options.left == "object" then null else if options.left? then options.left else if origin?.constraintValues? then origin.constraintValues.left else null
			bottom: if typeof options.bottom == "object" then null else if options.pushDown then null else if options.bottom? then options.bottom else if origin?.constraintValues? then origin.constraintValues.bottom else null
			right: if typeof options.right == "object" then null else if options.pushRight then null  else if options.right? then options.right else if origin?.constraintValues? then origin.constraintValues.right else null
			width: @width
			height: @height
			widthFactor: if options.scaleX? then options.scaleX else if options.widthFactor? then options.widthFactor else null
			heightFactor: if options.scaleY? then options.scaleY else if options.heightFactor? then options.heightFactor else null
			centerAnchorX: if options.centerX? then options.centerX else if options.centerAnchorX? then options.centerAnchorX else null
			centerAnchorY: if options.centerY? then options.centerY else if options.centerAnchorY? then options.centerAnchorY else null
			aspectRatioLocked: if options.aspectRatioLocked? then options.aspectRatioLocked else if origin?.constraintValues then origin.constraintValues.aspectRatioLocked else false

		# resets
		values = @constraintValues
		if values.top? && values.bottom?
			@constraintValues.heightFactor = null
			@constraintValues.centerAnchorY = null
		if values.left? && values.right?
			@constraintValues.widthFactor = null
			@constraintValues.centerAnchorX = null
		if values.left? && values.right? && values.top? && values.bottom?
			@constraintValues.aspectRatioLocked = false

		for ref in [["top", "y", "maxY", "topRef", "bottom"], ["left", "x", "maxX", "leftRef", "right"], ["bottom", "maxY", "y", "bottomRef", "top"], ["right", "maxX", "x", "rightRef", "left"]]

			if typeof options[ref[0]] == "object" && options[ref[0]] != null && !options[ref[3]]?

				if options[ref[0]].layer?
					if @parent? && @parent.selectChild(options[ref[0]].layer)?
						layer = @parent.selectChild options[ref[0]].layer
					else
						layer = Layer.select options[ref[0]].layer
				else layer = @parent

				align = null

				if !options[ref[0]].value? && layer == @parent
					value = @[ref[1]]
				else if options[ref[0]].align? && options[ref[0]].value?
					value = options[ref[0]].value
					align = options[ref[0]].align
				else if options[ref[0]].align?
					value = 0
					align = options[ref[0]].align
				else if !options[ref[0]].value? && !options[ref[0]].align?
					value = @[ref[1]] - layer[ref[2]]
					align = ref[4]
				else
					value = options[ref[0]].value
					align = ref[4]

				if align == "left" then align = "x"
				else if align == "right" then align = "maxX"
				else if align == "top" then align = "y"
				else if align == "bottom" then align = "maxY"

				@constraintValues[ref[3]] =
					layer: layer
					value: value
					align: align

				@constraintValues[ref[0]] = null
				@constraintValues[ref[4]] = null

				# moveFromRef @, layer, ref[1], ref[2], ref[3]

		if options.pushDown?
			@constraintValues.bottom = null
			pushParent @, "down"
		if options.pushRight?
			@constraintValues.right = null
			pushParent @, "right"

		unless options.pushDown || @constraintValues.topRef || @constraintValues.bottomRef
			@constraintValues.bottom = if options.bottom? then options.bottom else if origin?.constraintValues? then origin.constraintValues.bottom else null
		unless options.pushRight || @constraintValues.leftRef || @constraintValues.rightRef
			@constraintValues.right = if options.right? then options.right else if origin?.constraintValues? then origin.constraintValues.right else null

		if @constraintValues.top == null && @constraintValues.bottom == null && @constraintValues.centerAnchorY == null && !@constraintValues.topRef && !@constraintValues.bottomRef
			@constraintValues.top = @y
		if @constraintValues.left == null && @constraintValues.right == null && @constraintValues.centerAnchorX == null && !@constraintValues.leftRef && !@constraintValues.rightRef
			@constraintValues.left = @x

		@applyConstraints()


	constructorName::applyConstraints = ->

		return if !@constraintValues

		values = @constraintValues

		if !@parent then parent = Screen else parent = @parent

		aspectRatio = @width / @height

		# position
		if values.top? && typeof values.top != "object"
			@y = values.top
		else if values.top == null && values.topRef?.layer?
			@y = values.topRef.layer[values.topRef.align] + values.topRef.value

		if values.left? && typeof values.left != "object"
			@x = values.left
		else if values.left == null && values.leftRef?.layer?
			@x = values.leftRef.layer[values.leftRef.align] + values.leftRef.value

		# size
		if values.left? && values.right?
			@width = parent.width - @x - values.right
			if values.aspectRatioLocked
				@height = @width / aspectRatio
		if values.top? && values.bottom?
			@height = parent.height - @y - values.bottom
			if values.aspectRatioLocked
				@width = @height * aspectRatio

		# if values.leftRef? && values.rightRef?
		# 	@width = parent.width - values.leftRef.value - values.rightRef.value
		# if values.topRef? && values.bottomRef?
		# 	@height = parent.height - values.topRef.value - values.bottomRef.value

		if values.widthFactor?
			@width = parent.width * values.widthFactor
		if values.heightFactor?
			@height = parent.height * values.heightFactor

		# max position
		if values.right? 
			@maxX = parent.width - values.right
		else if values.right == null && values.rightRef?.layer?
			@maxX = values.rightRef.layer[values.rightRef.align] - values.rightRef.value
		if values.bottom?
			@maxY = parent.height - values.bottom
		else if values.bottom == null && values.bottomRef?.layer?
			@maxY = values.bottomRef.layer[values.bottomRef.align] - values.bottomRef.value

		# center position
		if !values.left? && !values.right? && values.centerAnchorX?
			@midX = parent.width * values.centerAnchorX
		if !values.top? && !values.bottom? && values.centerAnchorY?
			@midY = parent.height * values.centerAnchorY

		@constraintValues = values

		addReferenceEvents(@)


layerTypes = ["Layer", "TextLayer", "ScrollComponent", "PageComponent", "SliderComponent", "RangeSliderComponent", "SVGLayer", "BackgroundLayer"]
for type in layerTypes
	buildConstraintsProtos(type)



Object.defineProperty(Layer.prototype, "constraints", {

	get: -> return @_constraints
	set: (value) ->
		@_constraints = value
		@emit "change:constraints", value
		@setConstraints value

});

###
------------------
CUSTOM CLASSES
------------------
###

kit = Layer.select "*UIKit*"
if kit? then kit.x = Screen.width * 1000; kit.name = ".UIKit"

for layer in Layer.selectAll "@*"
	parent = layer.parent
	name = layer.name.replace "@", ""
	parent[name] = layer

customComponents = Layer.selectAll "Custom_*"

Layer::addDesignChildren = (origin) ->
	if !origin? then origin = @
	for child in origin.selectAllChildren ("*")
		parent = child.parent
		parent[child.name] = child


stateChangeProps = [
	"width", "height",
	"opacity",
	"scaleX", "scaleY", "scaleZ", "scale",
	"skewX", "skewY", "skew",
	"rotationX", "rotationY", "rotationZ", "rotation",
	"blur",
	"brightness", "saturate", "hueRotate", "contrast", "invert", "grayscale", "sepia", "blending",
	"backgroundBlur", "backgroundBrightness", "backgroundSaturate", "backgroundHueRotate", "backgroundContrast", "backgroundInvert", "backgroundGrayscale", "backgroundSepia",
	"shadow1", "shadow2", "shadow3", "shadow4", "shadow5", "shadow6", "shadow7", "shadow8", "shadow9",
	"shadowX", "shadowY", "shadowBlur", "shadowSpread", "shadowColor", "shadowType",
	"shadows",
	"backgroundColor", "color",
	"borderRadius", "borderColor", "borderWidth", "borderStyle",
	"image", "gradient",
	"text"
]



for component in customComponents

	name = component.name.replace "Custom_", ""

	do (component, name) ->

		class exports[name] extends Layer

			constructor: (@options={}) ->

				super @options

				@props = Object.assign component.props, {parent: @options.parent}
				@parent = @options.parent ?= Screen.content

				@addChildren()
				@setChildProps()
				
				@stateComponents = Layer.selectAll "*State_#{name}*"
				@addStates()

				@originalProps = @props

				@setConstraints @options.constraints, component

				@props = @options

				@setConstraints()

				if @options.state?
					# state = Layer.select "#{@options.state}_State_#{name}*"
					@animateState @options.state, false

				# @setTextProps()

			setTextProps: (parent) ->
				for descendant in @descendants

					if @options[descendant.name]? && @[descendant.name]?

						@[descendant.name].props = @options[descendant.name]

			setChildProps: (parent) ->

				for key, value of @options
					if @[key]? && (@[key] instanceof Layer || @[key] instanceof TextLayer)

						if @[key].constructor.name == "TextLayer" && @[key].autoSize != true
							@[key].props = value
							width = @[key].width
							@[key].autoSize = true
							@[key].width = width
						else
							@[key].props = value



			addChildren: (parent, origin) ->

				if !origin? then origin = component
				if !parent? then parent = @

				for child in origin.children

					do (child) =>

						layer = child.copySingle()
						layer.parent = parent

						@[layer.name] = layer

						layer.setConstraints @options[layer.name]?.constraints || {}, child

						# if @options[layer.name]?.constraints?
						# 	layer.setConstraints @options[layer.name].constraints, child
						# else
						# 	layer.setConstraints {}, child

						if child.children? && child.children.length > 0
							@addChildren layer, child


			addStates: () ->

				@customStates =
					array: []

				for state in @stateComponents

					do (state) =>

						stateIndex = state.name.indexOf("State")
						if stateIndex > 0
							stateName = state.name.slice 0, stateIndex-1
						else
							stateName = state.name.split("State_#{name}_")[1]

						@customStates[stateName] = {}
						@customStates.array.push stateName

						stateProps = {}

						for prop in stateChangeProps
							stateProps[prop] = state[prop]

						@states[stateName] = stateProps

						for dec in state.descendants
							do (dec) =>
								thisStateProps = {}
								for prop in stateChangeProps
									do (prop) =>
										thisStateProps[prop] = dec[prop]
								@[dec.name].states[stateName] = thisStateProps

				@addStateEvents()

			addStateEvents: () ->

				events = []

				for state in @stateComponents

					do (state) =>

						if state.name.includes "State_#{name}_"

							if state.name.includes "_State_#{name}_"
								stateName = state.name.split("_State_#{name}_")[0]
								eventName = state.name.split("_State_#{name}_")[1]
							else
								eventName = state.name.replace "State_#{name}_", ""
								stateName = eventName

							if eventName.includes "_Animate" || eventName.includes "_true" || eventName.includes "_True"
								animate = true
								eventName = eventName.split("_")[0]
							else animate = false

							@customStates[stateName].animate = animate

							unless events.includes eventName then events.push eventName

				for eventName in events

					do (eventName) =>

						if Events[eventName]? && @customStates.array.includes eventName

							@on Events[eventName], (event, layer) ->

								animate = @customStates[eventName].animate
								@stateSwitch(eventName, {animate: animate})
								@animateChildren()

						else if Events[eventName]?

							@on Events[eventName], ->
								currentIndex = @customStates.array.indexOf(@states.current.name)
								nextIndex = currentIndex + 1
								if nextIndex == @customStates.array.length then nextIndex = 0
								animate = @customStates[@customStates.array[nextIndex]].animate
								nextState = @customStates.array[nextIndex]
								
								@stateSwitch(nextState, {animate: animate})
								@animateChildren()

			animateChildren: (stateName, animate, options={}) ->
				unless stateName? then stateName = @states.current.name
				unless animate? then animate = @customStates[stateName].animate
				if !animate then options.time = 0
				for dec in @descendants
					do (dec) =>
						dec.stateSwitch(stateName, {animate: animate, options: options})

			animateState: (state, animate, options={}) ->

				if !state? || !@customStates?[state]? then return
				if !animate? && @customStates?[state]? then animate = @customStates[state].animate else if animate? then animate = animate else animate = false
				if !animate then options.time = 0

				@stateSwitch(state, {animate: animate, options: options})
				@animateChildren(state, animate, options)

			@define "constraints",
				get: -> @options.constraints
				set: (value) ->
					@options.constraints = value
					@emit("change:constraints", @options.constraints)
					@setConstraints value

			@define "state",
				get: -> @options.state
				set: (value) ->
					@options.state = value
					@emit("change:state", @options.state)
					@animateState value



customStates = Layer.selectAll "State_*"

for componentState in customStates

	classEventName = componentState.name.replace "State_", ""
	if classEventName.includes "_"
		className = classEventName.split("_")[0]
		eventName = classEventName.split("_")[1]
	else
		className = classEventName


###
------------------
EXISTING CLASSES
------------------
###


components = Layer.selectAll "_*"

extendSlider = (origin) ->
	class exports.SliderComponent extends SliderComponent

		constructor: (@options={}) ->
			super @options

			@knob.props =
				shadows: origin.knob.shadows
				backgroundColor: origin.knob.backgroundColor
				borderRadius: origin.knob.borderRadius
				frame: origin.knob.frame

			@fill.props =
				shadows: origin.fill.shadows
				backgroundColor: origin.fill.backgroundColor
				borderRadius: origin.fill.borderRadius
				frame: origin.fill.frame

			@props =
				shadows: origin.shadows
				backgroundColor: origin.backgroundColor
				borderRadius: origin.borderRadius
				size: origin.size

			@value = Utils.modulate origin.knob.midX, [0, origin.width], [@min, @max]


extendRangeSlider = (origin) ->
	class exports.RangeSliderComponent extends RangeSliderComponent

		constructor: (@options={}) ->
			super @options

			@minKnob.props =
				shadows: origin.minKnob.shadows
				backgroundColor: origin.minKnob.backgroundColor
				borderRadius: origin.minKnob.borderRadius
				frame: origin.minKnob.frame
			@maxKnob.props =
				shadows: origin.maxKnob.shadows
				backgroundColor: origin.maxKnob.backgroundColor
				borderRadius: origin.maxKnob.borderRadius
				frame: origin.maxKnob.frame

			@fill.props =
				shadows: origin.fill.shadows
				backgroundColor: origin.fill.backgroundColor
				borderRadius: origin.fill.borderRadius
				frame: origin.fill.frame

			@props =
				shadows: origin.shadows
				backgroundColor: origin.backgroundColor
				borderRadius: origin.borderRadius
				size: origin.size
				
			@minValue = Utils.modulate origin.minKnob.midX, [0, origin.width], [@min, @max]
			@maxValue = Utils.modulate origin.maxKnob.midX, [0, origin.width], [@min, @max]



for component in components

	type = component.name.replace "_", ""

	do (component) ->

		component.addDesignChildren()

		if type == "SliderComponent"
			extendSlider component
		else if type == "RangeSliderComponent"
			extendRangeSlider component









