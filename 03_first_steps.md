```
Offene Punkte
- Die App lädt die Wetterdaten noch nicht neu, wenn die App "resumed"...
```



# Wie gehen wir vor?

Wir entwickeln die App in kleinen Schritten und schauen zwischendurch immer wieder auf Zwischenergebnisse. Wir lassen sie quasi `wachsen`. Um am Anfang nicht von einer bestehenden Internetverbindung abhängig zu sein oder sich verändernden Werten abgelenkt zu werden, machen wir die Abfrage der aktuellen Position und der Temperaturwerte von forecast.io erst ganz zum Schluss. So können wir uns erst einmal auf das Wesentliche konzentrieren: Unsere App soll funktionieren. Daher legen wir an einigen Stellen erst einmal feste Werte fest, die wir später durch die echten Werte dynamisch ersetzen.

In diesem Guide gehen wir nur auf die wesentlichen Schritte in der Entwicklung ein, um nicht zu sehr abzulenken. Laden Sie sich bitte den Quellcode unserer App herunter, um die vollständigen Änderungen, wie zum Beispiel zusätzliche CSS-Klassen mitzubekommen. Hier sind auch die Funktionen zur Umrechnung von Position zu Gradzahl und umgekehrt definiert, deren Definition nicht im Fokus dieses Guides liegen.

# Wir wollen einen Temperaturwert sehen
Als erstes wollen wir die Grundstruktur unserer App schaffen. Dazu erstellen wir ein Template, einen Controller und eine Route. Wenn wir diese 3 einfachen Schritte hinter uns gebracht haben, können wir uns die App das erste Mal richtig anschauen.

## Template
Wir starten mit dem Template. Die Templates sind einfache HTML-Dateien, in denen wir das Layout unserer App definieren, so wie wir es aus dem Webdesign kennen. Hier schreiben wir erst einmal nur eine Gradzahl hinein und ersetzen sie später durch die Temperatur, die wir von forecast.io erhalten haben.

## Controller
Ein Template benötigt immer einen Controller. Der Controller dient ausschließlich dazu die Variablen und Aktionen für das Template bereitzustellen, die das Template benötigt, um die richtigen Daten anzuzeigen und zu funktionieren. Die Verbindung zwischen Template und Controller wird über den sogenannten `$scope` hergestellt. Zu diesem Zeitpunkt ist unser Controller noch leer.

## Routen
Zu guter Letzt müssen wir noch eine Route anlegen, damit angularjs weiß, welches Template und welchen Controller es nutzen muss, um die richtige Bildschirmseite anzuzeigen. Die Routen benötigen wir, um auf andere Teile unserer Anwendung zu verweisen und zu verlinken.


# Wir wollen den Wert sliden können

Jetzt, wo wir unser erstes Ergebnis sehen, wollen wir den Slider einbauen. Hierzu nutzen wir kein Plugin, sondern bauen uns den Slider mit CSS und ein wenig JavaScript selbst. Das Prinzip dahinter ist einfach: Unser Slider wird absolut positioniert und wir aktualisieren den Top-Wert per JavaScript mit dem Wert, den wir von ionic erhalten.

1. Wir bauen also in unserem Template um unseren Temperaturwert ein div mit einer Klasse und stylen es im CSS ein wenig. Hier ist wie oben erwähnt das "position: absolute;" wichtig.
2. Im Controller registrieren wir jetzt einen Event-Handler auf das `drag`-Event `$ionicGesture.on("drag", drag, $element);` und implementieren die `drag`-Funktion, die die aktuelle Position des Fingers auf dem Display weiterverarbeitet.
3. Die `drag`-Funktion setzt den `y`-Wert auf dem `$scope`, um ihn im Template nutzen zu können.
4. Als letzten Schritt setzen wir den `y`-Wert in ein `style`-Attribut und definieren hier den `top`-Wert.

Unser Slider ist fertig und wir sollten ihn im Browser mit der Maus bewegen können.

# Aufräumen!

