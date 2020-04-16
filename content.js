
console.log("injected content");

var adjective = [
    "Absurd",
    "Asinine",
    "Avaricious",
    "Barmy",
    "Bovine",
    "Brain-Dead",
    "Brainless",
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
    "Distrubed",
    "Doltish",
    "Dull-Witted",
    "Dumb",
    "Empty-Headed",
    "Fat-Headed",
    "Fatuous",
    "Futile",
    "Gluttonous",
    "Grabby",
    "Greedy",
    "Half-Baked",
    "Halfwitted",
    "Idiotic",
    "Ignorant",
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
    "Out To Lunch",
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
    "Stupid",
    "Thick",
    "Thickheaded",
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
    "Orange",
    "Spray Tanned",
    "Fat",
];

var noun = [
    "Airhead",
    "Ass",
    "Asshat",
    "Birdbrain",
    "Blockhead",
    "Bonehead",
    "Brick",
    "Butt",
    "Butthole",
    "Cesspool",
    "Chump",
    "Cinder Block",
    "Clod",
    "Clot",
    "Cretin",
    "Dipstick",
    "Dolt",
    "Doorknob",
    "Dope",
    "Dullard",
    "Dumbbell",
    "Dummy",
    "Dunce",
    "Dunderhead",
    "Dung Heap",
    "Fart",
    "Farthead",
    "Fathead",
    "Fool",
    "Halfwit",
    "Imbecile",
    "Jackass",
    "Knob",
    "Knobhead",
    "Lamebrain",
    "Loon",
    "Lunatic",
    "Madman",
    "Maniac",
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

    if( node.childNodes.length == 0 && node instanceof Text )
    {
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
            console.log("test");
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
