robotdynKeypad.init(AnalogPin.P0)

robotdynKeypad.onSpecificKeyPressed(robotdynKeypad.Key.K1, function () {
    serial.writeLine("Nacisnieto 1")
})

robotdynKeypad.onSpecificKeyPressed(robotdynKeypad.Key.K2, function () {
    serial.writeLine("Nacisnieto 2")
})

robotdynKeypad.onSpecificKeyPressed(robotdynKeypad.Key.Star, function () {
    serial.writeLine("Nacisnieto *")
})

robotdynKeypad.onSpecificKeyPressed(robotdynKeypad.Key.Hash, function () {
    serial.writeLine("Nacisnieto #")
})