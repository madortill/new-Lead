const NUM_OF_LEADERS = 15;
// reaction function
const NUM_OF_EXPLOSION_STAGES = 6;
const arrLeaders = [{
    "name": "מארי קירי",
    "act": "דמות מדענית פורצת גבולות, חלוצה בחקר הקרינה הרדיואקטיבית."
  },
  {
    "name": "אילון מאסק",
    "act": "דמות מנהיגה פורצת דרך בתחום הטכנולוגיה והחלל."
  },
  {
    "name": "חנה סנש",
    "act": "דמות לוחמת ומשוררת יהודייה, מצנחני היישוב, שהייתה לסמל של אידיאליזם והקרבה עצמית."
  },
  {
    "name": "עדי אלטשולר",
    "act": 'דמות מנהיגה, אשת חינוך ויזמית חברתית. מייסדת תנועת "כנפיים של קרמבו" (תנועת נוער לצעירים עם ובלי צרכים מיוחדים).'
  },
  {
    "name": "הרב קוק",
    "act": 'דמות שהייתה הרב הראשי האשכנזי הראשון בארץ ישראל, ונחשבת לאחת מאבות הציונות הדתית.'
  },
  {
    "name": "יהודה המכבי",
    "act": "דמות מצביאה ומנהיגה יהודית שעמדה בראש מרד החשמונאים."
  },
  {
    "name": "סטף ורטהיימר",
    "act": "דמות תעשיינית ישראלית שייסדה מפעלים מובילים בארץ ובעולם, זוכת פרס ישראל וחברת הכנסת התשיעית מטעם התנועה הדמוקרטית לשינוי."
  },
  {
    "name": 'ד"ר דני גולד',
    "act": 'דמות ששימשה כראש המנהל למחקר, פיתוח אמצעי לחימה ותשתית טכנולוגית, ותת אלוף במילואים בצה"ל.'
  },
  {
    "name": "אהוד שבתאי",
    "act": 'דמות מייסדת מרכזית של אפליקציית "ווייז", אשר הציבה את ישראל במקום של כבוד לצד מפתחי אפליקציות מובילות בקנה מידה עולמי.'
  },
  {
    "name": "מלאלה יוספזאי",
    "act": "דמות מנהיגה חברתית אשר לחמה למען זכויות נערות מהעיר מינגורה בפקיסטן."
  },
  {
    "name": "אירנה סנדלר",
    "act": "דמות חסידת אומות עולם שהצילה 2500 ילדים יהודים במהלך השואה תוך סיכון חייה. עובדת סוציאלית וחברת מחתרת, שהתנגדה לנאצים בזמן מלחמת העולם השנייה."
  },
  {
    "name": "אליס מילר",
    "act": 'דמות שנאבקה למען פתיחת קורס הטיס בצה"ל לנשים באמצעות עתירה לבג"ץ.'
  },
  {
    "name": "רועי קליין",
    "act": `דמות שהייתה קצינה בצה"ל, ונהרגה בקרב בינת ג'בייל במלחמת לבנון השנייה לאחר שזינקה על רימון יד כדי להציל את חיי חייליה.`
  },
  {
    "name": "יעל ארד",
    "act": "דמות מנהיגה בתחום הספורט אשר נחשבת לאחת מהטובות ביותר בכל הזמנים."
  },
  {
    "name": "הנרייטה סאלד",
    "act": "דמות פעילת ציבור, אשת חינוך ועורכת ספרותית, שהקדישה את חייה ופועלה לרעיון הציוני ולעם היהודי"
  }
];

var selectedcomponent = null;
var selectedleader = null;
var ending = 0;
var src = ["assets/media/vial/info_vial_", "assets/media/leader-answer/leader_selected_", "assets/media/vial/leader_vial_", "assets/media/info-answer/info_selected_","assets/media/marker/marker_"];
var audio = new Audio("assets/media/audio/cut/start.mp3");
var generalImages = ["assets/media/vial/vial_right.svg", "assets/media/vial/vial_wrong.svg", "assets/media/vial/vial.svg", "assets/media/general/about.svg", "assets/media/general/back_arrow.svg", "assets/media/general/cabinet_left.svg", "assets/media/general/cabinet_right.svg", "assets/media/general/notebook-button.svg", "assets/media/general/notebook.svg", "assets/media/general/scientist-start.svg", "assets/media/general/scientist-end.svg", "assets/media/general/SpeechBubble.svg", "assets/media/general/desk.svg", "assets/media/general/shelf.svg", "assets/media/general/play.svg"];
var loadAudio = ["assets/media/audio/cut/start.mp3", "assets/media/audio/cut/end.mp3", "assets/media/audio/cut/right_1.mp3", "assets/media/audio/cut/right_2.mp3", "assets/media/audio/cut/right_3.mp3", "assets/media/audio/cut/wrong_1.mp3", "assets/media/audio/cut/wrong_2.mp3", "assets/media/audio/cut/wrong_3.mp3"];
var arrManifest = [];
let mediaCache = 'userSettings';


