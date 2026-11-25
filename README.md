# RobotDyn Analog Keypad 3×4 — MakeCode micro:bit

Biblioteka do obsługi analogowej klawiatury 3×4 RobotDyn za pomocą BBC micro:bit V2.

Klawiatura wykorzystuje jedno wejście analogowe ADC do rozpoznawania 12 przycisków.

![RobotDyn Analog Keypad 3x4](./keypad%203x4.jpg)

## Funkcje

- Obsługa 12 klawiszy: `0–9`, `*`, `#`.
- Możliwość wyboru wejścia analogowego.
- Szybkie skanowanie klawiatury w tle.
- Filtrowanie drgań styków.
- Wykrywanie pojedynczych naciśnięć.
- Zdarzenie naciśnięcia dowolnego klawisza.
- Zdarzenie naciśnięcia konkretnego klawisza.
- Lista rozwijana zawierająca wszystkie 12 klawiszy.
- Odczyt aktualnie wciśniętego klawisza.
- Odczyt ostatnio naciśniętego klawisza.
- Sprawdzanie stanu wybranego klawisza.
- Obsługa bloków, JavaScript i MakeCode Python.
- Brak konieczności stosowania dodatkowych modułów.

## Podłączenie

| RobotDyn | micro:bit V2 |
|---|---|
| VCC | 3V |
| GND | GND |
| OUT | P0 (domyślnie) |

Można również wykorzystać inne wejście analogowe micro:bita.

| Pin | Uwagi |
|---|---|
| P0 | Zalecany |
| P1 | Zalecany |
| P2 | Zalecany |
| P3 | Współdzielony z matrycą LED |
| P4 | Współdzielony z matrycą LED |
| P10 | Współdzielony z matrycą LED |

W przypadku korzystania z P3, P4 lub P10 należy wyłączyć matrycę LED.

**Uwaga:** klawiaturę należy zasilać napięciem 3,3 V. Nie należy podawać napięcia 5 V na wejścia micro:bita.

## Układ klawiszy

```text
1  2  3
4  5  6
7  8  9
*  0  #
```

## Zasada działania

Klawiatura wykorzystuje drabinkę rezystorową.

Każdy przycisk generuje inną wartość napięcia na wyjściu OUT. Biblioteka odczytuje wartość ADC i przypisuje ją do odpowiedniego klawisza.

Skanowanie odbywa się w tle z dodatkową przerwą 1 ms pomiędzy odczytami.

Naciśnięcie zostaje zaakceptowane po dwóch zgodnych odczytach.

Przytrzymanie tego samego klawisza nie powoduje ciągłego generowania zdarzeń.

Biblioteka nie korzysta z wyświetlacza micro:bita ani nie wysyła samodzielnie danych przez USB.

## Kalibracja ADC

Wartości zostały ustalone na podstawie pomiarów rzeczywistej klawiatury podłączonej do micro:bit V2.

| Klawisz | Zmierzona wartość ADC | Zakres rozpoznawania |
|---|---:|---:|
| 1 | 1021 | 979–1023 |
| 2 | 936 | 897–978 |
| 3 | 858 | 825–896 |
| 4 | 792 | 764–824 |
| 5 | 735 | 711–763 |
| 6 | 686 | 665–710 |
| 7 | 643 | 624–664 |
| 8 | 605 | 589–623 |
| 9 | 571 | 556–588 |
| * | 541 | 527–555 |
| 0 | 513 | 501–526 |
| # | 489 | 450–500 |

Brak naciśnięcia: ADC około 0–1.

Wartości poniżej 450 nie są przypisywane do żadnego klawisza.

Wartości ADC mogą się nieznacznie różnić pomiędzy egzemplarzami klawiatury ze względu na tolerancję rezystorów.

## Dostępne bloki MakeCode

| Blok | Działanie |
|---|---|
| Inicjalizuj klawiaturę na pinie | Wybór wejścia analogowego |
| Odczytaj klawisz | Odczyt aktualnie wciśniętego klawisza |
| Czy naciśnięto klawisz | Sprawdzenie stanu wybranego klawisza |
| Ostatni klawisz | Odczyt ostatnio naciśniętego klawisza |
| Po naciśnięciu dowolnego klawisza | Zdarzenie dla wszystkich klawiszy |
| Po naciśnięciu klawisza | Zdarzenie dla wybranego klawisza |

## Dostępne funkcje

### Inicjalizacja

```typescript
robotdynKeypad.init(AnalogPin.P0)
```

Ustawia wejście analogowe i uruchamia skanowanie klawiatury w tle.

### Odczyt aktualnego klawisza

```typescript
robotdynKeypad.readKey()
```

Zwraca aktualnie wciśnięty klawisz albo pusty tekst, jeśli żaden klawisz nie jest wciśnięty.

### Sprawdzanie klawisza

