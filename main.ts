robotdynKeypad.onKeyPressed(function () {
    serial.writeLine(robotdynKeypad.getLastKey())
})
robotdynKeypad.init(AnalogPin.P0)
