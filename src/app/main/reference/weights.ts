class Weights {

  /*
    TODO: This explanation could use some work.

    For every weight, there is often a 'cutoff' i.e. a point value that
    separates two different weight-slopes. Best illustrated with the example
    of GPA in FY19:

    The min/max value for GPA is 0.0/4.0. The cutoff value for GPA is 2.8.
    This means that a .1 increase in GPA below 2.8 leads to a .1/2.8 ~= 3.6%
    increase in OML points. ABOVE the cutoff, a .1 increase in GPA leads to a .1/(4.0 - 2.8) ~= 8.3% increase
    in OML points.

    Further, especially in the case of GPA, the number of OML points received at cutoff is 6.2
    out of a total of 31 possible points. Meaning a .1 increase after cutoff nets far more points
    than a .1 increase below cutoff. The cutoff, cutoffPoints, and specific weights of everything
    can be adjusted in this file.
  */

  // WEIGHTING

  // GPA
  gpaCutoff = 2.8;
  gpaCutoffPoints = 6.2;
  gpaMaxVal = 4.0;
  gpaMaxPoints = 31;

  // ADM4
  adm4MaxPoints = 4;

  // Language
  languageCutoff = 9;
  languageCutoffPoints = 2.5;
  languageMaxVal = 45;
  languageMaxPoints = 5;

  strategicLanguageMajorValue = 45;
  nonStrategicLanguageMajorValue = 30;
  strategicLanguageCourseValue = 5;
  nonStrategicLanguageCourseValue = 3;

  // PMS POTENTIAL
  pmspOMSMaxPoints = 14;
  pmspOMSOptions = {
    TOP: 14,
    MQ: 10.5,
    HQ: 7,
    Q: 3.5,
    NQ: 0
  };

  // RANKING
  rankingMaxPoints = 7;

  // ADVANCED CAMP
  campMaxPoints = 15;
  coerOMSOptions = {
    TOP: 15,
    E: 11.25,
    P: 7.5,
    C: 3.75,
    U: 0
  };

  // RECONDO
  recondoPoints = 1;

  // EXTRACURRICULARS
  // ec = extracurricular
  ecCutoff = 40;
  ecCutoffPoints = 2.5;
  ecMaxVal = 100;
  ecMaxPoints = 5;

  ecTrainingValue = 5;
  ecBandMemberValue = 5;
  ecColorGuardValue = 5;
  ecCommunityServiceValue = 5;
  ecDrillTeamValue = 5;
  ecElectedOfficialValue = 10;
  ecLeaderPresidentCaptainValue = 10;
  ecTutorValue = 5;
  ecROTCRecruiterValue = 5;
  ecRangerChallengeValue = 5;
  ecResidentAdvisorValue = 10;
  ecStudentGovernmentValue = 5;

  // MATURITY RESPONSIBILITY
  // mr = maturity responsibility
  mrMaxVal = 60;
  mrMaxPoints = 3;

  mrFullTimeValue = 20;
  mrPartTimeValue = 10;
  mrNGSMPValue = 10;

  // APFT
  apftCutoff = 236;
  apftCutoffPoints = 1.2;
  apftMaxVal = 300;
  apftMaxPoints = 6;

  // ATHLETICS
  athleticsCutoff = 15;
  athleticsCutoffPoints = 1.5;
  athleticsMaxVal = 60;
  athleticsMaxPoints = 3;

  athleticsVarsityValue = 20;
  athleticsIMValue = 10;
  athleticsCommunityValue = 5;

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
