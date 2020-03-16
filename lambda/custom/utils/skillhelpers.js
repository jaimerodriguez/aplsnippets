
function supportsDisplay(handlerInput) {
  return handlerInput.requestEnvelope.context
      && handlerInput.requestEnvelope.context.System
      && handlerInput.requestEnvelope.context.System.device
      && handlerInput.requestEnvelope.context.System.device.supportedInterfaces
      && handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
}


function supportsAPL(handlerInput) {
  return handlerInput.requestEnvelope.context
      && handlerInput.requestEnvelope.context.System
      && handlerInput.requestEnvelope.context.System.device
      && handlerInput.requestEnvelope.context.System.device.supportedInterfaces
      && handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL'];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getKeyFromIndexOnMap(index, map) {
  const keys = map.keys();
  let count = 1;
  let item = null;

  do {
    item = keys.next();
    if (count === index) {
      return item.value;
    }
    count += 1;
  } while (item.done !== true);

  return null;
}

function getActionName(handlerInput) {
  if (handlerInput.requestEnvelope.request.type === 'IntentRequest') {
    return `intent ${handlerInput.requestEnvelope.request.intent.name}`;
  }

  if (handlerInput.requestEnvelope.request.type === 'LaunchRequest') {
    return 'LaunchRequest';
  }

  const requests = ['IntentRequest',
    'LaunchRequest',
    'PlaybackController.NextCommandIssued',
    'Display.ElementSelected',
    'AlexaSkillEvent.SkillEnabled',
    'AlexaHouseholdListEvent.ItemsCreated'];

  console.assert(requests.contains(handlerInput.requestEnvelope.request.type), `unknown request type${handlerInput.requestEnvelope.request.type}`);

  return handlerInput.requestEnvelope.request.type;
}
function getErrorDetails(handlerInput, error) {
  if (process.env.DEBUGLOG && (process.env.DEBUGLOG === 'error' || process.env.DEBUGLOG === 'verbose')) {
    console.log(`Start: Error details for ${error.message}`);
    console.log(error.stack);
    console.log(`End: Error details for ${error.message}`);
  }
  let result = `Error ${error.name} while handling ${getActionName(handlerInput)} request \n`;
  result += `Error is ${error.message} \n`;

  return result;
}

/**
 * returns the device supported interfaces in an Array. Sample values include 'Display', 'VideoApp'
 * , 'AudioPlayer', 'Alexa.Presentation.APL' , etc.
 * @param {Object} handlerInput the Alexa request
 */
function getSupportedInterfaces(handlerInput) {
  if (handlerInput.requestEnvelope.context
    && handlerInput.requestEnvelope.context.System
    && handlerInput.requestEnvelope.context.System.device
    && handlerInput.requestEnvelope.context.System.device.supportedInterfaces) {
    const device = handlerInput.requestEnvelope.context.System.device;
    return Object.getOwnPropertyNames(device.supportedInterfaces);
  }
  return [];
}

/**
 * returns true if the device supports the interface
 * @param {Object} handlerInput the Alexa request
 * @param {string} interfaceName  the Interface to check for (e.g. 'Display' or 'VideoApp')
 */
function supportsInterface(handlerInput, interfaceName) {
  const envelope = handlerInput.requestEnvelope;
  if (envelope.context
      && envelope.context.System
      && envelope.context.System.device
      && envelope.context.System.device.supportedInterfaces) {
    return envelope.context.System.device.supportedInterfaces[interfaceName] !== undefined;
  }
  return false;
}


function getRandomIntInRange(min, max) {
  let random = getRandomInt(max);
  // LAME check, try twice to get a number.. this just attempts to prevent getting too many mins.
  if (random < min) {
    random = getRandomInt(max);
    if (random < min) { random = min; }
  }

  return random;
}

function addSSMLBreak(duration) {
  return `<break time="${duration}" />`;
}

/**
 *  returns the identifier from a slot, or null if slot is not resolved
 * @param {Alexa slot} slotNode
 */
function getVisualContextAuthorityResolvedIdentifier(slotNode) {
  console.log(`Invoked getResolvedIdentifier. slotNode: ${JSON.stringify(slotNode)}`);
  if (slotNode.resolutions == null
        || slotNode.resolutions.resolutionsPerAuthority == null
        || slotNode.resolutions.resolutionsPerAuthority.length === 0) {
    console.log('Slot node has no resolutions or resolutionsPerAuthority is empty.');
    return null;
  }

  const resolutionsPerAuthority = slotNode.resolutions.resolutionsPerAuthority;
  const VISUALCONTEXTID = 'amz1.er-authority.visual-context';

  const authorities = resolutionsPerAuthority.filter(res => res.authority === VISUALCONTEXTID);
  const visualContextAuthority = (authorities != null && authorities.length > 0)
    ? authorities[0] : null;

  if (visualContextAuthority === null
        || visualContextAuthority.status.code !== 'ER_SUCCESS_MATCH') {
    console.log('Visual context authority is null or status code is not ER_SUCCESS_MATCH');
    return null;
  }

  const resolvedValue = visualContextAuthority.values[0].value.id;
  console.log(`Resolved value ${resolvedValue}`);
  return resolvedValue;
}

/**
 *
 * @param {string} doc - relative path the json document
 * @param {(string\|object)=} datasource - when string: relative path to document object;
 *                  when object: data source
 * @param {string=} token - token for the document
 */

function createAPLDocDirective(doc, datasource, token) {
  const directive = {
    type: 'Alexa.Presentation.APL.RenderDocument',
    version: '1.0',
  };

  if (!doc) {
    throw new Error('document is required for APL RenderDoc directive');
  }

  /* eslint-disable import/no-dynamic-require */
  /* eslint-disable global-require */
  if (doc && typeof (doc) === 'string') { directive.document = require(doc); }
  if (datasource && typeof (datasource) === 'string') { directive.datasources = require(datasource); }
  if (token) {
    directive.token = token;
  }
  return directive;
}

/**
 *
 * @param {string} token
 * @param {Array} commands
 */
function createAPLCommandDirective(token, commands) {
  const directive = {
    type: 'Alexa.Presentation.APL.ExecuteCommands',
  };
  if (token) { directive.token = token; }

  if (commands) {
    directive.commands = commands;
  } else {
    throw new Error('Commands are Required for a command directive');
  }
  return directive;
}


function getLocale(handlerInput) {
  return handlerInput.requestEnvelope.request.locale;
}

module.exports = {
  Utils: {
    getRandomInt: getRandomInt,
    getRandomIntInRange: getRandomIntInRange,
    addSSMLBreak: addSSMLBreak,
    getKeyFromIndexOnMap: getKeyFromIndexOnMap,
  },

  AlexaUtils: {
    supportsDisplay: supportsDisplay,
    supportsAPL: supportsAPL,
    getErrorDetails: getErrorDetails,
    getSupportedInterfaces: getSupportedInterfaces,
    supportsInterface: supportsInterface,
    getVisualContextAuthorityResolvedIdentifier: getVisualContextAuthorityResolvedIdentifier,
    createAPLDocDirective: createAPLDocDirective,
    createAPLCommandDirective: createAPLCommandDirective,
    getLocale: getLocale,
  },
};
