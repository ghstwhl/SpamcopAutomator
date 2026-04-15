# Changelog

All notable changes to this project will be documented in this file.

## [1.1.2] - 2026-04-15
### Changed
- Removed unused helper `htmlEscape` from Chrome and Firefox content scripts.
- Removed unused variable `n` from both content scripts.
- Simplified content script flow by removing the dead `if (x != null)` condition.
- Aligned Chrome and Firefox manifest descriptions for consistency.
- Updated `.github/copilot-instructions.md` to reflect the resolved cleanup items.
- Added tools/build.sh to package the extensions for submission.

## [1.1.1] - 2026-04-14
### Changed
- Removed unused `activeTab` permission from Chrome and Firefox manifests
- Removed redundant host permissions from both manifests; extension scope remains enforced by content script matches
- Updated README with Chrome development testing instructions and packaging instructions for Chrome Web Store and Firefox AMO
- Updated Copilot project instructions to reflect the manifest permission changes

## [1.1.0] - 2026-03-24
### Added
- Cross-browser compatibility for Chrome and Firefox (Manifest V3, service worker background)
- Minimal background.js for both browsers

## [1.0.1] - 2026-03-23
### Changed
- Improved manifest and permissions

## [1.0.0] - 2026-03-22
### Added
- Initial release: Automatically submits all pending SpamCop reports
