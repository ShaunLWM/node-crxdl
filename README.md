# node-crxdl

[!["Monthly Download"](https://img.shields.io/npm/dm/node-crxdl.svg)](https://npmjs.org/package/node-crxdl)
[!["Latest Release"](https://img.shields.io/npm/v/node-crxdl.svg)](https://github.com/ShaunLWM/node-crxdl/releases/latest)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ShaunLWM/node-crxdl/blob/master/LICENSE)

A simple Chrome extension downloader for NodeJS

## Requirement
- NodeJS v8 and above

## Usage
```
Usage
    $ crxdl <url> [output]
      
Options
    --output, -o  Set download destination
      
Example
    $ crxdl https://chrome.google.com/webstore/detail/netflix-party/oocalimimngaihdkbihfgmpkcpnmlaoa
    # download extension to current directory

    $ crxdl https://chrome.google.com/webstore/detail/netflix-party/oocalimimngaihdkbihfgmpkcpnmlaoa -o /home/downloads
    # download extension to /home/download
```

## Instructions
1. ```npm install -g node-crxdl``` or ```yarn global add node-crxdl```
2. Follow the usage stated above

## TODO
- None for now

## Credits
- [crxviewer](https://github.com/Rob--W/crxviewer)

## License
MIT License - Copyright (c) 2021 Shaun