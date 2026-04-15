# SpamCop Automator Firefox Extension

This extension automatically submits all SpamCop reports on https://www.spamcop.net/sc* pages, replicating the functionality of the original greasemonkey script.

## Installation (for development)

### Firefox
1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click "Load Temporary Add-on".
3. Select the `manifest.json` file in this directory.

### Chrome
1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" (top-right toggle).
3. Click "Load unpacked".
4. Select the `chrome/` directory in this repository.

## Functionality
- On matching SpamCop report pages, the extension will automatically submit the report form or follow the appropriate link, just like the greasemonkey script.

## Packaging (for store submission)

### Chrome Web Store package
1. From the repository root, build a zip containing the contents of the `chrome/` folder (not the top-level folder itself).
2. Example command:

```sh
cd chrome && zip -r ../spamcop-automator-chrome.zip .
```

3. Upload `spamcop-automator-chrome.zip` in the Chrome Web Store Developer Dashboard.

### Firefox Add-ons (AMO) package
1. From the repository root, build a zip containing the contents of the `firefox/` folder (not the top-level folder itself).
2. Rename the zip file extension to `.xpi`.
3. Example commands:

```sh
cd firefox && zip -r ../spamcop-automator-firefox.zip .
cd .. && mv spamcop-automator-firefox.zip spamcop-automator-firefox.xpi
```

4. Upload `spamcop-automator-firefox.xpi` to the Firefox Add-ons Developer Hub (AMO) for signing/review.