$(function() {
  if ('serviceWorker' in navigator && location.hostname !== 'localhost' && location.hostname !== "127.0.0.1") {
    let location = ""
    navigator.serviceWorker.register(location + 'sw.js');
  }
  init();
});

function init() {
  // loading names and acts
  for (let i = 0; i < NUM_OF_LEADERS; i++) {
    // names
    // the graphics is the background of the div
    $("#names-flexbox").append(`<img id="leader-${i+1}" data-num=${i+1} class="leaders" src="assets/media/leader-answer/leader_${i+1}.svg">`);
    // $(`#name-${i+1}`).attr("src", `assets/media/leaders/leader_${i+1}.svg`);
    // acts
    // adding internal text div to the HTML div
    $(`#act-${i+1}`).append(`<div class="act-text">${arrLeaders[i].act}</div>`);
    //adding components graphics
    $(`#act-${i+1}`).append(`<img id="component-${i+1}" data-num=${i+1} class="components" src="assets/media/info-answer/info_${i+1}.svg">`);
  }
  // event listeners
  // start
  $("#play-button").on("click", function() {
    scientistOut();
    setTimeout(toggleBlackOpacityDiv, 1100);
    setTimeout(function() {
      $("#opening-ending-container").css("display", "none");
    }, 1100);
    $("#notebook-scrollbar").html("");
    audio.pause();
  });
  $("#about").on("click", function() {
    scientistOut();
    $("#notebook-container").css("display", "flex");
    $("#notebook-container").animate({
      bottom: "142vw"
    }, 300);
    $("#notebook-scrollbar").html(`<div id="about-title">אודות</div><div id="about-content">רמ"ד טי"ל: רס"ן מיגל לויתן<br>רת"ח פרוייקטים: רס"ר שלומי אוגרן<br>רת"ח מו"פ וחדשנות בלמידה: סמ"ר גל גנסין<br><br>תכנות: טור' טל סרוסי<br>עיצוב גרפי: רב"ט מייה ליבנה<br><br>מומחה התוכן: סגן שחף שוחט<br><br>גרסה: 1.0.2021</div><img id="till-symbol" class="symbol" src="assets/media/symbols/tilblack.svg"><img id="school-symbol" class="symbol" src="assets/media/symbols/סמל בית הספר הכשם.png">`);
    audio.pause();
    audio.currentTime = 0;
  });
  // game
  $(".acts").on("click", function() {
    selected($("#component-" + $(this).attr("id").slice(4)), "info", "component");
    for (var j = 1; j <= src.length; j++) {
      console.log(src[j-1] + $(this).attr("id").slice(4) + ".svg");
    }
  });
  $(".leaders").on("click", function() {
    selected($(this), "leader", "leader");
    for (var j = 1; j <= src.length; j++) {
      console.log(src[j-1] + $(this).attr("id").slice(7) + ".svg");
    }
  });
  $("#notebook-button").on("click", function() {
    $("#notebook-container").css("display", "flex");
    $("#notebook-container").animate({
      bottom: "142vw"
    }, 300);
    toggleBlackOpacityDiv();
  });
  $("#back-button").on("click", function() {
    // if the content is "about", the screen returns to the opening screen
    if ($("#about-title").text() === "אודות" || $("#speech-bubble").text().includes("עזרתם")) {
      start();
      scientistInAbout()
    } else {
      toggleBlackOpacityDiv();
    }
    $("#notebook-container").animate({
      bottom: "2vw"
    }, 300).promise().then(function() {
      $("#notebook-container").css("display", "none");
    });
  });
  scientistInStart();
}

