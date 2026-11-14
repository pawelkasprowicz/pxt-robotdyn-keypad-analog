//% color=#00897B icon="\uf11c" block="RobotDyn Keypad"
namespace robotdynKeypad {

    let keypadPin: AnalogPin = AnalogPin.P0
    let lastKey = ""
    let currentKey = ""
    let previousRaw = ""
    let stableCount = 0
    let initialized = false

    const EVENT_ID = 7890

    function readADC(): number {
        return pins.analogReadPin(keypadPin)
    }

    function decodeKey(adc: number): string {
        if (adc < 100) return ""
        if (adc >= 979) return "1"
        if (adc >= 897) return "2"
        if (adc >= 825) return "3"
        if (adc >= 764) return "4"
        if (adc >= 711) return "5"
        if (adc >= 665) return "6"
        if (adc >= 624) return "7"
        if (adc >= 589) return "8"
        if (adc >= 556) return "9"
        if (adc >= 527) return "*"
        if (adc >= 501) return "0"
        if (adc >= 450) return "#"
        return ""
    }

    function scanKeyboard() {
        basic.forever(function () {
            let raw = decodeKey(readADC())

            if (raw == previousRaw) {
                if (stableCount < 3) stableCount++
            } else {
                previousRaw = raw
                stableCount = 1
            }

            if (stableCount >= 2 && raw != currentKey) {
                currentKey = raw

                if (raw != "") {
                    lastKey = raw
                    control.raiseEvent(EVENT_ID, 1)
                }
            }

            basic.pause(1)
        })
    }

    /**
     * Inicjalizuje klawiaturę na wybranym pinie analogowym.
     */
    //% block="inicjalizuj klawiaturę na pinie %pin"
    //% pin.defl=AnalogPin.P0
    //% weight=100
    export function init(pin: AnalogPin): void {
        keypadPin = pin

        if (!initialized) {
            initialized = true
            scanKeyboard()
        }
    }

    /**
     * Zwraca aktualnie wciśnięty klawisz.
     */
    //% block="odczytaj klawisz"
    //% weight=90
    export function readKey(): string {
        return currentKey
    }

    /**
     * Sprawdza, czy wskazany klawisz jest wciśnięty.
     */
    //% block="czy naciśnięto %key"
    //% key.defl="1"
    //% weight=80
    export function isPressed(key: string): boolean {
        return currentKey == key
    }

    /**
     * Zwraca ostatnio naciśnięty klawisz.
     */
    //% block="ostatni klawisz"
    //% weight=70
    export function getLastKey(): string {
        return lastKey
    }

    /**
     * Uruchamia kod po naciśnięciu dowolnego klawisza.
     */
    //% block="po naciśnięciu klawisza"
    //% weight=60
    export function onKeyPressed(handler: () => void): void {
        control.onEvent(EVENT_ID, 1, handler)
    }
}