# SpeakItem with transformer

SpeakItem reads the content of a single item on the screen. Transformers can be used to convert SSML to audio or to unmarked text to play or display on the screen.  

## Sample description

A SpeakItem using a transformer to translate SSML into speech and play it as audio.  

## Tips/Notes

- SpeakItem is commonly used with a transformer, reading SSML text for the user. If you want to spice up your skill with a sound effect in between spoken word, you can do it by just linking to a direct sound file in the speech property of an element.
- SpeakItem does not run in the authoring tool. Deploy this snippet to device to experience it.

## Try It

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Copy the content in `../../../datasources/singleanimal.json` to the data tab in the authoring tool.
1. Click on the `view on` dropdown in the editor to deploy to device.
1. Change  the SSML text from the data source. View example again.
1. Notice the path to the server-side generated tts speech.  

## References

- [SpeakItem](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-standard-commands.html#speakitem-command)
- Check out the 'spinner demo' in this project for more advanced usage of SpeakItem in a sequence of commands.
