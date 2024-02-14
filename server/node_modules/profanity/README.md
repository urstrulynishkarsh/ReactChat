## profanity
Randomly replaces text with profanity.

Written by Mr. Papercut (Mischa Rodermond) ([website](http://www.mrpapercut.com/)).

## Install
Install with [npm](http://github.com/isaacs/npm):

    npm install profanity

## Usage
`````javascript
    "use strict";

    var profanity = require('profanity');

    var str = "You are a very kind person and your mother looks lovely.";

    console.log(profanity.addProfanity(str));
`````

## Config
`````javascript
    {
        "enabled": boolean, // turns profanity on/off
        "level": int(1-10) // Profanity level. 1 is almost no profanity, 10 is full sergeant Hartman
    }
`````

## Wordlist
The wordlist can be found and edited in ./lib/wordlist.json
