# case-preserving-find-and-replace README

Privide similiar functionality with Visual Studio's
[case-preserving-find-and-replace](https://devblogs.microsoft.com/visualstudio/keep-your-casing-with-case-preserving-find-and-replace/).

## Features

When search term is "begin", replace term is "end":

- begin -> end,
- Begin -> End,
- BEGIN -> END

When search term is "onetwothree", replace term is "fourFiveSix":

- onetwothree -> fourfivesix,
- oneTwoThree -> fourFiveSix,
- OneTwoThree -> FourFiveSix,
- oneTwoTHREE -> fourFiveSIX

- Not support case:
  - ONETwoThree -> FOURFiveSix (Actual: -> FourFiveSix)
  - ONETwoTHREE -> FOURFiveSIX (Actual: -> FourFIVESIX)

## Release Notes

### 0.0.1

Currently, there's no way to create a widget similar to the native
find and replace widget, which limits its usability.
Therefore, it will be used only for personal purposes.