```typescript
robotdynKeypad.isPressed("5")
```

Zwraca `true`, jeśli wskazany klawisz jest aktualnie wciśnięty.

### Ostatni klawisz

```typescript
robotdynKeypad.getLastKey()
```

Zwraca ostatnio rozpoznany klawisz, również po jego zwolnieniu.

### Zdarzenie naciśnięcia dowolnego klawisza

```typescript
robotdynKeypad.onKeyPressed(function () {
    serial.writeLine(robotdynKeypad.getLastKey())
})
```

Uruchamia wskazany kod po wykryciu naciśnięcia dowolnego klawisza.

### Zdarzenie naciśnięcia konkretnego klawisza

```typescript
robotdynKeypad.onSpecificKeyPressed(
    robotdynKeypad.Key.K1,
    function () {
        serial.writeLine("Nacisnieto 1")
    }
)
```

Uruchamia wskazany kod wyłącznie po naciśnięciu wybranego klawisza.

Funkcja działa podobnie do zdarzeń przycisków A i B w micro:bicie.

## Lista dostępnych klawiszy

| Klawisz | Nazwa w JavaScript |
|---|---|
| 1 | robotdynKeypad.Key.K1 |
| 2 | robotdynKeypad.Key.K2 |
| 3 | robotdynKeypad.Key.K3 |
| 4 | robotdynKeypad.Key.K4 |
| 5 | robotdynKeypad.Key.K5 |
| 6 | robotdynKeypad.Key.K6 |
| 7 | robotdynKeypad.Key.K7 |
| 8 | robotdynKeypad.Key.K8 |
| 9 | robotdynKeypad.Key.K9 |
| * | robotdynKeypad.Key.Star |
| 0 | robotdynKeypad.Key.K0 |
| # | robotdynKeypad.Key.Hash |

## Przykład 1 — transmisja USB

```typescript
robotdynKeypad.init(AnalogPin.P0)

robotdynKeypad.onKeyPressed(function () {
    serial.writeLine(robotdynKeypad.getLastKey())
})
```

Każde naciśnięcie powoduje wysłanie odpowiedniego znaku do konsoli szeregowej USB.

## Przykład 2 — niezależna obsługa klawiszy

```typescript
robotdynKeypad.init(AnalogPin.P0)

robotdynKeypad.onSpecificKeyPressed(
    robotdynKeypad.Key.K1,
    function () {
        serial.writeLine("START")
    }
)

robotdynKeypad.onSpecificKeyPressed(
    robotdynKeypad.Key.K2,
    function () {
        serial.writeLine("STOP")
    }
)

robotdynKeypad.onSpecificKeyPressed(
    robotdynKeypad.Key.Star,
    function () {
        serial.writeLine("CANCEL")
    }
)

robotdynKeypad.onSpecificKeyPressed(
    robotdynKeypad.Key.Hash,
    function () {
        serial.writeLine("ENTER")
    }
)
```

Każdy klawisz może uruchamiać niezależny fragment programu.

## Przykład 3 — MakeCode Python

```python
def on_key_pressed():
    serial.write_line(robotdynKeypad.get_last_key())

robotdynKeypad.init(AnalogPin.P0)
robotdynKeypad.on_key_pressed(on_key_pressed)
```

## Instalacja

1. Otwórz Microsoft MakeCode:

   https://makecode.microbit.org/

2. Utwórz nowy projekt.
3. Wybierz Rozszerzenia (Extensions).
4. Wklej adres repozytorium:

   https://github.com/pawelkasprowicz/pxt-robotdyn-keypad-analog

5. Dodaj bibliotekę do projektu.
6. Wybierz kategorię RobotDyn Keypad.

## Wymagany sprzęt

- BBC micro:bit V2
- RobotDyn Analog Keypad 3×4
- Trzy przewody połączeniowe

## Przykładowe zastosowania

- Zamki szyfrowe.
- Wprowadzanie kodów PIN.
- Kalkulatory.
- Sterowanie robotami.
- Menu urządzeń elektronicznych.
- Wprowadzanie wartości liczbowych.
- Gry elektroniczne.
- Panele sterowania.

## Historia wersji

### v1.1.0

- Dodano zdarzenia dla poszczególnych klawiszy.
- Dodano listę rozwijaną wszystkich 12 klawiszy.
- Zachowano zdarzenie naciśnięcia dowolnego klawisza.
- Zachowano zgodność z dotychczasowymi funkcjami.

### v1.0.0

- Pierwsza wersja biblioteki.
- Obsługa 12 klawiszy.
- Wybór wejścia analogowego.
- Skanowanie klawiatury w tle.
- Filtrowanie drgań styków.
- Obsługa zdarzeń.

## Autor

Paweł Kasprowicz

## Licencja

Licencja nie została jeszcze określona.
