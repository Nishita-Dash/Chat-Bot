const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 8081;
const sessionId = uuid.v4();
app.use(bodyparser.urlencoded({
  extended:false
}))
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/send-msg',(req,res)=>{
  runSample(req.body.MSG).then(data=>{
    //res.send({Reply:data})
    res.send({Reply:data})
  }) 
})

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'rn-bot-kcak') {

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"C:/Users/Dell/Desktop/CLASS/CLD_COMP/project/rn-bot-kcak-8348bea0e480.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`); //once the user enters statement this query displays the input statement.
  console.log(`  Response: ${result.fulfillmentText}`); // this displays the response to the input statement.
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
    if(result.intent.displayName=='pic_from_bucket - custom')
    {
      //return {result.fulfillmentText,result.intent.displayName}
    }
     //this displays the name of the intent.
  } else {
    console.log(`  No intent matched.`);
  }
  const details = {
    intent_response :[ result.fulfillmentText],
    intent_name:[result.intent.displayName]
  }
  //return result.fulfillmentText; //this is returned to the user inteface page.
  return details;
}
app.listen(port,()=>{
  console.log('running on '+port);
})


