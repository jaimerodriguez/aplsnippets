const { IntentNames , RequestTypes, AmazonIntents, 
        CustomErrors ,UserEventArgs } = require ('../constants.js'); 



const SpinnerScenarioIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
      && handlerInput.requestEnvelope.request.intent.name === IntentNames.SpinnerScenario;
    },
    async handle(handlerInput) {
      // TODO: Refactor this to a sample specific class
      // TODO: localize
      let nextAngle = Utils.getRandomIntInRange(0, 360);
      //  const responseText = '<speak><audio src="soundbank://soundlibrary/toys_games/toys/toys_13"/><audio src="soundbank://soundlibrary/clocks/ticks/ticks_14"/> Spin again by saying spin, or <emphasis level="reduced">say</emphasis><emphasis level="reduced">not</emphasis><break strength="x-weak"/>ready for more time.</speak>';
      const sessionState = handlerInput.attributesManager.getSessionAttributes();
      let lastAngle = (sessionState.lastSpin) ? sessionState.lastSpin : 0;
  
      if (lastAngle > 360) { lastAngle %= 360; }
  
      if (nextAngle === lastAngle) {
        if (nextAngle < 270) { nextAngle += 85; } else { nextAngle -= 85; }
      }
  
  
      const totalChildren = 16;
      const childArc = 360 / totalChildren;
  
      const speakItemCount = Math.floor(((nextAngle % 360) / childArc)) + 1;
      nextAngle = (speakItemCount * childArc) - (childArc / 2);
  
      if (nextAngle < lastAngle) { nextAngle += 360; }
  
      const speakItemId = `speakItem${speakItemCount.toString().padStart(2, '0')}`;
  
      console.log(`next angle: ${nextAngle}: ${speakItemId}`);
      const response = handlerInput.responseBuilder
        .speak(' ')
        .reprompt('To spin again, say Spin.  Say go back to get to main menu')
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'spinnerToken',
          commands: [
            {
              'type': 'Sequential',
              'commands': [
                {
                  'type': 'Parallel',
                  'repeatCount': 0,
                  'commands': [
                    {
                      'type': 'SpeakItem',
                      'componentId': 'speakItemCrank',
                    },
                    {
                      'type': 'AnimateItem',
                      'easing': 'ease-in-out',
                      'duration': 900,
                      'delay': 1000,
                      'componentId': 'dialComponentId',
                      'value': [
                        {
                          'property': 'transform',
                          'from': [
                            { 'rotate': lastAngle },
                          ],
                          'to': [
                            { 'rotate': nextAngle },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  'type': 'SpeakItem',
                  'componentId': speakItemId,
                },
                {
                  'type': 'SpeakItem',
                  'componentId': 'speakItemSharedTicks',
                },
              ],
            },
          ],
        })
        .getResponse();
      sessionState.lastSpin = nextAngle;
      handlerInput.attributesManager.getSessionAttributes(sessionState);
      return response;
    },
  };


  const CachedPagerUserEventHandler =  
  { 
     canHandle ( handlerInput ) { 
        throw new Error (CustomErrors.NotmplementedException);  
     }, 

      handle ( handlerInput ) {        
        const userEvent = handlerInput.requestEnvelope.request;
        const source = userEvent.source.type;
        const handler = userEvent.source.handler;
        const resourceManager = handlerInput.responseBuilder.i18n;
        let userArgs = '';
        console.assert ( userEvent.arguments[0] === UserEventArgs.CachedPager_Next 
          || userEvent.arguments[0] === UserEventArgs.CachedPager_Previous);  

        //Generic handler ...  
        userEvent.arguments.forEach((arg) => {
          // eslint-disable-next-line template-curly-spacing     
          const kvp = arg.split(':');
          if (kvp.length > 1) {
            userArgs += `${kvp[0]}: ${kvp[1]}  , `;
          } else { userArgs += `${arg},`; }
        });

        const direction = (userEvent.arguments[0] === UserEventArgs.CachedPager_Previous) ? -1 : 1;       
        const responseText = resourceManager.sformatByName ( 'USER_EVENT_WITHARGS_FORMAT' ,  {source: source, handler: handler , userArgs: userArgs});
        const response = handlerInput.responseBuilder
         .speak(responseText)
         .addDirective({
           type: 'Alexa.Presentation.APL.ExecuteCommands',
           token: 'cachedPagerToken',
           commands: [
             {
               'type': 'SetPage',
               'componentId': 'pagerId',
               'position': 'relative',
               'value': direction,
             },
           ],
         })
         .getResponse();
       return response;      
    }
}; 

  module.exports = { 
    SpinnerScenarioIntentHandler ,
    CachedPagerUserEventHandler
  }; 