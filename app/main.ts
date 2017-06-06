// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import { BackendService } from "./services/backend.service";

const dialogs = require("ui/dialogs");
let deviceToken ="";

 setTimeout(function() {

  let firebase = require("nativescript-plugin-firebase");  
  let clipboard = require("nativescript-clipboard");
firebase.init({
  //persist should be set to false as otherwise numbers aren't returned during livesync
  persist: false,
  // onPushTokenReceivedCallback: function(token) {

  //    dialogs.alert("--onPushTokenReceivedCallback token :" + token);
  //     clipboard.setText(token).then(function() 
  //     { console.log("OK, copied to the clipboard"); });
  //     deviceToken=token;
  //     console.log("Firebase push token: " + token);
  //  },
   onMessageReceivedCallback: function(message) {
    if (message.body !==undefined) {
      dialogs.alert({
       title: "Push message: " + 
       (message.title !== undefined ? message.title : ""),
       message: JSON.stringify(message.body),
       okButtonText: "OK"
     }); 
      // dialogs.alert("--onMessageReceivedCallback deviceToken :" + deviceToken);
      //   clipboard.setText(deviceToken).then(function() 
      //   { console.log("OK, copied to the clipboard"); }
      // );
} 
    //  if (message.body !=="") {
    //   dialogs.alert({
    //    title: "آخر الأخبار" + (message.title !== undefined ? message.title : ""),
    //    message: JSON.stringify(message.body),
    //    okButtonText: "موافق"
    //  })


    //  }
     
    },
  storageBucket: 'gs://forum-syrien.appspot.com',
  onAuthStateChanged: (data: any) => {
    console.log(JSON.stringify(data))
    if (data.loggedIn) {
      BackendService.token = data.user.uid;
    }
    else {
      BackendService.token = "";
    }
  }
}).then(
  function (instance) {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
  );
 }, 3000);
platformNativeScriptDynamic().bootstrapModule(AppModule);