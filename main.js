const puppeteer=require("puppeteer");
const answerobj=require('./answer')
const hackerrankLink="https://www.hackerrank.com/auth/login";
const username="sahilsinha0808@gmail.com";
const password="imrohit@45";

const browserOpenPromise=puppeteer.launch({
    headless:false,
    slowMo:true,
    defaultViewport:null,
    args:["--start-maximized"]
})
let page;
let barr;
let browserObj;
browserOpenPromise.then(function (browser){
    browserObj=browser;
    let newTabOpenPromise=browser.newPage();
    return newTabOpenPromise;
}).then(function (newTab){
    page=newTab;
    let hackerRankPageOpenPromise=page.goto(hackerrankLink);
    return hackerRankPageOpenPromise;
}).then(function (){
    let loginVisiblePromise=page.waitForSelector("input[type='text']",{visible:true},{delay:50});
    return loginVisiblePromise;
}).then (function (){
    let userNameEnterPromise=page.type("input[type='text']",username,{delay:50});
    return userNameEnterPromise;
}).then (function (){
    let passwordEnterPromise=page.type("input[type='password']",password,{delay:50});
    return passwordEnterPromise;
}).then (function (){
    let pageClickPromise=page.click("button[type='submit']",{delay:50});
    return pageClickPromise;
}).then (function (){
    let algowaitclick=waitandclick("a[data-attr1='algorithms']",page)
    return algowaitclick;
}).then (function (){
    let warmupwaitandclick=waitandclick("input[value='warmup']",page);
    return warmupwaitandclick;
}).then(function (){
    let pageWaitPromise=page.waitForTimeout(3000);
    return pageWaitPromise;
}).then(function(){
    let selectAllButtonPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta");
    return selectAllButtonPromise;
}).then (function (buttonsArr){
    barr=buttonsArr;
    console.log("number of questions is",buttonsArr.length);
    let questionWillBeSolve=questionSolver(page,barr[1],answerobj.answerKey[1]);
    return questionWillBeSolve;
}).then(function(){
    console.log("done");
}).catch(function(err){
    console.log(err);
})


function waitandclick(selector,page){
    return new Promise(function (resolve,reject){
        let waitForSelectorPromise=page.waitForSelector(selector,{visible:true});
        waitForSelectorPromise.then(function (){
            let pageclickPromise=page.click(selector,{delay:250});
            return pageclickPromise;
        }).then(function (){
            resolve();
        }).catch(function(err){
            reject();
        })

    })
}
function questionSolver(page,question,answert_txt){
    return new Promise(function (resolve,reject){
        let solveButtonClickPromise=question.click({delay:1000});
        solveButtonClickPromise.then(function (){
            
            let editorInFocusPromise=waitandclick(".overflow-guard",page);
            return editorInFocusPromise;
        }).then(function(){
            return waitandclick(".checkbox-input",page);
        }).then(function(){
            return waitandclick(".custominput",page);
        }).then(function(){
            return page.type(".custominput",answert_txt);
        }).then (function(){
            let ctrlIsPressed=page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then (function(){
            let AisPressed=page.keyboard.press("A");
            return AisPressed;
        }).then (function (){
            let XisPressed=page.keyboard.press("X");
            return XisPressed;
        }).then(function(){
            let ctrlUnPressed=page.keyboard.up("Control");
            return ctrlUnPressed;
        }).then (function (){
            let maineditorInFocusPromise=waitandclick(".overflow-guard",page);
            return maineditorInFocusPromise;
        }).then (function (){
            let ctrlIsPressed=page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then (function (){
            let AisPressed=page.keyboard.press("A");
            return AisPressed;
        }).then (function (){
            let VisPressed=page.keyboard.press("V");
            return VisPressed;
        }).then(function (){
            let submitclickPromise=page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",{delay:50});
            return submitclickPromise;
        }).then (function (){
            return page.waitForSelector(".submission-congratulations.ui-card.ui-layer-2",{visible:true},{delay:100});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}