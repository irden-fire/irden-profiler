#!/bin/bash
gnome-terminal -x sh -c "gulp serve:watch ; bash"
gnome-terminal -x sh -c "npm run watch:prod ; bash"
