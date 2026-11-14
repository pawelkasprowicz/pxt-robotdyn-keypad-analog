# RobotDyn Analog Keypad 3×4 — MakeCode micro:bit

Biblioteka do obsługi analogowej klawiatury 3×4 RobotDyn za pomocą BBC micro:bit V2.

Klawiatura wykorzystuje jedno wejście analogowe ADC do rozpoznawania 12 przycisków.

## Funkcje

- Obsługa 12 klawiszy: `0–9`, `*`, `#`.
- Możliwość wyboru wejścia analogowego.
- Skanowanie klawiatury w tle.
- Filtrowanie drgań styków.
- Wykrywanie pojedynczych naciśnięć.
- Obsługa zdarzeń.
- Odczyt aktualnie wciśniętego klawisza.
- Odczyt ostatnio naciśniętego klawisza.
- Sprawdzanie stanu wybranego klawisza.

## Podłączenie

| RobotDyn | micro:bit V2 |
|---|---|
| VCC | 3V |
| GND | GND |
| OUT | P0 (domyślnie) |

Można również wykorzystać inne wejście analogowe micro:bita, np. P1 lub P2.

**Uwaga:** klawiaturę należy zasilać napięciem 3,3 V.

## Układ klawiszy

```text
1  2  3
4  5  6
7  8  9
*  0  #
```

## Kalibracja ADC

Wartości zostały ustalone na podstawie pomiarów rzeczywistej klawiatury.

| Klawisz | ADC |
|---|---|
| 1 | 979–1023 |
| 2 | 897–978 |
| 3 | 825–896 |
| 4 | 764–824 |
| 5 | 711–763 |
| 6 | 665–710 |
| 7 | 624–664 |
| 8 | 589–623 |
| 9 | 556–588 |
| * | 527–555 |
| 0 | 501–526 |
| # | 450–500 |

Brak naciśnięcia: ADC około 0–1.

## Dostępne funkcje

### Inicjalizacja

`robotdynKeypad.init(AnalogPin.P0)`

Ustawia wejście analogowe i uruchamia skanowanie klawiatury.

### Odczyt klawisza

`robotdynKeypad.readKey()`

Zwraca aktualnie wciśnięty klawisz albo pusty tekst.

### Sprawdzanie klawisza

`robotdynKeypad.isPressed("5")`

Zwraca `true`, jeśli wskazany klawisz jest aktualnie wciśnięty.

### Ostatni klawisz

`robotdynKeypad.getLastKey()`

Zwraca ostatnio rozpoznany klawisz.

### Zdarzenie naciśnięcia

`robotdynKeypad.onKeyPressed(function () { ... })`

Uruchamia wskazany kod po wykryciu nowego naciśnięcia.

## Przykład — transmisja USB

```typescript
robotdynKeypad.init(AnalogPin.P0)

robotdynKeypad.onKeyPressed(function () {
    serial.writeLine(robotdynKeypad.getLastKey())
})
```

Każde naciśnięcie powoduje wysłanie odpowiedniego znaku do konsoli szeregowej.

## Instalacja

W MakeCode:

1. Otwórz projekt.
2. Wybierz **Rozszerzenia**.
3. Wklej adres repozytorium:

`https://github.com/pawelkasprowicz/pxt-robotdyn-keypad-analog`

4. Dodaj bibliotekę do projektu.

## Sprzęt

- BBC micro:bit V2
- RobotDyn Analog Keypad 3×4
- Trzy przewody połączeniowe

## Autor

Paweł Kasprowicz

## Licencja

Licencja nie została jeszcze określona.