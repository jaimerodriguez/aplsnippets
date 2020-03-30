# TouchWrapper

`TouchWrapper` wraps a child component and responds to touch events. TouchWrappers are commonly used in lists where each list item can be individually pressed.

## Sample description

TouchWrapper wrapping multiple types of content: a button and an image.  This sample also shows handling touch interactions locally (SetValue) and remotely in your skill's backend, via SendEvent.

## Tips/Notes

- The touch interactivity is all directed to the first child in a TouchWrapper. It can be a `Container` with many children, but it should be one child.

## Try It

Note: This sample is best experienced in the skill, with a back-end.
The touch events do not work in the authoring tool. If sample is viewed on a device, without skill backend, the SendEvent will not work in authoring tool.

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Click on the `view on` dropdown in the editor to deploy to device.
1. Touch the buttons and the image. See the events fire.

## References

- [APL TouchWrapper](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-touchwrapper.html)
