#!/bin/zsh
set -e

# Build chrome extension
rm -f spamcop-automator-chrome.zip
cd chrome
zip -r ../spamcop-automator-chrome.zip .
cd ..

#build firefox extension
rm -f spamcop-automator-firefox.zip
cd firefox
zip -r ../spamcop-automator-firefox.zip .
cd ..
mv spamcop-automator-firefox.zip spamcop-automator-firefox.xpi
