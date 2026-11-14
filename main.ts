robotdynKeypad.init(AnalogPin.P0)

robotdynKeypad.onKeyPressed(function () {
    serial.writeLine(robotdynKeypad.getLastKey())
})