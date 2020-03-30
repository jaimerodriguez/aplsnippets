# Video

A video player shows an embedded video or series of videos to play.
The video player does not have any controls. You can use media commands targeting a video player to control playback.  

## Sample description

This sample demonstrates the video playback, listening to video events, and using media commands to control playback.  

## Tips/Notes  

- Skills that use the `Video` component must provide a way to pause the video content by voice or by the use of an on-screen button.

- Not all devices support video playback.  Even some devices that support APL might not support playback. Use the environment property `disallowVideo` to check if device supports video. For server-side checking, use `context.Viewport.video` property in the request.  
- Video player does not work in the editor. You must deploy this sample to a device.  

## Try It

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Click on the `view on` dropdown in the editor to deploy to device.
1. Play with autoplay property, and offset property.
1. Play with the buttons (TouchWrapper components).

## References  

- [APL Video](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-video.html)
- [APL Media Commands](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-commands-media.html)
