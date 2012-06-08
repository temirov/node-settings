node-settings
=============

This is a simple module to manage settings of a node.js application.

It relies on the username as it is known to the system. It only reads current username, not the original one, e.g. sudo and su will work with the resulting name.

There may be two configuration files, coded as JASON: default.settings.js and &ltusername>.settings.js

If both are present, they will be merged, giving <username>.settings.js a preference. If one is present it will be loaded. If none is present the module will halt.

Settings files shall be put in settings folder. To add user settings you can start with executing

```shell
cp settings/default.settings.js settings/`whoami`.settings.js
```

then edit both default and <user> files accordingly.

