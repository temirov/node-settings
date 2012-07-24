node-settings
=============

Here is a simple module to manage settings of node.js applications. The module provides an ability to store, load and differentiate arbitrary settings required for an application.

It relies on the username as it is known to the system. Only current username are used, not the original one, e.g. the results of sudo or su will be used for a username. This approach allows developers to have their own config files. Commiting them to the central repository doesn't mess things up assuming developers have different usernames.

There may be two configuration files, coded as JSON: default.settings.js and ``<username>``.settings.js. If both are present, they will be merged, giving identical values of ``<username>``.settings.js, if any, a precedence. If only one is present it will be loaded. If none is present the module will exit with an error.

Settings files shall be put in settings folder. To add user settings on top of default the following command can be executed:

```shell
cp settings/default.settings.js settings/`whoami`.settings.js
```

Then edit both default and ``<user>`` files accordingly.