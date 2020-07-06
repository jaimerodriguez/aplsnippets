

const SlotNames = Object.freeze({
  PageName: 'pageName',
  DemoIndex: 'demoIndex',
});


const IntentNames = Object.freeze({
   ShowFeature: 'ShowFeatureIntent', 
   SpinnerScenario: 'SpinnerScenarioIntent', 
   MoreTime: 'MoreTimeIntent', 
});

const AmazonIntents = Object.freeze({ 
  NavigateHome : 'AMAZON.NavigateHomeIntent', 
  Previous : 'AMAZON.PreviousIntent', 
  Help:'AMAZON.HelpIntent',
  Cancel: 'AMAZON.CancelIntent', 
  Stop: 'AMAZON.StopIntent', 
  Fallback: 'AMAZON.FallbackIntent',    
  Select:'AMAZON.SelectIntent'
  
}); 

const RequestTypes = Object.freeze ({
  Launch: 'LaunchRequest', 
  Intent: 'IntentRequest', 
  SessionEnded: 'SessionEndedRequest', 
  APLUserEvent: 'Alexa.Presentation.APL.UserEvent', 
}); 


const UserEventArguments = Object.freeze ({ 
  GoBack : 'goBack', 
  CachedPager_Next : 'Cached_Pager_Next',
  CachedPager_Previous: 'Cached_Pager_Previous',
  MainMenuSelection : 'mainMenuSelection'

}); 

const CustomErrors = Object.freeze ({ 
  NotmplementedException : "NotImplementedException" 

}); 

module.exports = {
  SlotNames, 
  RequestTypes, 
  IntentNames, 
  AmazonIntents, 
  UserEventArgs: UserEventArguments, 
  CustomErrors 
};
