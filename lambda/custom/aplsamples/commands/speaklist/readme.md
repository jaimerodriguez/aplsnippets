# SpeakList

SpeakList command reads the contents of a range of items inside a common container.

## Sample description

Shows a databound SpeakList.

## Tips/Notes

- SpeakList requires a container with one or more children. It applies to Container, ScrollView, Sequence, Frame, TouchWrapper, and Pager.
- Each item will scroll into view before speech is played.
- SpeakList does not run in the authoring tool. Deploy the sample to a device.

## Try It

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Copy the content in `../../../datasources/animals_speaklist_shape.json` to the data tab in the authoring tool.
1. Click on the `view on` dropdown in the editor to select a target device for deployment. Then click on the device name to deploy.
1. Change the `count` and `start` property in the SpeakList. Hint, notice the Sequence had four items, but the count on our sample was three.
1. Remove the `speech` properties from our layout.
1. Notice this sample uses a reusable layout for a Sequence.
1. The data source in SpeakList is a bit unintuitive. Explore the datasource elements.

## References

- [SpeakList](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/)
