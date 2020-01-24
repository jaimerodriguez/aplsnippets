const Alexa = require('ask-sdk-core');
const { AlexaUtils, Utils } = require('./utils/skillhelpers');
const { localeInterceptor } = require('./utils/i18nhelper');

const Skill = require('./skill/handlers');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    return Skill.renderMainMenu(handlerInput);
  },
};

const ShowFeatureRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ShowFeatureIntent';
  },
  async handle(handlerInput) {
    return Skill.showFeature(handlerInput);
  },
};

const NavigateHomeIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.NavigateHomeIntent'
        || request.intent.name === 'AMAZON.PreviousIntent');
  },
  async handle(handlerInput) {
    return Skill.renderMainMenu(handlerInput);
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  async  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const speechText = await responseBuilder.i18n.s('HELP_INSTRUCTIONS');
    const reprompt = await responseBuilder.i18n.s('MAINMENU_REPOMPT');
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .getResponse();
  },
};


const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const speechText = await responseBuilder.i18n.s('GOODBYE');
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  },
};


const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const msg = responseBuilder.i18n.s('FALLBACK_TRIGGERED');
    const reprompt = await responseBuilder.i18n.s('FALLBACK_RETRY');
    return handlerInput.responseBuilder
      .speak(msg)
      .reprompt(reprompt)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  async handle(handlerInput, error) {
    const msg = AlexaUtils.getErrorDetails(handlerInput, error);
    console.log(`Error handled: ${msg}`);
    const responseBuilder = handlerInput.responseBuilder;

    const errorMessage = await responseBuilder.i18n.s('ERROR');
    const reprompt = await responseBuilder.i18n.s('ERROR_REPROMPT');
    return responseBuilder
      .speak(errorMessage)
      .reprompt(reprompt)
      .getResponse();
  },
};


const SelectIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.SelectIntent';
  },
  async handle(handlerInput) {
    return Skill.handleSelection(handlerInput);
  },
};

const UserEventHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent';
  },
  async handle(handlerInput) {
    return Skill.handleUserEvent(handlerInput);
  },
};


const SpinnerScenarioIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'SpinnerScenarioIntent';
  },
  async handle(handlerInput) {
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

const MoreTimeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MoreTimeIntent';
  },
  async handle(handlerInput) {
    // TODO: localize
    const responseText = '<speak>Ok, here is thirty more seconds <break time="10s"/>.<amazon:effect name="whispered">ten</amazon:effect><break time="10s"/>.<amazon:effect name="whispered">twenty</amazon:effect><break time="10s"/>.<amazon:effect name="whispered">thirty</amazon:effect></speak>';
    const response = handlerInput.responseBuilder
      .speak(responseText)
      .reprompt('say more time again to extend again')
      .getResponse();

    return response;
  },
};

/* INTERCEPTORS */
const LogRequestInterceptor = {
  process(handlerInput) {
    console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
  },
};

const LogResponseInterceptor = {
  process(handlerInput) {
    console.log(`RESPONSE = ${JSON.stringify(handlerInput.responseBuilder.getResponse())}`);
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

skillBuilder.addRequestHandlers(
  LaunchRequestHandler,
  ShowFeatureRequestHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  UserEventHandler,
  SelectIntentHandler,
  NavigateHomeIntentHandler,
  MoreTimeIntentHandler,
  SpinnerScenarioIntentHandler,
  FallbackIntentHandler,
)
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(localeInterceptor);

if (process.env.DEBUGLOG && process.env.DEBUGLOG === 'verbose') {
  skillBuilder.addRequestInterceptors(LogRequestInterceptor);
  skillBuilder.addResponseInterceptors(LogResponseInterceptor);
}

exports.handler = skillBuilder.lambda();