function start() {
  setTimeout(function() {
    $("#speech-bubble").delay(700).animate({
      opacity: "10"
    }, 1500);
    $("#play-button").delay(800).animate({
      opacity: "10"
    }, 1500);
    $("#about").delay(900).animate({
      opacity: "10"
    }, 1500);
  }, 500);
  if ($("#scientist").attr("src") === "assets/media/general/scientist-start.svg") {
    setTimeout(function() {
      audio.play();
    }, 800);
  }
  if ($("#scientist").attr("src") === "assets/media/general/scientist-end.svg") {
    $("#notebook-button-ending").delay(1500).animate({
      opacity: "10"
    }, 1500);
  }
}

function scientistInStart() {
  setTimeout(function() {
    $("#scientist").animate({
      top: "50vw"
    }, 200).animate({
      top: "20vw"
    }, 200).animate({
      top: "30vw"
    }, 200).delay(200).animate({
      height: "71vw",
      top: "27vw"
    }, 200).animate({
      height: "67vw",
      top: "30vw"
    }, 200);
  }, 800);
  $("#scientist").on("click", function() {
    $("#scientist").off("click");
    start();
    $("#scientist").animate({
      top: "0vw"
    }, 500)
  });
}

function scientistInAbout() {
  setTimeout(function() {
    $("#scientist").animate({
      top: "20vw"
    }, 200).animate({
      top: "-10vw"
    }, 200).animate({
      top: "0vw"
    }, 200);
  }, 800);
}

function scientistOut() {
  $("#scientist").animate({
    top: "-77vw"
  }, 400)
  $("#speech-bubble").animate({
    opacity: "0"
  }, 500);
  $("#play-button").animate({
    opacity: "0"
  }, 500);
  $("#about").animate({
    opacity: "0"
  }, 500);
  $("#notebook-button-ending").animate({
    opacity: "0"
  }, 500);
}

function selected(clickedItem, imgName, itemType) {
  // the last item shall be empty
  $("#" + itemType + "-" + window[`selected${itemType}`]).attr("src", "assets/media/" + imgName + "-answer/" + imgName + "_" + window[`selected${itemType}`] + ".svg");
  // if the last item is not the current item
  if (window[`selected${itemType}`] !== clickedItem.attr("data-num")) {
    // the variable changes to the new item's number
    window[`selected${itemType}`] = clickedItem.attr("data-num");
    // the item is selected
    clickedItem.attr("src", "assets/media/" + imgName + "-answer/" + imgName + "_selected_" + window[`selected${itemType}`] + ".svg");
    // if the vial is empty, it is switched to new picture with the new item
    if ($("#vial").hasClass("block")) {
      $("#vial").addClass("none");
      $("#vial").removeClass("block");
      $("#"+itemType+"-vial-"+clickedItem.attr("data-num")).removeClass("none");
      $("#"+itemType+"-vial-"+clickedItem.attr("data-num")).addClass("block");
    }
    // if the vial is including another item's picture, it is switched to new picture with the new item
    else if ($(".block").attr("src").includes(imgName)) {
      $(".block").addClass("none");
      $(".block").removeClass("block");
      $("#"+itemType+"-vial-"+clickedItem.attr("data-num")).removeClass("none");
      $("#"+itemType+"-vial-"+clickedItem.attr("data-num")).addClass("block");
    } else {
      if (selectedcomponent === selectedleader) {
        reaction("right");
      } else {
        reaction("wrong");
      }
    }
  }
  // canceling double clicked component mark
  else {
    clickedItem.attr("src", "assets/media/" + imgName + "-answer/" + imgName + "_" + window[`selected${itemType}`] + ".svg");
    window[`selected${itemType}`] = null;
    $("#vial").addClass("block");
    $("#vial").removeClass("none");
    $("#"+itemType+"-vial-"+clickedItem.attr("data-num")).removeClass("block");
    $("#"+itemType+"-vial-"+clickedItem.attr("data-num")).addClass("none");
  }
}

