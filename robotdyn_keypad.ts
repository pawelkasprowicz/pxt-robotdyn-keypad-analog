//% color=#00897B icon="\uf11c" block="RobotDyn Keypad"
namespace robotdynKeypad {

    /**
     * Dostepne klawisze klawiatury 3x4.
     */
    export enum Key {
        //% block="1"
        K1 = 1,
        //% block="2"
        K2 = 2,
        //% block="3"
        K3 = 3,
        //% block="4"
        K4 = 4,
        //% block="5"
        K5 = 5,
        //% block="6"
        K6 = 6,
        //% block="7"
        K7 = 7,
        //% block="8"
        K8 = 8,
        //% block="9"
        K9 = 9,
        //% block="*"
        Star = 10,
        //% block="0"
        K0 = 11,
        //% block="#"
        Hash = 12
    }

    let keypadPin: AnalogPin = AnalogPin.P0
    let lastKey = ""
    let currentKey = ""
    let previousRaw = ""
    let stableCount = 0
    let initialized = false

    const EVENT_ID = 7890
    const ANY_KEY_EVENT = 100

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

    function keyToEvent(key: string): number {
        if (key == "1") return 1
        if (key == "2") return 2
        if (key == "3") return 3
        if (key == "4") return 4
        if (key == "5") return 5
        if (key == "6") return 6
        if (key == "7") return 7
        if (key == "8") return 8
        if (key == "9") return 9
        if (key == "*") return 10
        if (key == "0") return 11
        if (key == "#") return 12
        return 0
    }

    function scanKeyboard(): void {
        basic.forever(function () {

            let raw = decodeKey(readADC())

            if (raw == previousRaw) {
                if (stableCount < 3) {
                    stableCount++
                }
            } else {
                previousRaw = raw
                stableCount = 1
            }

            if (stableCount >= 2 && raw != currentKey) {

                currentKey = raw

                if (raw != "") {
                    lastKey = raw

                    let eventValue = keyToEvent(raw)

                    // Zdarzenie konkretnego klawisza
                    control.raiseEvent(EVENT_ID, eventValue)

                    // Zdarzenie dowolnego klawisza
                    control.raiseEvent(EVENT_ID, ANY_KEY_EVENT)
                }
            }

            basic.pause(1)
        })
    }

    /**
     * Inicjalizuje klawiature na wybranym pinie.
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
     * Zwraca aktualnie wcisniety klawisz.
     */
    //% block="odczytaj klawisz"
    //% weight=90
    export function readKey(): string {
        return currentKey
    }

    /**
     * Sprawdza, czy wskazany klawisz jest wcisniety.
     */
    //% block="czy naciśnięto %key"
    //% key.defl="1"
    //% weight=80
    export function isPressed(key: string): boolean {
        return currentKey == key
    }

    /**
     * Zwraca ostatnio nacisniety klawisz.
     */
    //% block="ostatni klawisz"
    //% weight=70
    export function getLastKey(): string {
        return lastKey
    }

    /**
     * Zdarzenie nacisniecia dowolnego klawisza.
     */
    //% block="po naciśnięciu dowolnego klawisza"
    //% weight=60
    export function onKeyPressed(handler: () => void): void {
        control.onEvent(EVENT_ID, ANY_KEY_EVENT, handler)
    }

    /**
     * Zdarzenie nacisniecia wybranego klawisza.
     */
    //% block="po naciśnięciu klawisza %key"
    //% key.defl=Key.K1
    //% weight=95
    export function onSpecificKeyPressed(
        key: Key,
        handler: () => void
    ): void {
        control.onEvent(EVENT_ID, key, handler)
    }
}