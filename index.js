// cd Desktop/AdventureGameSDK
// sudo rm -r foo.zip
// zip -r foo.zip .

//Questions for amazon: is there a way to cascade state dependent handlers then check state independent handlers?

//NOTES: it gets kind of confusing trying to remember that reprompts are as if they have answered the states question, information and help is as if they have not yet answered the previous states question.


'use strict';
var Alexa = require("alexa-sdk");
var appId = 'amzn1.ask.skill.058ff9ec-2f5e-47c1-99fd-9149a1e9ad1f';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(newSessionHandlers, FirstStateHandlers, SecondStateHandlers, ThirdStateHandlers, FourthStateHandlers, FifthStateHandlers, SixthStateHandlers, SeventhStateHandlers, EighthStateHandlers, NinthStateHandlers, TenthStateHandlers, EleventhStateHandlers, TwelfthStateHandlers, ThirteenthStateHandlers, ThirteenthPTFiveStateHandlers, FourteenthStateHandlers, functionHandlers); //, guessModeHandlers, startGameHandlers, guessAttemptHandlers);
    alexa.execute();
};

//
// These are the different game states: lobby, setup, playing  you then map the different handlers to game states, I like my way of maping the states inside the intent handlers that way there is always a default action for an intent.  This way i need to remember to put each intent in each state
//

var states = {
    LOBBYMODE:    '_LOBBYMODE', // Calebs: in game lobby -- NOT USED

    FIRSTMODE:    '_FIRSTMODE',
    SECONDMODE:   '_SECONDMODE',
    THIRDMODE:    '_THIRDMODE',
    FOURTHMODE:   '_FOURTHMODE',
    FIFTHMODE:    '_FIFTHMODE',
    SIXTHMODE:    '_SIXTHMODE',
    SEVENTHMODE:  '_SEVENTHMODE',
    EIGHTHMODE:   '_EIGHTHMODE',
    NINTHMODE:    '_NINTHMODE',
    TENTHMODE:    '_TENTHMODE',
    ELEVENTHMODE:   '_ELEVENTHMODE',
    TWELFTHMODE:    '_TWELFTHMODE',
    THIRTEENTHMODE: '_THIRTEENTHMODE',
    THIRTEENTHPTFIVEMODE: '_THIRTEENTHPTFIVEMODE',
    FOURTEENTHMODE: '_FOURTEENTHMODE',
};

///// CCG VARIALBES

var helpMessage = ` You're playing the TSA Experience. Your objective is to make it swiftly and uneventfully through the TSA security check point.  If you need help with a certain situation say Information.  Otherwise, answer the gosh darn question, there are people waiting behind you in line. Thanks.`;

var newSessionHandlers = {
    'NewSession': function() {
        this.handler.state = states.FIRSTMODE;
        var message = `Welcome to the TSA training simulation.  The story begins.  You're dropped off at the departures entrance of an international airport with little time to spare.  Your flight leaves in less than an hour.  You rush to check your bags and claim your boarding pass.  As you approach the check in area you find a touch screen terminal.  It prompts you to enter the flight check in code you were emailed.  did you take a screenshot of the check in code when you opened the email on your phone? Yes or No?`;
        var reprompt = `Did you screen shot your boarding information? Yes or No?`;
        this.emit(':ask',message,reprompt);
    },
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` `;
      this.emit(':ask', message, message);
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        //--> push to welcome if new session bc unhandled means some sort of other intent was invoked which is meaningless
        this.emit('WelcomeResponseFunction');
    }
};

/////////////////////////////////

var FirstYes = ` Really, because you can't seem to find it in your camera roll. `;
var FirstNo = ` Shoot, what should you do? Say search your email or ask for assistance? `;
var FirstReprompt = ` Say search your email or ask for assistance? `;