function reaction(reactionKind) {
  let effect;
  if (reactionKind === "right") {
    effect = "cloud";
    // appending leader to the notebook
    $("#notebook-scrollbar").append("<div id='marked-name-" + selectedleader + "' class='marked-name'>" + arrLeaders[selectedleader - 1].name + "</div><div id='marked-text-" + selectedcomponent + "' class='marked-text'>" + arrLeaders[selectedcomponent - 1].act + "</div>");
    $("#marked-name-" + selectedleader).css("background-image", "url(assets/media/marker/marker_" + selectedleader + ".svg)");
    $("#cloud1").css({
      "visibility": "hidden",
      "display": "block"
    });
    $("#explosion1").css({
      "visibility": "visible",
      "display": "none"
    });
    // determin scientist reaction
    audio = new Audio("assets/media/audio/cut/right_" + Math.floor(Math.random() * 3 + 1) + ".mp3");

  } else {
    effect = "explosion";
    $("#explosion1").css({
      "visibility": "hidden",
      "display": "block"
    });
    $("#cloud1").css({
      "visibility": "visible",
      "display": "none"
    });
    // determin scientist reaction
    audio = new Audio("assets/media/audio/cut/wrong_" + Math.floor(Math.random() * 3 + 1) + ".mp3");
  }
  // scientist voice
  audio.play();
  for (let i = 1; i <= NUM_OF_EXPLOSION_STAGES; i++) {
    // explosion appears
    setTimeout(function() {
      $("#" + effect + i).css("display", "block");
      if (i === 1) {
        $("#" + effect + 1).css("visibility", "visible");
      }
    }, i * (100));
    // explosion disappears
    setTimeout(function() {
      $("#" + effect + i).css("display", "none");
      if (i === 1) {
        $("#" + effect + i).css("visibility", "hidden");
      }
      if (i === NUM_OF_EXPLOSION_STAGES) {
        $("#" + effect + 1).css("display", "block");
      }
    }, i * (100) + 100);
  }
  // changing vial liquid
  setTimeout(function() {
    $(".block").addClass("none");
    $(".block").removeClass("block");
    $("#vial-" + reactionKind).removeClass("none");
    $("#vial-" + reactionKind).addClass("block");

  }, 500);

  // removing event listeners
  $(".acts").off("click");
  $(".leaders").off("click");

  setTimeout(function() {
    if (reactionKind === "right") {
      // removing right answers
      $("#act-" + selectedcomponent).fadeOut();
      $("#leader-" + selectedleader).fadeOut();

      ending++;
      if (ending === NUM_OF_LEADERS) {
        $("#notebook-button").off("click");
        $("#play-button").off("click");
        $("#play-button").on("click", function() {
          window.location.href = "https://youtube.com/shorts/w93f45UhEpg?feature=share";
        });


        setTimeout(function() {
          toggleBlackOpacityDiv();
          $("#opening-ending-container").css("display", "block");
          $("#about").css("display", "none");
          $("#scientist").attr("src", "assets/media/general/scientist-end.svg");
          audio = new Audio("assets/media/audio/cut/end.mp3");
          setTimeout(function() {
            audio.play();
          }, 1000);
          start();
          scientistInAbout();
          $("#play-button").css({
            "top": "-30vw",
            "width": "20%",
            "left": "38vw"
          });
          $("#notebook-button-ending").on("click", function() {
            $("#notebook-container").css("display", "flex");
            $("#notebook-container").animate({
              bottom: "142vw"
            }, 300);
            scientistOut();
          });
          $("#speech-bubble").html(`עזרתם לי להכין את כל התרופות!<br><span id="great-job-span">עבודה מעולה!</span><br><br>בואו נמשיך הלאה`);

        }, 1500);
      }
    } else {
      // removing item's glow
      $("#component-" + selectedcomponent).attr("src", "assets/media/info-answer/info_" + selectedcomponent + ".svg");
      $("#leader-" + selectedleader).attr("src", "assets/media/leader-answer/leader_" + selectedleader + ".svg");
    }

    selectedcomponent = null;
    selectedleader = null;
    // clearing vial
    $("#vial-" + reactionKind).removeClass("block");
    $("#vial-" + reactionKind).addClass("none");
    $("#vial").addClass("block");
    $("#vial").removeClass("none");
    // adding again event listeners
    $(".acts").on("click", function() {
      selected($("#component-" + $(this).attr("id").slice(4)), "info", "component");
    });
    $(".leaders").on("click", function() {
      selected($(this), "leader", "leader");
    });
  }, 1500);
}

function toggleBlackOpacityDiv() {
  $("#black-opacity").fadeToggle();
}