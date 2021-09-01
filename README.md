# upload-source-map-plugin

## Using npm:
```
npm i upload-source-map-plugin
```
## describe:
Upload sourcemap plug-in of webpack

## params:

Parameter name|describe|type|default
--|:--:|:--:|--:
uploadUrl|Sourcemap upload address|string|--
params|Additional parameters|object|{}

## example:
```
const uploadMapFilePlugin = require("upload-source-map-plugin");

new uploadMapFilePlugin({
    uploadUrl: "http://localhost:7001/api/upload",
    params: {
      a: "5",
      b: "6",
    },
  }),
```