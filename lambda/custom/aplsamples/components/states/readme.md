# Component states

Each component has a state. The state is the collection of boolean properties (checked, focused, pressed, disabled, etc.)

## Sample description

Shows component states and how to style a component according to its state.
This sample is good for learning layout composition.

## Tips/Notes

- state is inherited from the parent component (since the default for  `inheritParentState` is true).
- SetState and SetValue cannot be used to changed focused state.
- SetFocus command is ignored if component is disabled or has the `inheritParentState` property set to true.
- SetFocus only works in actionable components: ScrollView, Sequence, Pager & TouchWrapper.

## Try It

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Play with inheritParentState
1. Change the style colors, add more children to the touch wrappers and see that they inherit the state.

## References

- [Component States](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-style-definition-and-evaluation.html#component_state)
