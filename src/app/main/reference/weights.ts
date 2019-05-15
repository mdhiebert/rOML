class Weights {


    // BRANCHING INFORMATION
    branchList = ['AD', 'AG', 'AR', 'AV', 'CM', 'CY', 'EN', 'FA', 'FI', 'IN', 'MI', 'MP', 'MS', 'OD', 'QM', 'SC', 'TC'];
    detailedBranch = {
      AD: 'Air Defense Artillery',
      AG: 'Adjutant General',
      AR: 'Armor',
      AV: 'Aviation',
      CM: 'Chemical Corps',
      CY: 'Cyber Corps',
      EN: 'Engineer Corps',
      FA: 'Field Artillery',
      FI: 'Finance Corps',
      IN: 'Infantry',
      MI: 'Military Intelligence',
      MP: 'Military Police',
      MS: 'Medical Service',
      OD: 'Ordnance Corps',
      QM: 'Quartermaster',
      SC: 'Signal Corps',
      TC: 'Transportation Corps'
    };

    // Air Defense Artillery
    ADtop40 = 62.44;
    ADupper55 = 57.9;
    ADlower55 = 52.77;

    // Adjutant General
    AGtop40 = 54.7;
    AGupper55 = 54.68;
    AGlower55 = 45.05;

    // Armor
    ARtop40 = 67.87;
    ARupper55 = 67.19;
    ARlower55 = 62.56;

    // Aviation
    AVtop40 = 71.62;
    AVupper55 = 71.5;
    AVlower55 = 67.5;

    // Chemical Corps
    CMtop40 = 39.11;
    CMupper55 = 39.04;
    CMlower55 = 38.77;

    // Cyber
    CYtop40 = 66.54;
    CYupper55 = 65.67;
    CYlower55 = 58.42;

    // Engineering
    ENtop40 = 68.84;
    ENupper55 = 67.8;
    ENlower55 = 62.21;

    // Field Artillery
    FAtop40 = 61.43;
    FAupper55 = 61.33;
    FAlower55 = 56.11;

    // Finance Corps
    FItop40 = 63.85;
    FIupper55 = 63.1;
    FIlower55 = 59.07;

    // Infantry
    INtop40 = 72.54;
    INupper55 = 72.51;
    INlower55 = 67.67;

    // Military Intelligence
    MItop40 = 67.88;
    MIupper55 = 67.87;
    MIlower55 = 61.65;

    // Military Police
    MPtop40 = 62.09;
    MPupper55 = 61.48;
    MPlower55 = 54.06;

    // Medical Service
    MStop40 = 72.05;
    MSupper55 = 71.97;
    MSlower55 = 68.92;

    // Ordnance Corps
    ODtop40 = 55.43;
    ODupper55 = 54.46;
    ODlower55 = 39.21;

    // Quartermaster
    QMtop40 = 54.43;
    QMupper55 = 54.41;
    QMlower55 = 43.78;

    // Signal Corps
    SCtop40 = 57.22;
    SCupper55 = 57.05;
    SClower55 = 46.87;

    // Transportation Corps
    TCtop40 = 52.2;
    TCupper55 = 51.64;
    TClower55 = 36.38;
}

export default new Weights();
