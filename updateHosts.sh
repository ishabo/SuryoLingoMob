#!/bin/bash

adb root
adb remount
adb push /etc/hosts /system/etc