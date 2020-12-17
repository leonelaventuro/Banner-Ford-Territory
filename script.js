const bannerWidth = 980;
const bannerHeight = 250;

const loopDuration = 17;
const pauseLastLoopAfter = 17;

const loopNumber = 2;

const whiteoutSpeed = 1;

const enableTerms = false;

const enableCtaPause = false;
const ctaPauseAfter = 30; // seconds

const ctaSolid = false;



const preloadImages = ["cta_1.png"];

/*  imagesAll[[],[],[]] (or images[]) posiible parameters filled after the | (example: "bg.jpg|-retina.someClass" or "bgs/bg.jpg|-r" ...)
I   -retina, -r, -retina2, -r2 => make image in half size (divide by 2)
N   -retina15, -r15 => half retina etc... (divide image size by 1.5) => -r05 (divide by 0.5 - make the image twice bigger)
F   -wrapper => create self wrapper for this image/element (check the dev tools, how it looks)
O   .someClass.someAnotherClass => add additional class (check the dev tools, how it looks)
    #differentID => different id than file name
*/
//const imgFolder = "./img/"; // set folder for all imagesAll[[],[],[]] (or images[]) without their own path (own path have more priority) -> (light reaction specs etc...)

const images = ["bg.jpg|-r044", "bg_1.jpg", "copy_1.png", "copy_2.png", "copy_3.png", "sticker.png", "car.png"];


const tl_Frame = [];

tl_Frame[1] = function () {
    var tl = new TimelineMax();

    var f1 = 0.3,
        f2 = 4,
        f3 = 7.8,
        f4 = 11.5;
    var zoomTime = 300,
    bgEase = "Power1.easeOut";

    var fadeTime = 0.5; // Preguntar la accion de fadeTime

    // start parameters

    tl.set([copy_1, copy_2, copy_3, sticker, bg_1], { opacity: 0, }, 0);

    tl.set([bg], { scale: 0.47, y: -14, x: 8 }, 0);
    
    // frame 1 ----------
    tl.to([bg], 3, { scale: 0.5, x: 2, y: -20, ease: Power1.easeOut, force3D: false }, f1 - 0.1);
    tl.to([copy_1], fadeTime, { opacity: 1, }, f1 + 0.6);
    tl.to(copy_1, fadeTime + 0.5, { scale: 1, y: -5, ease: Power2.easeOut, }, f1 + 0.7);
    tl.to(car, fadeTime + 16.5, { scale: 1, x: -20, y: 8, ease: Power2.easeOut, }, f1 + 0);
    
    // frame 2 ----------
    tl.to(copy_1, fadeTime, { opacity: 0, }, f2);
    tl.to(copy_2, fadeTime, { opacity: 1, }, f2 + 0.9);
    tl.to(copy_3, fadeTime, { opacity: 1, }, f2 + 2);
    tl.to(copy_2, fadeTime + 0.5, { scale: 1, y: -5, ease: Power2.easeOut, }, f2 + 0.3);
    tl.to(copy_3, fadeTime + 0.5, { scale: 1, y: -6, x: 7, ease: Power2.easeOut, }, f2 + 0.3);

    // frame 3 ----------
    tl.to([copy_2],fadeTime, { opacity: 0, }, f3);
    tl.to([copy_3, sticker, copy_1], fadeTime, { opacity: 1, }, f3 + 0.5);
    // tl.to(copy_3, fadeTime + 0.5, { scale: 1, y: -20, ease: Power2.easeOut, }, f3 + 0.3);

    tl.to([copy_3, bg, car, copy_1], fadeTime, { opacity: 0, }, f4);
    tl.to(bg_1, fadeTime, { opacity: 1, }, f4 + 0.5);
    tl.to(bg_1, zoomTime, { scale: 2 / 1, ease: bgEase, force3D: false }, f4 + 0.5);
    //tl.set(terms_btn, {display: "block"}); 

    return tl;
}






// ============================== clicktag, cta, terms (mouse events) ============================== //

function clicktag_Click(e) {
    if (dcSelect) {
        Enabler.exit("Exit Click");
        //        Enabler.exitOverride("Exit Click", "https://www.google.com");
    } else {
        window.open(window.clickTag);
    }
}

function mouseEnter() {
    var cta_2_bg = document.getElementById("cta_2_bg");
    cta_2_bg.style.opacity = 1;

    if (!ctaSolid) {
        var cta_1 = document.getElementById("cta_1");
        cta_1.style.opacity = 0;

        var cta_2 = document.getElementById("cta_2");
        cta_2.style.opacity = 1;
    }
}

