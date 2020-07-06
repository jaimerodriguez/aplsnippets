const Alexa = require('ask-sdk-core');
const { AlexaUtils, Utils } = require('./utils/skillhelpers');
const { localeInterceptor } = require('./utils/i18nhelper');
const { IntentNames , RequestTypes, AmazonIntents } = require ('./constants'); 
const Skill = require('./skill/skillHandlers');
const { SpinnerScenarioIntentHandler } = require ('./skill/scenarioHandlers'); 


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Launch;
  },
  async handle(handlerInput) {

    if (!AlexaUtils.supportsAPL(handlerInput)) 
    { 
      return Skill.createNoAPLResponse(handlerInput); 
    }
    else 
      return Skill.renderMainMenu(handlerInput);
  },
};

const ShowFeatureRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent 
      && handlerInput.requestEnvelope.request.intent.name === IntentNames.ShowFeature;
  },
  async handle(handlerInput) {
    return Skill.showFeature(handlerInput);
  },
};

const NavigateHomeIntentHandler = {
  canHandle(handlerInput) {
    const {request} = handlerInput.requestEnvelope;
    return request.type === RequestTypes.Intent
      && (request.intent.name === AmazonIntents.NavigateHome
        || request.intent.name ===  AmazonIntents.Previous);
  },
  async handle(handlerInput) {
    return Skill.renderMainMenu(handlerInput);
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
      && handlerInput.requestEnvelope.request.intent.name === AmazonIntents.Help;
  },
  async  handle(handlerInput) {
    const {responseBuilder} = handlerInput;
    const speechText = responseBuilder.i18n.s('HELP_INSTRUCTIONS');
    const reprompt = responseBuilder.i18n.s('MAINMENU_REPOMPT');
    return responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .getResponse();
  },
};


const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
      && (handlerInput.requestEnvelope.request.intent.name === AmazonIntents.Cancel
        || handlerInput.requestEnvelope.request.intent.name === AmazonIntents.Stop);
  },
  async handle(handlerInput) {
    const {responseBuilder} = handlerInput;
    const speechText = responseBuilder.i18n.s('GOODBYE');
    return responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.SessionEnded;
  },
  handle(handlerInput) {    
    return handlerInput.responseBuilder.getResponse();
  },
};


const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
      && handlerInput.requestEnvelope.request.intent.name === AmazonIntents.Fallback;
  },
  async handle(handlerInput) {
    const {responseBuilder} = handlerInput;
    const msg = responseBuilder.i18n.s('FALLBACK_TRIGGERED');
    const reprompt = responseBuilder.i18n.s('FALLBACK_RETRY');
    return responseBuilder
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
    const {responseBuilder} = handlerInput;

    const errorMessage = responseBuilder.i18n.s('ERROR');
    const reprompt = responseBuilder.i18n.s('ERROR_REPROMPT');
    return responseBuilder
      .speak(errorMessage)
      .reprompt(reprompt)
      .getResponse();
  },
};


const SelectIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
      && handlerInput.requestEnvelope.request.intent.name ===  AmazonIntents.Select;
  },
  async handle(handlerInput) {
    return Skill.handleSelection(handlerInput);
  },
};

const UserEventHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.APLUserEvent;
  },
  async handle(handlerInput) {
    return Skill.handleUserEvent(handlerInput);
  },
};


const MoreTimeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
      && handlerInput.requestEnvelope.request.intent.name === IntentNames.MoreTime;
  },
  async handle(handlerInput) {
    const {responseBuilder} = handlerInput;
    const responseText = responseBuilder.i18n.s('MORE_TIME');
    const reprompt = responseBuilder.i18n.s('MORE_TIME_REPROMPT');

   
    const response = responseBuilder
      .speak(responseText)
      .reprompt(reprompt )
      .getResponse();

    return response;
  },
};

//#region DEBUG_INTERCEPTORS 
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

//#endregion DEBUG_INTERCEPTORS 

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
