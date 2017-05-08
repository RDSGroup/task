# Zadanie rekrutacyjne RDS-Group | Maj 2017

Przy pomocy frameworku Angular (https://angular.io/) stworzyć mini web aplikację - kalendarz.
Dane do aplikacji znajdują się w pliku `events.json`<br><br>
Aplikacja ma mieć 2 widoki:
  - widok miesiąca
  - widok wydarzenia

Widok miesiąca powinien posiadać wypisane wszystkie dni aktulanego miesiąca w formie tabelki (układ
jak w standardowym kalendarzu), oraz zaznaczone dni, w których odbywa się jakieś wydarzenie
opisane w `events.json`. W zaznaczonym dniu powinna być również wypisana godzina wydarzenia.
Po kliknięciu w zaznaczony dzień przechodzimy do widoku wydarzenia, gdzie wypisane są
wszystkie informacje o wydarzeniu. Dodatkowo mamy przycisk _wstecz_, który przenosi nas
z powrotem do widoku kalendarza.

Wymagania techniczne:
  - framework Angular
  - style przy pomocy SASS
  - dane zasysane przez angularowy serwis z pliku `events.json`