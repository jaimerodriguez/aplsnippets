# SpeakItem with sound file

SpeakItem reads the content of a single item on the screen.

## Sample description

Shows a SpeakItem that will play a sound file associated with the speech property of a component.

## Tips/Notes

- SpeakItem is commonly used with a transformer, reading SSML text for the user. If you want to spice up your skill with a sound effect in between spoken word, you can do it by just linking to a direct sound file in the speech property of an element.
- Any component can have a `speech` property. In this example, we used an Image.

## Try It

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Replace the sound file if you want

## References

- [SpeakItem](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-standard-commands.html#speakitem-command)
- Checkout the 'SpeakItem with transformers' example in this project.