function mouseLeave() {
    var cta_2_bg = document.getElementById("cta_2_bg");
    cta_2_bg.style.opacity = 0;

    if (!ctaSolid) {
        var cta_1 = document.getElementById("cta_1");
        cta_1.style.opacity = 1;

        var cta_2 = document.getElementById("cta_2");
        cta_2.style.opacity = 0;
    }
}

function termsEnter() {
    Enabler.counter("terms enter");
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_over 0.3s 0s linear forwards";

    mouseEnter(); // cta on state
    animationsPause();
}

function termsLeave() {
    Enabler.counter("terms leave");
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_out 0.3s 0s linear forwards";

    if (!stopAnimations) { animationsPlay() }
}

// ============================== others ============================== //










// ============================== Do not edit ============================== //

var mTL, content, loopCount = 1, stopAnimations = false;

// --- preloading images
if (enableTerms) preloadImages.push("terms_overlay.png");
if (!ctaSolid) preloadImages.push("cta_2.png");



// -------------------- special functions -------------------- //

function ctaInit() {
    const cta_all = document.getElementById("cta_all");
    const cta_1 = document.getElementById("cta_1");

    cta_1.src = "cta_1.png";
    cta_1.onload = function () {
        cta_all.style.height = cta_1.naturalHeight / 2 + "px";
        cta_all.style.width = cta_1.naturalWidth / 2 + "px";
    }

    if (!ctaSolid) { //cta text 2
        const cta_2 = document.createElement("img");
        cta_2.setAttribute("src", "cta_2.png");
        cta_2.setAttribute("id", "cta_2");
        cta_2.setAttribute("class", "cta_position");
        cta_all.appendChild(cta_2);
    }
}

function ctaPause() {
    if (enableCtaPause) {
        setTimeout(function () {
            mouseLeave();
            clicktag.removeEventListener("mouseover", mouseEnter);
            clicktag.removeEventListener("mouseout", mouseLeave);
        }, ctaPauseAfter * 1000);
    }
}



// -------------------- (05) - main animation -------------------- //

function startMainTimeLine() {
    stopwatch.start();
    for (var i = 1, l = tl_Frame.length; i < l; i++) {
        mTL.add(tl_Frame[i]());
    }

    mTL.to(whiteout, whiteoutSpeed, { opacity: 0, onComplete: stopWhiteout }, 0);
    mTL.to(whiteout, whiteoutSpeed, { opacity: 1 }, loopDuration - whiteoutSpeed);

    mTL.set({}, { onComplete: pauseMainTimeLine }, pauseLastLoopAfter);
    mTL.set({}, { onComplete: resetMainTimeLine }, loopDuration);

    // --- new loop terms bugFix --- //
    mTL.add(function () { if (enableTerms) { terms_btn.style.pointerEvents = "auto" } }, 0);
    mTL.add(function () { if (loopNumber != loopCount && enableTerms) { terms_btn.style.pointerEvents = "none" } }, loopDuration - 0.3);
}

function stopWhiteout() { if (loopCount == loopNumber) { TweenMax.killTweensOf(whiteout) } }
function pauseMainTimeLine() { if (loopCount == loopNumber) { stopAnimations = true; animationsPause(); stopwatch.stop(); } }
function resetMainTimeLine() { if (loopCount != loopNumber) { loopCount++; mTL.restart(); } }
function animationsPause() { mTL.pause() }
function animationsPlay() { mTL.play() }



// -------------------- (04) - init -------------------- //

function init() {
    if (enableTerms) {
        terms_overlay.style.backgroundImage = "url(terms_overlay.png)";
        terms_btn.style.pointerEvents = "auto";
    }

    content.style.opacity = 1;
    startMainTimeLine();
}

function initStage() {
    init();
}

function preInit() {
    content = document.getElementById("content"); // firefox correction

    clicktag.addEventListener("mouseover", mouseEnter);
    clicktag.addEventListener("mouseout", mouseLeave);

    TweenMax.set(content, { width: bannerWidth, height: bannerHeight });
    TweenMax.set(".ad_size", { width: bannerWidth, height: bannerHeight });

    mTL = new TimelineMax();

    ctaPause(); ctaInit();
    initStage();
}

// -------------------- (03) - images/styles load -------------------- //

function preloadingStagePoint_1() {
    createImages(function () {
        preLoadImages(preInit);
    });
}

function loadStyles() {
    var extCSS = document.createElement("link");
    extCSS.setAttribute("rel", "stylesheet");
    extCSS.setAttribute("type", "text/css");
    extCSS.setAttribute("href", "style.css");
    document.getElementsByTagName("head")[0].appendChild(extCSS);

    extCSS.onerror = preloadingStagePoint_1; extCSS.onload = preloadingStagePoint_1; // callback
}



function preloadingStage() {
    loadStyles();
}

// -------------------- (02) - DC/ST/polite load -------------------- //