var FirstStateHandlers = Alexa.CreateStateHandler(states.FIRSTMODE, {//Screen Shot of Checkin
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.SECONDMODE;
      var message = FirstYes + FirstNo;
      var reprompt = FirstReprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.SECONDMODE;
      var message = FirstNo;
      var reprompt = FirstReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked if you took a screen shot of the email your airline sent you verifying your flight.  If you did say Yes, If not say No. `;
      this.emit(':ask', message, 'Say Yes or No.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Did you screen shot your boarding information? Yes or No?';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var SecondEmail = ` You still don't find the email and now you look like your texting at the kiosk while other travelers are impatiently trying to get to their own destinations.  You should probably ask for assistance.  `;
var SecondAssistance = ` The attendant says you can also slide a credit card if it's linked to your last name.  You slide your credit card and success, you're in.  Now for a barrage of prompts.  Does your suitcase contain any explosives yes or no? `;

var SecondStateHandlers = Alexa.CreateStateHandler(states.SECONDMODE, { //Find checkin value
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'EmailIntent': function () {
      this.handler.state = states.SECONDMODE;
      var message = SecondEmail;
      var reprompt = ` You should ask for assistance. `;
      this.emit(':ask',message,reprompt);
    },
    'AssistanceIntent': function () {
      this.handler.state = states.THIRDMODE;
      var message = SecondAssistance;
      var reprompt = ` Does your suitcase contain any explosives yes or no? `;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You're still looking for your boarding information.  Say check my email or Say Ask for Assistance.`;
      this.emit(':ask', message, "Say Check my email or say Ask for Assistance.");
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Please Say check your email or ask for assistance. ';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var ThirdYes = ` Please place explosives in the trashcan to your left.  Please do not drop or throw explosives as they have been known to detonate.  Gently place your explosives in the trash as they are not allowed on the plane. `;
var ThirdNo = ` Thank you.  Does your baggage contain any batteries?  `;
var ThirdReprompt = ` Does your baggage contain any batteries? `;

var ThirdStateHandlers = Alexa.CreateStateHandler(states.THIRDMODE, { //Explosives
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.FOURTHMODE;
      var message = ThirdYes + ThirdNo;
      var reprompt = ThirdReprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.FOURTHMODE;
      var message = ThirdNo;
      var reprompt = ThirdReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked if there are explosives in your luggage.  Say yes or no.`;
      this.emit(':ask', message, "Say yes or No.");
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Does your suitcase contain any explosives yes or no? ';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var FourthYes = ` Please wait for a customer service representative.  A customer service representative approaches and informs you that the prompt refers to large industrial batteries.  It does not refer to small duracell batteries, camera batteries, cellphone batteries, gopro batteries, or practically any consumer grade battery.  Yes the prompt is slightly confusing.  Unfortunately you'll have to restart the check in process as your bag has been flagged.  You start over with a sigh and click through the prompts you have already completed. `;
var FourthNo = ` Next, would you like to pay 200 dollars for two more inches of leg room? `;
var FourthReprompt = ` Would you like to pay 200 dollars for two more inches of leg room? Yes or No? `;

var FourthStateHandlers = Alexa.CreateStateHandler(states.FOURTHMODE, {//Batteries
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.FIFTHMODE;
      var message = FourthYes + FourthNo;
      var reprompt = FourthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.FIFTHMODE;
      var message = FourthNo;
      var reprompt = FourthReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked if there are batteries in your luggage.  Say yes or no.`;
      this.emit(':ask', message, 'Say yes or no.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Does your baggage contain any batteries? ';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var FifthYes = ` Great, Please note you are now next to an emergency exit and have taken on the responsibility of operating the exit in case of an emergency.  If you fail to operate the exit properly in an emergency you may die.  If you survive you may be charged with manslaughter for any patrons who perish do to your failure to properly operate the emergency exit.  Given this responsibility we'd be more than happy to switch you back to your original seat for an additional charge of zero dollars. Simply ask your flight attendant upon boarding.  Thank you. `;
var FifthNo = ` Hmmm, Aren't you frugal.  Or perhaps you're saving your money for the 10 dollar wifi, 7 dollar nips, six dollar pringles, or to buy the kid next to you a candy bar just to be nice.  Although he definitely won't accept the candy bar because he's too sceptical of everyone on the airplane.  He'll spend the entire flight watching your every move and reporting your most innocent actions to the ministry of Love.  What a charming young boy.  `;
var FifthQuestion = ` Ok, You're done. You grab your ticket from the dispenser below and place your bag on the scale.  It reads fifty one pounds.  Drat, that's one pound over the limit.  You know you have a few small objects in the front so you unzip the pouch, reach in, and pull out a small phillips head screwdriver, a pair of pliers, and a pair of scissors.  which should you put into your carry on bag? the screw driver, pliers or scissors? `;
var FifthReprompt = ` which should you put into your carry on bag? the screw driver, pliers or scissors? `;


var FifthStateHandlers = Alexa.CreateStateHandler(states.FIFTHMODE, {//200 Dollar Upgrade
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.SIXTHMODE;
      var message = FifthYes + FifthQuestion;
      var reprompt = FifthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.SIXTHMODE;
      var message = FifthNo + FifthQuestion;
      var reprompt = FifthQuestion;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked if you'd like to upgrade your seat.  Say yes or no.`;
      this.emit(':ask', message, 'Say yes or no.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Would you like to pay 200 dollars for two more inches of leg room? Yes or No?';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var SixthQuestion = ` Great, your bag is under 50 pounds.  You wheel it over to the x-ray machine.  As you begin to step away you hear.  Ahem, would you please stow the handle of your rolling suitcase.  Sure there's  a please, but it doesn't sound very heart felt.  Would you like to stow the handle, yes or no? `;
var SixthReprompt = ` Would you like to stow the handle, yes or no?  `;

var SixthStateHandlers = Alexa.CreateStateHandler(states.SIXTHMODE, {//Screwdriver, pliers or Scissors
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'ScrewDriverIntent': function () {
      this.handler.state = states.SEVENTHMODE;
      this.attributes['TOOL'] = 'screwdriver';
      var message = ` You stuff the Screwdriver into your carry on. ` + SixthQuestion;
      var reprompt = SixthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'PliersIntent': function () {
      this.handler.state = states.SEVENTHMODE;
      this.attributes['TOOL'] = 'pliers';
      var message = ` You stuff the pliers into your carry on. ` +SixthQuestion;
      var reprompt = SixthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'ScissorsIntent': function () {
      this.handler.state = states.SEVENTHMODE;
      this.attributes['TOOL'] = 'scissors';
      var message = ` You stuff the scissors into your carry on. ` +SixthQuestion;
      var reprompt = SixthReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You need to move some weight from your checked bag to your carry on. You're holding pliers, a screwdriver and scissors.  Pick one to put in your carry on.  Say screwdriver, pliers or scissors.`;
      this.emit(':ask', message, 'Say screwdriver, pliers or scissors.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Which tool should you put into your carry on bag? Please Say screwdriver, pliers, or scissors. ';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var SeventhYes = ` You step back, depress the button with your thumb and slowly slide the handle into the bag all the while making direct eye contact with the TSA employee.  Thanks, he grumbles.  You snap your eyes forward and move on to the TSA check point.  You are presented with two lines.  One is shorter than the other.  Which line do you choose? Short or Long? `;
var SeventhNo = ` Ahem, that's not my job he says.  I'd put up a sign reminding passengers to kindly stow their suitcase handles but there's simply no place to put one.  All the prime real estate is taken up by other more threatening signs and reminders. `;
var SeventhReprompt = `  Which line do you choose? Short or Long? `;

var SeventhStateHandlers = Alexa.CreateStateHandler(states.SEVENTHMODE, {//Stow Handle
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.EIGHTHMODE;
      var message = SeventhYes;
      var reprompt = SeventhReprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.EIGHTHMODE;
      var message = SeventhNo + SeventhYes;
      var reprompt = SeventhReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked to stow the handle of your rolling suitcase. would you like to comply? Say yes or no.`;
      this.emit(':ask', message, 'Say yes or no.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Would you like to stow your suitcase handle? please say yes or no?';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var EighthShort = ` Although the line is shorter it appears to be moving slower than the other line.  you look up and realize your mistake.  this line has only one body scanner while the other splits into an x-ray machine and a body scanner.  By this point another family has blocked you in so you can't switch lines.  Not that you'd dare switching lines anyways, you imagine something as efficient and reckless as switching lines will only land you in some uncomfortable interrogation room.  Since this is the greatest fear you experience in america you realize it's worth bearing. other peoples are subjugated and tormented, the TSA was simply designed to make us feel that way. `;
var EighthLong = ` Sure the line is longer and while picking this line feels like an illogical choice you have the feeling things aren't always as they appear in the TSA twilight zone.  And you're right.  This line is moving at an astounding pace.  you realize it's because this line splits into two different x-ray scanners.  Lucky for you, not so lucky for that family with the little kid that unknowingly chose the short yet unmoving line. `;
var EighthQuestion = ` Finally it's your turn.  you hand your driver's license and boarding pass to the TSA agent.  he holds the license under a blacklight, initials the ticket, then looks up.  his eyes peer deep into yours, squeezing at your soul with an intense purposeful gaze.  Then it's gone.  "Next" he says with a voice devoid of emotion.  Welcome to the purgatory that is the TSA.  the land between baggage check and the oh so needed frequent flier bar.
Perfect. Now that you're through the fun begins.  welcome one, welcome all to the x-ray scanner.  there's a pile of bins to put your stuff in.  since there inconveniently located behind the conveyer it only makes sense to grab a stack before stepping forward in line.  How many bins do you want to grab. 1 2 3 4 or 5?
 `;
var EighthReprompt = ` How many bins do you want to grab. 1 2 3 4 or 5 `;

var EighthStateHandlers = Alexa.CreateStateHandler(states.EIGHTHMODE, {//Short Long
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'ShortIntent': function () {
      this.handler.state = states.NINTHMODE;
      var message = EighthShort + EighthQuestion;
      var reprompt = EighthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'LongIntent': function () {
      this.handler.state = states.NINTHMODE;
      var message = EighthLong + EighthQuestion;
      var reprompt = EighthReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You need to pick a line to stand in.  PIck the short line or the long line.  Say short or long.`;
      this.emit(':ask', message, 'Say short or long.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. Which line do you choose? Please Say short or long.';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var NinthQuestion = ` Nice, let's see how it plays out.  We remove our shoes and belt, that goes in one bin.  Whoa, as your pants slide down you realize suspenders are the way to go... with plastic clips, even if they don't match your outfit.  Next step.  throw your backpack on the conveyer, unzip the back pocket and put your laptop in a second tray.  third tray coming up fast.  Pockets and I mean pockets.  Phone, wallet, keys, chewing gum, paper clips, gum wrapper, lucky penny, receipts.  I think you got it all.  Boom, next.  Carry on, collapse the handle, plop it on the conveyor.  next unzip the carry on and put your toiletries in a bin, that's four, now hop in line, Sure you're in America but you don't have your wallet on you, are you really a U S citizen? you begin to wonder, this is the longest 3 person line you've ever waited in.  The line is moving, Say step forward. `;
var NinthReprompt = ` The line is moving, Say step forward. `;

var NinthStateHandlers = Alexa.CreateStateHandler(states.NINTHMODE, {//1,2,3,4, or 5
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'OneIntent': function () {
      this.handler.state = states.TENTHMODE;
      var message = NinthQuestion;
      var reprompt = NinthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'TwoIntent': function () {
      this.handler.state = states.TENTHMODE;
      var message = NinthQuestion;
      var reprompt = NinthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'ThreeIntent': function () {
      this.handler.state = states.TENTHMODE;
      var message = NinthQuestion;
      var reprompt = NinthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'FourIntent': function () {
      this.handler.state = states.TENTHMODE;
      var message = NinthQuestion;
      var reprompt = NinthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'FiveIntent': function () {
      this.handler.state = states.TENTHMODE;
      var message = NinthQuestion;
      var reprompt = NinthReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` Pick the number of bins to pick up at the TSA x-ray conveyor belt. Say 1 2 3 4 or 5.`;
      this.emit(':ask', message, 'Say 1 2 3 4 or 5.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. How many bins do you want to grab? Please Say 1 2 3 4 or 5.';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////
var TenthStepForward = ` Another 30 seconds of anxiety, step forward again. `;
var TenthReprompt = ` Say step forward again.`;

var TenthStateHandlers = Alexa.CreateStateHandler(states.TENTHMODE, {//Move Forward
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'StepForwardIntent': function () {
      this.handler.state = states.ELEVENTHMODE;
      var message = TenthStepForward;
      var reprompt = TenthReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You're waiting in line for the full body scanner.  The person in front of you just moved up.  Say move forward.`;
      this.emit(':ask', message, 'Say move forward.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. The line is moving, Please Say step forward.';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var EleventhStepForward = ` You're in the scanner.  feet planted, hands above your head, looking forward.  the wand passes by you.  No good.  Excuse me, are your pockets empty, no metal on you? Um, I have a small gold necklace, my wedding ring, my jeans have a metal zipper, I have two screws in my collar bone, I have heavy metal in my soul.  Seriously though like A C D C, that's my jam.  I'm sorry what was the question again? As you emerge from the scanner you're accosted by a metal detecting wand and a TSA employee with rubber gloves.  You're informed they'll be poking and examining your body, this is not a question, not the consented touching you learned about from your college resident assistant.  With your last shred of humor you try desperately to make eye contact with your handsy new friend, but they're good.  They avoid your gaze like it's their job.  And in fact it is. Next, as you step towards the conveyor to grab your stuff a TSA agent asks you. "Is this your bag", with a sinking feeling you admit it's your bag and ask what the problem is.  She says there's been some metal detected in your bag.  they're going to have to take a closer look.  Is that ok with you? Yes or No? `;
var EleventhReprompt = ` Is that ok with you? Yes or No?`;

var EleventhStateHandlers = Alexa.CreateStateHandler(states.ELEVENTHMODE, {//Move Forward Again
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'StepForwardIntent': function () {
      this.handler.state = states.TWELFTHMODE;
      var message = EleventhStepForward;
      var reprompt = EleventhReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You're waiting in line for the full body scanner.  The person in front of you just moved up.  Say move forward.`;
      this.emit(':ask', message, 'Say move forward.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. The line is moving, Please Say step forward.';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////


//************************** SPLIT Question in two and put a variable holding the tool inbetween
var TwelfthYes = ` Great, `;
var TwelfthNo = ` Bummer, I know that sounded like a question but it really wasn't.  `;
var TwelfthQuestion = ` She carries your bag to a steel table, unzips it and starts pulling apart your clothes, she lifts out condoms and makes awkward eye contact with you, next is the hygiene products, thank god you're waiting to buy hemorrhoid cream until you arrive at your destination.  You're mind begins to wander wondering what other personal items she'll display for the other airport goers to view.  Perhaps you'll get a date out of the spectacle.  After all this is the raw and uncensored you.  Just when you think the search is over she finds the `;
var TwelfthQuestion2 = `from earlier. Hmmm
Are you aware that this is metal she asks.  yes or no. `;
var TwelfthReprompt = ` Are you aware that this is metal she asks.  yes or no. `;

var TwelfthStateHandlers = Alexa.CreateStateHandler(states.TWELFTHMODE, {//Is this metal
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.THIRTEENTHMODE;
      var message = TwelfthYes + TwelfthQuestion + this.attributes['TOOL'] + TwelfthQuestion2;
      var reprompt = TwelfthReprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.THIRTEENTHMODE;
      var message = TwelfthNo + TwelfthQuestion + this.attributes['TOOL'] + TwelfthQuestion2;
      var reprompt = TwelfthReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked if your bags can be searched.  Say yes or no.`;
      this.emit(':ask', message, 'Say yes or No.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
 var reprompt = ' That was not an appropriate response. You\'re going to be felt up. Is that ok with you? Yes or No?';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var ThirteenYes = ` Ok. `;
var ThirteenNo = `  Interesting.  She waves her metal detecting wand over the `;
var ThirteenNo2 = ` and it beeps.  My wand here would agree that this is metal.  Usually the shiny silver surface, weight and strength of such an item would give that away.  I suggest googling the word metal when you get home.  But I digress.  `;
var ThirteenQuestion = ` Are you aware that any tool over 4 inches long is prohibited on this aircraft?  Yes or No? `;
var ThirteenReprompt = ` Are you aware that any tool over 4 inches long is prohibited on this aircraft?  Yes or No? `;

var ThirteenthStateHandlers = Alexa.CreateStateHandler(states.THIRTEENTHMODE, {//Length Requirement
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.THIRTEENTHPTFIVEMODE;
      var message = ThirteenYes + ThirteenQuestion;
      var reprompt = ThirteenReprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.THIRTEENTHPTFIVEMODE;
      var message = ThirteenNo + this.attributes['TOOL'] + ThirteenNo2 + ThirteenQuestion;
      var reprompt = ThirteenReprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked if you know what metal is? Say yes or No.`;
      this.emit(':ask', message, 'Say yes or No.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
   var reprompt = ' That was not an appropriate response. Are you aware that this tool is metal? Please Say yes or no.';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var ThirteenPT5Yes = ` So, I take it you measured the `;
var ThirteenPT5Yes2 = ` at home.  Um, sure you reply. `;
var ThirteenPT5No = `  Well then, I take it you didn't read through the entire TSA prep guide while packing your bag.  Typical.  `;
var ThirteenPT5Question = ` She pulls out a ruler and measures.  This appears to be your lucky day. 3 point 7 5 inches.  You make your way back to the conveyor, grab your shoes, belt, laptop, back pack and toiletries.  You then walk in your socks a considerable distance from the TSA check point before putting yourself back together.
Thank you for choosing to fly.  we hope this experience will make your vacation, work outing, or visit home that much more enjoyable.  we look forward to seeing you again, all of you, with our full body scanner. By the way, Nice body.. Until we meet again, all the best, the TSA.
Please rate your TSA experience. 1 being, O M G that was so true and I'll only play this simulation at parties to make my friends uncomfortable.  5 being, I will play this simulation each and every evening before bed, I can't imagine a better way to fall asleep.  Please select 1 2 3 4 or 5. `;
var ThirteenPT5Reprompt = `  Please rate your experience, select 1 2 3 4 or 5. `;

var ThirteenthPTFiveStateHandlers = Alexa.CreateStateHandler(states.THIRTEENTHPTFIVEMODE, {//Length Requirement
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'YesIntent': function () {
      this.handler.state = states.FOURTEENTHMODE;
      var message = ThirteenPT5Yes + this.attributes['TOOL'] + ThirteenPT5Yes2 + ThirteenPT5Question;
      var reprompt = ThirteenPT5Reprompt;
      this.emit(':ask',message,reprompt);
    },
    'NoIntent': function () {
      this.handler.state = states.FOURTEENTHMODE;
      var message = ThirteenPT5No + ThirteenPT5Question;
      var reprompt = ThirteenPT5Reprompt;
      this.emit(':ask',message,reprompt);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` You've been asked if you know the length requirements for small tools in carry on luggage.  Say yes or no.`;
      this.emit(':ask', message, 'Say yes or No.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
   var reprompt = ' That was not an appropriate response. You\'ve been asked if you know the length requirements for small tools in carry on luggage.  Please say yes or no.';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////

var FourteenthAnswer = ` Thank you, your answer has been recorded.  Please note.  This information will be shared with the anti terrorism task force and the patriot act committee.  It will be cross referenced against your google search history, gps location data and a list of your 100 closest acquaintances.  Please rest assured that the best way for us to keep you safe is for us to watch you every hour of every day.
To book a true TSA experience please purchase a plane ticket from your preferred airline.  If you appreciate this skill please leave a 5 star review. Thank you and Good by.`;

var FourteenthStateHandlers = Alexa.CreateStateHandler(states.FOURTEENTHMODE, {//1,2,3,4, or 5 Rating
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    //Primary Intents
    'OneIntent': function () {
      var message = FourteenthAnswer;
      this.emit(':tell',message);
    },
    'TwoIntent': function () {
      var message = FourteenthAnswer;
      this.emit(':tell',message);
    },
    'ThreeIntent': function () {
      var message = FourteenthAnswer;
      this.emit(':tell',message);
    },
    'FourIntent': function () {
      var message = FourteenthAnswer;
      this.emit(':tell',message);
    },
    'FiveIntent': function () {
      var message = FourteenthAnswer;
      this.emit(':tell',message);
    },
    //Help Intents
    "InformationIntent": function() {
      console.log("INFORMATION");
      var message = ` Thank you for playing, please rank your experience from 1 to 5.  Say 1 2 3 4 or 5. `;
      this.emit(':ask', message, 'Say 1 2 3 4 or 5.');
    },
    "AMAZON.StopIntent": function() {
      console.log("STOPINTENT");
      this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      console.log("CANCELINTENT");
      this.emit(':tell', "Goodbye!");
    },
    'AMAZON.HelpIntent': function() {
        var message = helpMessage;
        this.emit(':ask', message, message);
    },
    //Unhandled
    'Unhandled': function() {
        console.log("UNHANDLED");
        var reprompt = ' That was not an appropriate response. You\'ve been asked to rate your experience. Please Say 1 2 3 4 or 5.';
        this.emit(':ask', reprompt, reprompt);
    }
});

/////




























var functionHandlers = {//NOT USED IN THIS APP
    'WelcomeResponseFunction': function(val) {
      var speechOutput = `   `; // <audio src="https://calebgates.net/audio/sampleAudio16000_48kb_0db.mp3" />  `;
      var repromptText = "  ";
      this.emit(':ask', speechOutput, repromptText);
    },
///////////////////////////////////////////////////////////////////////////////////////////////


};







//#############################HELPERS VVVV#########################
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function clone(a) {
   return JSON.parse(JSON.stringify(a));
}
function responseRandomizer(responseType){
  let len = responseType.length;
  let index = getRandomInt(0,len-1);
  return responseType[index];
}
var vowels = {}
function aAn(word){
  if(word != ''){
    let first = word[0];
    if(/[aAeEiIoOuU]/.test(first)){
      return 'an';
    }else{
      return 'a';
    }
  }else{
    return '';
  }
}
