PennController.ResetPrefix(null);
PennController.AddHost("https://amor.cms.hu-berlin.de/~itoaine/ibex/")
PennController.DebugOff()
PennController.Sequence("IntroConsent", "ParticipantInfo", "Info1", randomize("ProductionTask"), "Info2", randomize("ImageRT_List2"), "send", "final")
//screen 1

PennController("IntroConsent",
newHtml("consent", "screen1.html")
    .print()
,
newButton("Continue", "次へ")
    .settings.center()
    .log()
    .print()
    .wait(
        getHtml("consent").test.complete()
            .failure( getHtml("consent").warn() )
    )
    )
    
    PennController("ParticipantInfo",
newHtml("info", "screen2.html")
    .settings.inputWarning("この項目は必須項目です。")
    .log()
    .print()
,
newButton("Continue", "次へ")
    .settings.center()
    .print()
    .wait(
        getHtml("info").test.complete()
            .failure( getHtml("info").warn() )
    )
    )

    
 //INTRO: TASK 1
    PennController("Info1", //intro to production task
newHtml("consent", "info_1.html")
    .print()
,
newButton("Continue", "次へ")
    .settings.center()
    .print()
    .wait()
    )
//welcome screen

   PennController.Template( PennController.GetTable("Productiontask.csv"),// creates a template to be used for multiple trials; will use .csv in chunk_includes
                         variable =>
   PennController("ProductionTask",
    
   newTimer(1000)
        .start()
        .wait()
        ,
        newText("wait", "スペースバーを押して次に進んでください。")//press spacebar to continue trial
        .print()
        ,
        newKey(" ")
          .settings.log() // Key press and logged start of experiment
          .wait()
        ,
        getText("wait")
         .remove()
   
    ,
     newImage("image", variable.ImageFile)
    .size(200,200)
    .print()
    ,
    newText("label", variable.Description)
    .settings.css("font-size", "30px")
    .settings.center()
    .print()
    ,
    newButton("Continue", "次へ")
    .settings.center()
    .print()
    .settings.log()
    .wait()
    ,
    getImage("image")
    .remove()
    ,
    getText("label")
    .remove()
    ,
    getButton("Continue")
    .remove()
    )
    .log("imagefile", variable.ImageFile)
    .log("name", variable.Description)
    );
    
    
//INTRO: TASK 2
    PennController("Info2",
newHtml("consent", "info_2.html")
    .print()
,
newButton("Continue", "次へ")
    .settings.center()
    .print()
    .wait()
    )

//TASK 2:Image Choice- RT "LIST 2"
 
 PennController.Template( PennController.GetTable("List2.csv"),// creates a template to be used for multiple trials; will use .csv in chunk_includes
                         variable =>
   PennController("ImageRT_List2",
             newText("wait", "スペースバーを押して次に進んでください。")
        .print()
        ,
        newKey(" ")
          .settings.log() // Key press and logged start of experiment
          .wait()
        ,
        getText("wait")
         .remove()
    ,
        newAudio("sentence", variable.AudioFile)
        .play()
    ,
       newImage("left", variable.LeftImageFile)
        .size(200,200)
    ,
    newImage("right", variable.RightImageFile)
        .size(200,200)
    ,
    newTimer("delay", 1000)
    .start()
    ,
    newCanvas("pictures",450,200)
        .add(   0 , 0 , getImage("left") )
        .add( 250 , 0 , getImage("right") )
        .print()
    ,
    // newKey("FJ")
    newSelector()
        .add( getImage("left") , getImage("right") )
        .keys(          "D"    ,          "K"   )
        .settings.disableClicks()
        .settings.log()
        .wait()
    ,
    getAudio("sentence")
   .wait("first")
       ,
        getCanvas("pictures")
        .remove()
    
)
    .log("LeftImage", variable.LeftImageFile)
    .log("RightImage", variable.RightImageFile)
    .log("RightImage", variable.CorrectImage)
    );

//Send Results
    
PennController.SendResults( "send" );  

//Final Page

PennController( "final" ,
    newText("<p>ご参加ありがとうございました。</p>")
        .settings.css("font-size", "25px")
        .print()
     ,
     newText("<p>ブラウザはもう閉じてかまいません。</p>")
         .settings.css("font-size","25px")
                .print()
                ,
     newButton("void")
        .wait()
        
       )