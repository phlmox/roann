function handleMessage(e,l,n){e.reqc.startsWith("badge:")?chrome.action.setBadgeText({text:e.reqc.split(":").slice(1).join(":")}):"bulk"==e.reqc&&chrome.storage.local.get({bulkurls:[]},function(e){var l=Promise.resolve();e.bulkurls.forEach(e=>{l=l.then(function(){let l=0;return chrome.tabs.create({url:e+"#RNBulk"},e=>{l=e.id}),setTimeout(()=>{chrome.tabs.remove(l,function(){})},7500),new Promise(function(e){setTimeout(e,7500)})})})}),n({})}chrome.runtime.onInstalled.addListener(function(){chrome.storage.local.set({roann:"on"},null),chrome.storage.local.set({onlyget:"off"},null),chrome.storage.local.set({maxreq:"125"},null),chrome.storage.local.set({blindurl:"https://johndoe.blind.xss/"},null),chrome.storage.local.set({lastpage:""},null),chrome.storage.local.set({parambox:"off"},null),chrome.storage.local.set({crtfilter:"on"},null),chrome.storage.local.set({advanved:"off"},null),chrome.storage.local.set({waybackfilter:"on"},null)}),chrome.commands.onCommand.addListener(e=>{chrome.storage.local.get(["roann"],function(e){"on"==e.roann?chrome.storage.local.set({roann:"off"},function(){console.log("Stopped!")}):chrome.storage.local.set({roann:"on"},function(){console.log("Running!")})})}),chrome.runtime.onMessage.addListener(handleMessage);