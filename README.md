# Rozwiązanie zadania rekrutacyjnego RDS-Group | Lipiec 2017

Autor: **Jakub Chmielewski**, e-mail: jakub.chmielewski.89@gmail.com

#### Różnica implementacji względem tej wynikającej z opisu zadania

W opisie widoków prosicie Państwo o zaimplementowanie przejścia do widoku wydarzenia, 'po kliknięciu w zaznaczony dzień'. Jednak co gdyby w wejściowym pliku `events.json` znalazły się dwa lub więcej wydarzeń jednego dnia? Gdyby aplikacja miała składać się z widoku **miesiąca i dnia**, wtedy kliknięcie w dzień mogłoby wyświetlić wszystkie wydarzenia danego dnia. Jednak na początku wyraźnie zaznaczacie Państwo, że aplikacja ma składać się z widoku **miesiąca i wydarzenia**, zatem wybór tego wydarzenia musi się odbyć od razu z poziomu widoku miesiąca.

#### Alternatywne źródło danych

Przygotowałem edytowalny [arkusz kalkulacyjny](https://docs.google.com/spreadsheets/d/1mwzBkt6PCtXwxPQq5Pbs01IAV-hlrNI7IR17lQJwniA/edit) z przykładową listą wydarzeń do testów, którego reprezentacja w formacie JSON jest dostępna w [tym mini-serwisie](https://script.google.com/macros/s/AKfycbxCqzx1h3-B9qYJEHRHFQ_q3tm8nPPFXOlIKwwMNxG54mexDsY/exec). **Uwaga:** serwis nie zwraca wierszy-wydarzeń z nieprawidłową datą i czasem w pierwszej kolumnie.

Aby aplikacja pobierała dane z tego serwisu w pliku `src/app/constants.ts` proszę podmienić stałą DATAURL linkiem do tego serwisu. Link jest dostępny również w komentarzu w pliku `constants.ts`.
