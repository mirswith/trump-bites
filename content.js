
console.log("injected content");

var adjective = [
    "Absurd",
    "Asinine",
    "Avaricious",
    "Barmy",
    "Bovine",
    "Brain-Dead",
    "Brainless",
    "Buttfaced",
    "Careless",
    "Certifiable",
    "Crackbrained",
    "Crazed",
    "Crazy",
    "Cretinous",
    "Daft",
    "Damfool",
    "Demented",
    "Dense",
    "Deranged",
    "Dimwitted",
    "Distrubed",
    "Doltish",
    "Dull-Witted",
    "Dumb",
    "Empty-Headed",
    "Fat-Headed",
    "Fat",
    "Fatuous",
    "Futile",
    "Gluttonous",
    "Grabby",
    "Greedy",
    "Half-Baked",
    "Halfwitted",
    "Idiotic",
    "Ignorant",
    "Illogical",
    "Inane",
    "Inept",
    "Insane",
    "Irresponsible",
    "Laughable",
    "Ludicrous",
    "Meaningless",
    "Moronic",
    "Naive",
    "Nonsensical",
    "Orange",
    "Out To Lunch",
    "Pathological",
    "Pig-Ignorant",
    "Pointless",
    "Psychotic",
    "Ridiculous",
    "Scatterbrained",
    "Screwy",
    "Scroogelike",
    "Selfish",
    "Senseless",
    "Short-Sighted",
    "Simpleminded",
    "Slow-Witted",
    "Slow",
    "Spray Tanned",
    "Stupid",
    "Thick",
    "Thickheaded",
    "Twofaced",
    "Unbalanced",
    "Unhinged",
    "Unintelligent",
    "Unstable",
    "Unthinking",
    "Vacuous",
    "Vapid",
    "Venal",
    "Witless",
    "Wooden-Headed",
];

var noun = [
    "Airhead",
    "Alligator Turd",
    "Ass",
    "Asshat",
    "Asshead",
    "Assmonkey",
    "Bastard",
    "Birdbrain",
    "Blockhead",
    "Bonehead",
    "Brick",
    "Buffoon",
    "Butt",
    "Butthole",
    "Camel Fart",
    "Cesspool",
    "Chump",
    "Cinder Block",
    "Clod",
    "Clot",
    "Cretin",
    "Dipstick",
    "Dodo Turd",
    "Dog Turd",
    "Dolt",
    "Donkey Fart",
    "Doorknob",
    "Dope",
    "Dullard",
    "Dumbass",
    "Dumbbell",
    "Dummy",
    "Dunce",
    "Dunderhead",
    "Dung Heap",
    "Fart",
    "Farthead",
    "Fathead",
    "Fool",
    "Goat Turd",
    "Halfwit",
    "Horse Fart",
    "Idiot",
    "Imbecile",
    "Jackass",
    "Knob",
    "Knobhead",
    "Knucklehead",
    "Lamebrain",
    "Laughing Stock",
    "Liar",
    "Loon",
    "Lunatic",
    "Madman",
    "Maniac",
    "Monkey Turd",
    "Monkey",
    "Moron",
    "Nincompoop",
    "Ninny",
    "Nit",
    "Nitwit",
    "Numbskull",
    "Peabrain",
    "Pig",
    "Pinhead",
    "Poo Dropping",
    "Poobrain",
    "Prat",
    "Psychopath",
    "Simpleton",
    "Slimeball",
    "Stain",
    "Thickhead",
    "Thicky",
    "Toilet Fisher",
    "Toilet Miser",
    "Trumphole",
    "Turd",
    "Turdbrain",
    "Twit",
    "Wanker",
    "Wouldbe Dictator",
    "Wouldbe King",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function scanNode(node) {
    if( node == null ) return;
    if( node instanceof HTMLScriptElement ) return;
    if( node instanceof HTMLStyleElement ) return;

// webkit-user-modify

    if( node.childNodes.length == 0 && node instanceof Text )
    {
        if( node.parentNode != null && node.parentNode instanceof Element )
        {
            var style = window.getComputedStyle(node.parentNode);
            if( style.getPropertyValue("contenteditable") == true ) return;
            var val = style.getPropertyValue("-webkit-user-modify")
            if( val != null && val.indexOf("write")>=0 ) return; // read-write-plaintext-only;
        }

        if( node.isElementContentWhitespace ) return;

        node.textContent = node.textContent.replace(/Trump/g, function() {
            var i1 = getRandomInt(adjective.length);
            var i2;
            do
            {
                i2 = getRandomInt(adjective.length);
            } while(i2 == i1);
            name = adjective[i1];
            if( Math.random() > 0.5 ) name += " " + adjective[i2];
            return name + " " + noun[getRandomInt(noun.length)];
        });

        //console.log(node.parentNode.toString() + " -> " + node.toString() + ": " + node.textContent);
    }

    node.childNodes.forEach(function(child) {
        scanNode(child);
    });
}

var observer = new MutationObserver(function(mutations) {
    //console.log("document changed.");
    //console.log(mutations);
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            scanNode(node);
        });
    });
});

observer.observe(document.documentElement, {
    attributes: false,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false
});

if( document.readyState === "interactive" )
{
    scanNode(document)
}
else
{
    document.onreadystatechange = () => {
        if (document.readyState === "interactive") {
            scanNode(document);
        }
    };
}