Jetzt wo unser Slider fertig ist, müssen wir ein wenig aufräumen. Wie oben schon erwähnt sind Controller ausschließlich dafür gedacht, Variablen und Aktionen für das Template bereitzustellen. Unser `drag`-Event-Handler hat nicht direkt mit dem Template und dem Controller zu tun, sondern er beschreibt ein Verhalten eines Seiten-Elements in unserem Template. Der Slider sollte sein Verhalten selbst bestimmen können, zumal wir im nächsten Schritt noch mehr Logik und Verhalten zum Slider hinzufügen werden.

## Directives
Um es Seiten-Elementen zu ermöglichen selbst zu bestimmen, wie sie funktionieren, bringt angularjs eine nützliches Instrument mit sich: Direktiven. Mit Direktiven kann man sich eigene HTML-Elemente definieren, sie mit Interaktion ausstatten und an verschiedenen Stellen in der Anwendung einsetzen. ionic bringt, genauso wie angularjs, schon eine ganze Menge Direktiven mit, die es uns ermöglichen einfacher und schneller zum gewünschten Ergebnis zu kommen. Wir haben bis zu diesem Zeitpunkt übrigens schon Direktiven eingesetzt: `ion-content` (http://ionicframework.com/docs/api/directive/ionContent/).

Eine Direktive besteht im Wesentlichen aus zwei Teilen: dem direktiven-eigenen Template und der sogenannten `link`-Funktion. Das Template enthält das HTML, dass später anstelle des Direktiven-Codes im Template auftaucht und die `link`-Funktion definiert die Logik und das Verhalten der Direktive.

1. Wir bewegen das div im Template in den Template-Teil unserer neuen Direktive.
2. Jetzt bewegen wir `$ionicGesture.on("drag", drag, $element);` und die `drag`-Funktion aus dem Controller in die `link`-Funktion unserer Direktive.
3. Zum Schluss fügen wir unsere Direktive in das Template ein, wo vorher unser div stand.

Jetzt probieren wir wieder im Browser aus, ob noch alles funktioniert.

# der Wert soll sich beim Sliden ändern

Jetzt ist es an der Zeit unsere Temperatur, die wir vorher statisch im Template eingebaut haben, durch die anhand der Position des Sliders berechnete Temperatur zu ersetzen. Den Code zum Berechnen der Temperatur anhand der aktuellen `y`-Koordinate finden Sie im Beispiel-Source-Code. Zum Implementieren arbeiten wir in diesem Teil nur noch in der Direktive.

1. Da wir später die gemessene Temperatur als Ausgangspunkt nutzen wollen, zu diesem Zeitpunkt aber noch keine reale Temperatur zur Verfügung haben, behelfen wir uns mit einen festen Wert: `$scope.startTemperature = 13.1;`. Wir definieren die `startTemperature` auf dem `$scope`, da wir diesen Wert auch zur Erstellung unserer Skala an der linken Seite benötigen.
2. In der `drag`-Funktion berechnen wir die aktuell gewählte Temperatur und befüllen `$scope.guessedTemperature` mit dem berechneten Wert.
3. Im Template ersetzen wir die von statisch eingetragene Temperatur durch `{{guessedTemperature}}`.

Wie oben schon erwähnt, werden die Werte, die wir auf `$scope` definieren in dem jeweiligen Template zur Verfügung gestellt. Wir setzen in der `drag`-Funktion `$scope.temperature` immer auf die neu berechnete Temperatur und geben diesen Wert in den doppelt geschweiften Klammern im Template wieder aus. In diesem Fall muss das `$scope.temperature` und `$scope.y` innerhalb der `$scope.$apply`-Funktion gesetzt werden, da angularjs die Veränderungen im Template nicht aktualisiert. Im Normalfall muss man diesen Schritt nicht machen. In unserem Fall müssen wir die `$apply`-Funktion nutzen, da angularjs Events außerhalb von angularjs nicht mitbekommt. Zu diesen Events gehört unter anderem auch das `drag`-Event von ionic.

Im Browser sollten wir jetzt beim Sliden eine sich verändernde Temperatur sehen.


# Ein kurzer Zwischenstand

An dieser Stelle schauen wir einmal kurz zurück, was wir bisher geschafft haben:

1. Per Paper-Prototyping haben wir uns Gedanken darüber gemacht, wie unsere App später funktionieren soll.
2. Wir haben ionic installiert und das Projekt erstellt
3. Wir haben eine App gebaut, die einen Slider zeigt, der die Temperatur anhand der Position des Fingers auf dem Display berechnet und anzeigt.

# Was kommt als Nächstes?

1. Nachdem der Benutzer den Slider bewegt hat, soll ein Knopf auftauchen, der den Nutzer auffordert seine Schätzung zu bestätigen
2. Wenn der Nutzer auf den Knopf tippt, zeigen wir dem Nutzer die "offizielle" gefühlte Temperatur, werten das Ergebnis aus und sagen dem Nutzer, wie genau seine Schätzung war.
3. Wenn der Nutzer den Slider erneut betätigt, soll der Knopf wieder verschwinden und nach dem Loslassen wieder erscheinen.
4. Nachdem wir dem Nutzer sein Ergebnis gezeigt haben, erscheint ein Knopf, der bei Klick das Spiel zurücksetzt und es dem Nutzer ermöglicht erneut zu schätzen.

# Das Schätzen

Der Slider ist fertig. Nun wollen wir den Nutzer nach dem Sliden fragen, ob er mit dem Schätzen fertig ist, um ihm im nächsten Schritt das Ergebnis seiner Schätzung mitteilen zu können. Das Fragen und die weitere Interaktion ist kein Teil der Direktive mehr sondern findet wieder im Controller statt. Da der Controller nichts vom Sliden mitbekommt, muss der Slider dem Controller mitteilen, dass er mit dem Sliden fertig ist. Hierzu schicken wir ein Event Richtung Controller, der dann darauf reagieren kann.

## Den Nutzer fragen, ob er mit dem Schätzen fertig ist

1. Als erstes arbeiten wir Template und bauen uns ein div, das den Satz "So, you feel like it's ...°?!" und einen Knopf anzeigt, der später bei Klick das Ergebnis der Schätzung zeigen soll.
2. Dieses div bekommt jetzt die angularjs-Direktive `ng-show="slideFinished"` als zusätzliches "Attribut", damit wir es verstecken oder zeigen können, je nachdem, ob der Benutzer mit dem Sliden fertig ist oder nicht.
3. Wir registrieren in unserer Direktive einen Event-Handler auf das `dragend`-Event von ionic und schicken dann ein eigenes Event Richtung Controller: `$scope.$emit("temperature-slider.dragend", event);`.
4. Im Controller registrieren wir einen Event-Handler, der auf `temperature-slider.dragend` reagiert und eine eigene Funktion ausführt, die den Knopf anzeigt. Dieser Event-Handler setzt `$scope.slideFinished = true` und das Template zeigt daraufhin unseren Satz, weil `ng-show` den Wert `true` bekommen hat.

## Die Temperatur im Satz fehlt

Wie Sie sicherlich schon bemerkt haben, ist der Satz "So, you feel like it's ...°?!" noch unvollständig, da er die geschätzte Temperatur noch nicht darstellt. Bisher weiß nur der Slider über die geschätzte Temperatur Bescheid. Da auch der Controller, der ja irgendwie auch das Ergebnis präsentieren muss, über die geschätzte Temperatur Bescheid wissen muss, nutzen wir hier eines der zentralsten Grundeigenschaften von angularjs aus: das sogenannte "2-Way-Data-Binding". Im Endeffekt bedeutet das nichts anderes als dass die Direktive und der Controller beide Zugriff auf das gleiche Temperatur-Objekt haben. In unserer App verändert die Direktive den Wert des Temperatur-Objekts und da der Controller mit dem selben Objekt arbeitet, bekommt er die Änderungen direkt mit. Für unsere App bedeutet das folgende Änderungen:

1. Im Controller setzen wir `$scope.guessedTemperature = 13.1;`
2. Im Template fügen wir dem Slider-Element das Attribute `guessed-temperature="guessedTemperature"` hinzu. Attribute auf Direktiven-Elementen können von der Direktive als Variablen übernommen werden. Man kann sich das so vorstellen als ob man im JavaScript einer Funktion Parameter übergibt. Dieses Attribut baut die Verbindung zwischen dem Controller und der Direktive auf und ermöglicht beiden, mit dem selben Temperatur-Objekt `guessedTemperature` zu arbeiten.
3. In der Direktive müssen wir jetzt im `scope: { guessedTemperature: "=" }` gesetzt werden. Jetzt steht `guessedTemperature` in der Direktive zur Verfügung.
4. Im Template können wir unseren Satz jetzt wie folgt verändern: "So, you feel like it's {{guessedTemperature}}°?!".

Mit diesem Schritt haben wir den komplexesten Teil unserer App umgesetzt. Der Controller liefert den initialen Wert für die geschätzte Temperatur, das Template stellt der Direktive das Objekt zur Verfügung und die Direktive verändert beim Sliden den Wert des Objekts. Da wir das "2-Way-Data-Binding" nutzen, sind die Werteveränderungen sofort im Template und im Controller verfügbar. Dieses Prinzip ist wie oben schon erwähnt eines der Grundprinzipien von angularjs und findet sich in jeder App, egal ob Web-App oder Mobile-App, wieder.

# Wir vergleichen den geschätzten Wert mit dem konkreten

Nun wollen wir dem Nutzer das Ergebnis seiner Schätzung anzeigen. Wir tun dies indem wir anhand der Differenz zwischen geschätzter Temperatur und "echter Temperatur" einen Satz auswählen. Je genauer die Schätzung desto positiver ist der Satz formuliert. Zudem soll der echte Werte von oben in den Slider "bouncen".

1. Im Template fügen wir unter unserem Satz einen Button `let's check your chill skill!` mit dem Attribut `ng-click="showResults()"` ein. `ng-click` ist auch wieder eine Direktive, die von angularjs mitliefert wird. Sie führt die definiert Funktion aus, wenn der Nutzer auf das Element klickt.
2. Im Controller definieren wir jetzt auf `$scope` die Funktion `showResults`. Wie oben schon erwähnt, können Funktionen, die auf `$scope` im Controller definiert worden sind im Template verwendet werden.
3. Die `showResults`-Funktion stellt dem Template die "echte Temperatur" zur Verfügung und wählt den der Genauigkeit der Schätzung entsprechenden Satz aus und stellt auch diesen dem Template zur Verfügung. Des Weiteren verändert er noch die Werte zweier Variablen, die wir benötigen, um den Bestätigungs-Knopf auszublenden und den Ergebnis-Satz anzuzeigen.
4. Im Template fügen wir jetzt ein weiteres div mit dem Inhalt `{{rating}}` unter das div mit dem Bestätigen-Knopf ein. Dieses div bekommt das Attribut `ng-show="rateSkill"`, was die Inhalte des divs anzeigt, wenn `$scope.rateSkill` `true` wird.
5. Im Controller legen wir zunächst die "echte Temperatur" durch einen eigenen Wert fest: `$scope.currentTemperature = 14.2;`. Auch an dieser Stelle setzen wir `currentTemperature` wieder auf den  `$scope`, da wir diesen Wert auch für den bouncenden Temperaturwert benötigen. Würden wir ihn nur im Controller benötigen, würden wir ihn auf eine Variable ohne `$scope` setzen.
6. Jetzt definieren wir die `chooseRating`-Funktion im Controller und rufen diese in unserer `showResults`-Funktion auf: `$scope.rating = chooseRating($scope.guessedTemperature, $scope.currentTemperature);`. `$scope.rating` beinhaltet jetzt den Satz und wird in unserem neuen div dargestellt.

Jetzt können wir wieder im Browser überprüfen, ob alles funktioniert. Nachdem Beenden des Slidens sollte unten der Bestätigen-Knopf auftauchen, der bei Klick wiederum den Ergebnis-Satz anzeigt.

# Die echte Temperatur bounced in den Slider

Der echte Temperatur-Wert soll von oben an die korrekte Stelle im Slider "fallen".

1. Wir fügen im Template ein weiteres Attribut zu unserer Direktive hinzu: `current-temperature="currentTemperature"`.
2. In unserer Direktive fügen wir `currentTemperature` der `scope`-Definition hinzu, um `currentTemperature` in unserer Direktive nutzen zu können.
3. Im Direktiven-Template definieren wir uns jetzt ein div, das die `currentTemperature` anzeigen soll. Es bekommt das Attribut `ng-show="currentTemperature"`, das dafür sorgt, dass das div nur dann angezeigt wird, wenn `currentTemperature` definiert ist.

Jetzt wird im Browser der echte Temperaturwert im Slider angezeigt, sobald er definiert wurde. Nun wollen wir ihn an der richtigen Stelle im Slider anzeigen.

1. Wir definieren in der `link`-Funktion einen sogenannten `watch`. Watches sind dazu da, Werte zu überwachen und bei Veränderung Funktionen auszuführen. Auch die Veränderung von undefiniert zu definiert wird von den Watches wahrgenommen, was uns an dieser Stelle hilft. Der `$scope.$watch` berechnet die Position der echten Temperatur im Slider und stellt sie dem Direktive-Template auf `$scope.currentY` zur Verfügung.
2. Im Direktiven-Template setzen wir in unserem div mit der echten Temperatur das `style`-Attribut: `style="top: {{currentY}}px;"`. Im CSS haben wir dem div schon ein `position: absolute;` gegeben, so das Veränderung der `top`-Eigenschaft zu Positionsveränderungen führt.

Im Browser wird jetzt die echte Temperatur an der richtigen Position im Slider angezeigt. Zum Schluss bauen wir noch die Animation ein. Hierzu nutzen wir die animate.css Bibliothek, die uns verschiedene Animationsmöglichkeiten zur Verfügung stellt.

1. Wir fügen in unserem Direktiven-Template unserem div mit der echten Temperatur die `animated`-Klasse hinzu, um animate.css zu sagen, dass dieses Element animert werden soll.
2. Des Weiteren bekommt das div `{{animation}}` als weitere Klasse gesetzt. Damit bekommt das div die Klasse, die wir auf `$scope.animation` gleich setzen werden.
3. Zuletzt setzt unser `watch` jetzt zusätzlich `$scope.animation = "bounceInDown";`. Damit hat das div jetzt die Klassen `animated bounceInDown` und animiert das Element jetzt korrekt.

Im Browser sehen wir jetzt einen an die richtige Position fallenden Temperatur-Wert.

# Der Reset-Knopf

Vielleicht will der Nutzer sein Glück noch einmal versuchen, so das wir jetzt noch einen Reset-Knopf einbauen.

1. Im Template fügen wir dem div, das den Ergebnissatz anzeigt noch einen Button hinzu.
2. Der Button erhält das Attribut `ng-click="reset()"`.
3. Im Controller definieren wir die `$scope.reset`-Funktion, die alle Variablen zurück auf ihre Start-Werte stellt. Da angularjs nach einer Nutzeraktion immer die Templates neu berechnet, brauchen wir an dieser Stelle nichts weiter zu unternehmen. angularjs hat die Benutzeroberfläche für uns schon aktualisiert.

# Wo stehen wir?

An dieser Stelle ist unsere App schon fast fertig entwickelt. Wir müssen nur noch die von uns festgelegten Werte durch dynamische, echte Werte ersetzen. Wir haben die Funktionen für die Positionsbestimmung und das Abrufen der aktuellen Wetterdaten in sogenannten Factories definiert. Factories bieten uns die Möglichkeit komplexere Logik aus Controllern und Direktiven zu extrahieren und sie gegebenenfalls auch an anderen Stellen unserer Anwendung wieder zu verwenden. Wir gehen überspringen hier das Abrufen der aktuellen Wetterdaten aus dem Internet, da dies Standard-AJAX-Aufrufe sind. Das Festellen der aktuellen Position ist interessanter, da wir mit ionic bzw PhoneGap diekten Zugriff auf die Hardware des Devices bekommen.

1. Mit `$window.navigtor.geolocation.getCurrentPosition()` können wir die aktuellen Koordinaten des Devices abfragen.
2. In unserem Wetterdaten-Abruf verwenden wir diese Koordinaten, um vom Wetterdienst die Wetterdaten unserer Postion abfragen zu können.
3. Die Abfrage der Positionsdaten und der Wetterdaten führen wir beim Start der App durch, damit der Nutzer mit seiner Schätzung starten kann, sobald die Daten vorliegen. Dazu fügen wir in der app.js-Datei in den `run`-Block den Aufruf der `Weather.getForecastForMyPosition()` ein. Der `run`-Block wird bei jedem App-Start einmal ausgeführt und eignet sich daher hervorragend für das Laden von initialen Daten.




