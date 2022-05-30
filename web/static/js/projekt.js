class Projekt {

  constructor(name, beschreibung, logoPath, startDatum) {
    this.name = name;
    this.beschreibung = beschreibung;
    this.logoPath = logoPath;
    this.startDatum = startDatum;
  }

  get projektLaufzeit() {
    return this.berechneProjektLaufzeit();
  }

  berechneProjektLaufzeit(artefaktListe) {
    let laufzeit = 0;
    for (const artefakt of artefaktListe) {
      laufzeit += artefakt.geplanteZeit
    }
    return laufzeit
  }
}