function stLoad() {


    if (politeLoad) {
        if (document.readyState === "complete") {
            preloadingStage();
        } else {

            setTimeout(function () {
                stLoad();
            }, 200);
        }
    } else {
        preloadingStage();
    }
}

function dcLoad() {
    if (Enabler.isInitialized()) {
        enablerInitHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
    }
}

function enablerInitHandler() {


    if (politeLoad) {
        if (Enabler.isPageLoaded()) {
            pageLoadedHandler();
        } else {
            Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
        }
    } else {
        preloadingStage();
    }
}

function pageLoadedHandler() {


    preloadingStage();
}





// ============================== modules and functions ============================== //

// ---------- preloadImages min v1.0 ---------- //
function preLoadImages(e) { if ("undefined" != typeof preloadImages) { var o = preloadImages.length; if (o) for (var a = [], n = 0, r = o; n < r; n++)a[n] = new Image, a[n].src = preloadImages[n], a[n].onerror = function () { o-- }, a[n].onload = function () { --o || e() }; else e() } else e() }

// ---------- createImages min - v1.0.1 ---------- //
function createImages(e, t) { function i(e, t) { t = document.getElementById(t); if (y) { var i = document.createElement("div"); i.setAttribute("id", e.id + "_wrap"), i.appendChild(e), t.appendChild(i) } else t.appendChild(e) } function n(e) { e = document.getElementById(e); var t = document.createElement(h); if (t.setAttribute("id", p), A && t.setAttribute("class", A), y) { var i = document.createElement("div"); i.setAttribute("id", p + "_wrap"), i.appendChild(t), e.appendChild(i) } else e.appendChild(t) } function a(e, t) { return e.reduce(function (e, i) { return e || (e = ""), e + (t.test(i) ? " " + /\w+/.exec(i)[0] : "") }, 0) } function l(e, t, i) { if (/\d/.test(t)) var n = /\d/.exec(t)[0], a = /\d+/.exec(t)[0].substring(1), l = a ? n + "." + a : n; else l = 2; document.getElementById(e).style.width = i / l + "px" } function s(e) { w = !0; var t = m[0].split(/\/(?=[^\/]+$)/); p = t[1], u = e } function r() { var e = /(?=[^\|]+$).*/.exec(m[1])[0]; e = e.match(/(\.\w+)|(\#\w+)|(\-\w+)/g), /\#\w+/.test(e) && (p = a(e, /\#/), p = /\w+/.exec(p)[0]), /\.\w+/.test(e) && function (e) { A = a(e, /\./), g && (f = (f += A).replace(/^\s/, "")), A = A.replace(/^\s/, "") }(e), /\-wrapper/.test(e) && (y = !0), /\-retina/.test(e) ? v = /\-retina\d*/.exec(e)[0] : /\-r/.test(e) && (v = /\-r\d*/.exec(e)[0]), u = w ? m[0] + "." + h : imgFolder + m[0] + "." + h } function d(e, t, a, d) { f = t; var o = e.length; if (o) for (var C = 0, x = o; C < x; C++) { if (m = e[C].split(/\.(.*)/), g = !!/^(jpg|png)/.test(m[1]), h = /^\w+/.exec(m[1])[0], /\//.test(m[0]) ? s(e[C]) : (p = m[0], u = d + e[C]), /\|/.test(m[1]) && r(), g) { var b = new Image; b.src = u, b.id = p, b.className = f, b.retinaSet = v, b.ii = e[C], i(b, a), b.onerror = function () { console.warn("input: " + this.ii + "\nid: " + this.id + " -> image with that id not found"), document.getElementById(this.id).style.display = "none", --o || c() }, b.onload = function () { this.retinaSet && l(this.id, this.retinaSet, this.naturalWidth), --o || c() } } else n(a), --o || c(); A = !1, f = t, w = !1, v = !1, y = !1 } else c() } function c() { o && --o || t() } var o; arguments.length < 2 && (t = arguments[0], e = !0), t && t instanceof Function || console.error("createImages(imgFolder_forAll, callback)\n-> At least a callback (one input parameter) must be specified."); var m, g, u, p, f, h, A = !1, w = !1, v = !1, y = !1; !function (e) { "undefined" == typeof imgFolder && (imgFolder = ""), "undefined" != typeof images && Array.isArray(images) && (imagesAll = [], imagesAllClass = [], imagesAllParent = [], imagesAll[0] = images); for (var t = 0, i = o = imagesAll.length; t < i; t++)imagesAllClass[t] || (imagesAllClass[t] = "image"), imagesAllParent[t] || (imagesAllParent[t] = "main"), t && !e && (imgFolder = ""), d(imagesAll[t], imagesAllClass[t], imagesAllParent[t], imgFolder) }(e) }
