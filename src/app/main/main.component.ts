import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import weights from './reference/weights';

//
// ─── NOTES ──────────────────────────────────────────────────────────────────────
//
// This is the main file of the OMS Calculator - all of the actual calculating is
// done here.
//
// The specific weights that are used in determining OMS are taken from the file
// weights.ts, located at /src/app/main/reference/weights.ts . This file can be
// modified at the change of every FY to reflect a more accurate calculation of
// a cadet's current OMS.
//
// This modification assumes that the overall structure of the calculations remains
// the same. That is to say, the same kinds of things are still being looked
// at (GPA, APFT scores, number of strategic language courses, years playing
// varsity athletics, etc.), they are just weighted differently.
//
// A key part of this overall structure is the inclusion of 'bent line' calculation.
// So named because it implies one slope up to a set 'cutoff' value, and a different
// slope beyond it. Bent line calculation is found when calculating GPA, Language,
// Extracurricular, Maturity/Responsibility, APFT, and Athletics points for OMS. It
// is best illustrated with the example of GPA:
//
//    The starting value for GPA is a 2.0, awarding 0 OMS points. The cutoff, however,
//    is 2.8, awarding 6.2 points. Thus, the slope is
//
//          ( 6.2 / (2.8 - 2.0) ) = 7.75,
//
//    and for every increase of 0.1 below 2.8, 0.775 OMS points are awarded. After the
//    cutoff, this changes. The maximum GPA of a 4.0 awards 31 points. So the slope now
//    is:
//
//          ( (31 - 6.2) / (4.0 - 2.8) ) = 20.666666...
//
//    so every .1 change in GPA now awards 2.066666... OMS points, up to the maximum
//    obtainable point value from GPA, 31.
//
// Now, not every category is as obviously translated to numbers as GPA, like in the case
// of athletics. For these categories, each year of activity is multiplied by a specific
// 'sub-weight'. For example, a year of varsity athletics awards 20 athletics sub-points.
// The calculator then takes these subpoints, and applies the exact same process as was
// seen with GPA - it uses one slope for values below the cutoff, and another for values
// above.
//
// ───────────────────────────────────────────────────────────── END OF NOTES ─────
//

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

//
// ─── GPA AND ADM ────────────────────────────────────────────────────────────────
//

  // GPA
  gpa = 0.0;
  gpaPoints = 0;

  // ADM
  adm = false;
  admPoints = 0;

//
// ─────────────────────────────────────────────────────── END OF GPA AND ADM ─────
//

//
// ─── LANGUAGE ───────────────────────────────────────────────────────────────────
//

  stratLangMaj = false;
  nonstratLangMaj = false;
  stratLangCourses = 0;
  nonStratLangCourses = 0;
  languagePoints = 0;

//
// ────────────────────────────────────────────────────────── END OF LANGUAGE ─────
//

//
// ─── PMS POTENTIAL AND RANKING ──────────────────────────────────────────────────
//

  // POTENTIAL
  pmspOMSOpts = Object.keys(weights.pmspOMSOptions);
  pmspOMS = null;
  pmspOMSPoints = 0;

  // RANKING
  ranking = 0;
  totalPeople = 1;
  pmsRankingPoints = 0;

//
// ───────────────────────────────────────── END OF PMS POTENTIAL AND RANKING ─────
//

//
// ─── ADVANCED CAMP AND RECONDO ──────────────────────────────────────────────────
//

  // ADVANCED CAMP
  coerOMSOpts = Object.keys(weights.coerOMSOptions);
  coerOMS = null;
  coerOMSPoints = 0;

  // RECONDO
  recondo = false;
  recondoPoints = 0;

//
// ───────────────────────────────────────── END OF ADVANCED CAMP AND RECONDO ─────
//

//
// ─── EXTRACURRICULARS ───────────────────────────────────────────────────────────
//

  // EXTRACURRICULARS
  numberTrainings = 0;
  yearsBandMember = 0;
  yearsColorGuard = 0;
  yearsCommunityService = 0;
  yearsDebateTeam = 0;
  yearsDrillTeam = 0;
  yearsElectedOfficial = 0;
  yearsLeaderPresidentCaptain = 0;
  yearsTutor = 0;
  yearsROTCRecruiter = 0;
  yearsRangerChallenge = 0;
  yearsResidentAdvisor = 0;
  yearsStudentGovernment = 0;

  extracurricularPoints = 0;

//
// ────────────────────────────────────────────────── END OF EXTRACURRICULARS ─────
//

//
// ────────────────────────────────────────────────── MATURITY RESPONSIBILITY ─────
//

  // MATURITY RESPONSIBILITY
  yearsFullTime = 0;
  yearsPartTime = 0;
  usarNGSMP = 0;

  maturityResponsibilityPoints = 0;

//
// ─────────────────────────────────────────── END OF MATURITY RESPONSIBILITY ─────
//

//
// ─── APFT ───────────────────────────────────────────────────────────────────────
//

  // APFT
  fallAPFT = 0;
  springAPFT = 0;
  acAPFT = 0;

  fallAPFTPoints = 0;
  springAPFTPoints = 0;
  acAPFTPoints = 0;

//
// ────────────────────────────────────────────────────────────── END OF APFT ─────
//

//
// ─── ATHLETICS ──────────────────────────────────────────────────────────────────
//

  // ATHLETICS
  yearsCommunityAthletics = 0;
  yearsIM = 0;
  yearsVarsity = 0;

  athleticsPoints = 0;

//
// ───────────────────────────────────────────────────────── END OF ATHLETICS ─────
//

//
// ─── UTILITY ────────────────────────────────────────────────────────────────────
//

  isLinear = false;
  gpaAdmFormGroup: FormGroup;
  langFormGroup: FormGroup;
  pmspOmsRankingFormGroup: FormGroup;
  acFormGroup: FormGroup;
  extracurricularFormGroup: FormGroup;
  maturityFormGroup: FormGroup;
  apftFormGroup: FormGroup;
  athleticsFormGroup: FormGroup;

  totalPoints = 0;

  maxGPAPoints = weights.gpaMaxPoints;
  maxADMPoints = weights.adm4MaxPoints;
  maxPMSOMSPoints = weights.pmspOMSMaxPoints;
  maxRankingPoints = weights.rankingMaxPoints;
  maxLanguagePoints = weights.languageMaxPoints;
  maxCampPoints = weights.campMaxPoints;
  maxRecondoPoints = weights.recondoPoints;
  maxExtracurricularPoints = weights.ecMaxPoints;
  maxMaturityResponsibilityPoints = weights.mrMaxPoints;
  maxFallAPFTPoints = weights.apftMaxPoints / 2;
  maxSpringAPFTPoints = weights.apftMaxPoints / 2;
  maxACAPFTPoints = weights.apftMaxPoints;
  maxAthleticsPoints = weights.athleticsMaxPoints;

  competitiveList = [];
  lessCompList = [];
  notCompList = [];

//
// ─────────────────────────────────────────────────────────── END OF UTILITY ─────
//

//
// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
//

  genericCheck(event, property) {
    this[property] += event.checked ? 1 : -1;
  }

  updateRecondo(event) {
    this.recondo = event.checked;
  }

//
// ────────────────────────────────────────────────── END OF HELPER FUNCTIONS ─────
//

//
// ─── CALCULATION FUNCTIONS ──────────────────────────────────────────────────────
//

  calculateGPA() {
    const cutoff = weights.gpaCutoff;
    const cutoffPoints = weights.gpaCutoffPoints;
    const maxVal = weights.gpaMaxVal;
    const maxPoints = weights.gpaMaxPoints;

    if (this.gpa <= cutoff) {
      const fraction = this.gpa / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (this.gpa - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateADM() {
    return this.adm ? weights.adm4MaxPoints : 0;
  }

  calculatePMSOMS() {
    return this.pmspOMS != null ? weights.pmspOMSOptions[this.pmspOMS] : 0;
  }

  calculateRankingPoints() {
    return weights.rankingMaxPoints * ( ( this.totalPeople - this.ranking + 1) / this.totalPeople );
  }

  calculateLanguagePoints() {
    const cutoff = weights.languageCutoff;
    const cutoffPoints = weights.languageCutoffPoints;
    const maxVal = weights.languageMaxVal;
    const maxPoints = weights.languageMaxPoints;

    let runningScore = 0;

    if (this.stratLangMaj) { runningScore += weights.strategicLanguageMajorValue; }
    if (this.nonstratLangMaj) { runningScore += weights.nonStrategicLanguageMajorValue; }
    runningScore += this.stratLangCourses * weights.strategicLanguageCourseValue;
    runningScore += this.nonStratLangCourses * weights.nonStrategicLanguageCourseValue;

    if (runningScore > maxVal) { runningScore = maxVal; }

    if (runningScore <= cutoff) {
      const fraction = runningScore / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (runningScore - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateCampPoints() {
    return this.coerOMS != null ? weights.coerOMSOptions[this.coerOMS] : 0;
  }

  calculateRecondoPoints() {
    return this.recondo ? weights.recondoPoints : 0;
  }

  calculateExtracurricularPoints() {
    const cutoff = weights.ecCutoff;
    const cutoffPoints = weights.ecCutoffPoints;
    const maxVal = weights.ecMaxVal;
    const maxPoints = weights.ecMaxPoints;

    let runningScore = 0;

    runningScore += weights.ecTrainingValue * this.numberTrainings;
    runningScore += weights.ecBandMemberValue * this.yearsBandMember;
    runningScore += weights.ecColorGuardValue * this.yearsColorGuard;
    runningScore += weights.ecCommunityServiceValue * this.yearsCommunityService;
    runningScore += weights.ecDrillTeamValue * this.yearsDrillTeam;
    runningScore += weights.ecElectedOfficialValue * this.yearsElectedOfficial;
    runningScore += weights.ecLeaderPresidentCaptainValue * this.yearsLeaderPresidentCaptain;
    runningScore += weights.ecTutorValue * this.yearsTutor;
    runningScore += weights.ecROTCRecruiterValue * this.yearsROTCRecruiter;
    runningScore += weights.ecRangerChallengeValue * this.yearsRangerChallenge;
    runningScore += weights.ecResidentAdvisorValue * this.yearsResidentAdvisor;
    runningScore += weights.ecStudentGovernmentValue * this.yearsStudentGovernment;

    if (runningScore > maxVal) { runningScore = maxVal; }

    if (runningScore <= cutoff) {
      const fraction = runningScore / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (runningScore - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateMaturityResponsibilityPoints() {
    const maxVal = weights.mrMaxVal;
    const maxPoints = weights.mrMaxPoints;

    let runningScore = 0;

    runningScore += weights.mrFullTimeValue * this.yearsFullTime;
    runningScore += weights.mrPartTimeValue * this.yearsPartTime;
    runningScore += weights.mrNGSMPValue * this.usarNGSMP;

    if (runningScore > maxVal) { runningScore = maxVal; }
    const fraction = runningScore / maxVal;
    return fraction * maxPoints;
  }

  calculateAPFTPoints(score) {
    const cutoff = weights.apftCutoff;
    const cutoffPoints = weights.apftCutoffPoints;
    const maxVal = weights.apftMaxVal;
    const maxPoints = weights.apftMaxPoints;

    if (score <= cutoff) {
      const fraction = score / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (score - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateAthleticsPoints() {
    const cutoff = weights.athleticsCutoff;
    const cutoffPoints = weights.athleticsCutoffPoints;
    const maxVal = weights.athleticsMaxVal;
    const maxPoints = weights.athleticsMaxPoints;

    let runningScore = 0;

    runningScore += weights.athleticsVarsityValue * this.yearsVarsity;
    runningScore += weights.athleticsIMValue * this.yearsIM;
    runningScore += weights.athleticsCommunityValue * this.yearsCommunityAthletics;

    if (runningScore > maxVal) { runningScore = maxVal; }
    if (runningScore <= cutoff) {
      const fraction = runningScore / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (runningScore - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateAll() {
    this.gpaPoints = this.calculateGPA();
    this.admPoints = this.calculateADM();
    this.pmspOMSPoints = this.calculatePMSOMS();
    this.pmsRankingPoints = this.calculateRankingPoints();
    this.languagePoints = this.calculateLanguagePoints();
    this.coerOMSPoints = this.calculateCampPoints();
    this.recondoPoints = this.calculateRecondoPoints();
    this.extracurricularPoints = this.calculateExtracurricularPoints();
    this.maturityResponsibilityPoints = this.calculateMaturityResponsibilityPoints();
    this.fallAPFTPoints = this.calculateAPFTPoints(this.fallAPFT) / 2;
    this.springAPFTPoints = this.calculateAPFTPoints(this.springAPFT) / 2;
    this.acAPFTPoints = this.calculateAPFTPoints(this.acAPFT);
    this.athleticsPoints = this.calculateAthleticsPoints();

    this.totalPoints = this.gpaPoints + this.admPoints + this.pmspOMSPoints + this.pmsRankingPoints;
    this.totalPoints += (this.languagePoints + this.coerOMSPoints + this.recondoPoints);
    this.totalPoints += (this.extracurricularPoints + this.maturityResponsibilityPoints);
    this.totalPoints += (this.fallAPFTPoints + this.springAPFTPoints + this.acAPFTPoints);
    this.totalPoints += this.athleticsPoints;

    this.determineBranchCompetitiveness();
  }

//
// ───────────────────────────────────────────── END OF CALCULATION FUNCTIONS ─────
//

//
// ─── BRANCHING FUNCTIONS ────────────────────────────────────────────────────────
//

  determineBranchCompetitiveness() {
    this.competitiveList = [];
    this.lessCompList = [];
    this.notCompList = [];

    let detailedName;
    for (const branch of weights.branchList) {
      detailedName = weights.detailedBranch[branch];
      if (this.totalPoints > weights[branch + 'lower55']) {
        if (this.totalPoints > weights[branch + 'upper55']) {
          this.competitiveList.push(detailedName);
        } else {
          this.lessCompList.push(detailedName);
        }
      } else {
        this.notCompList.push(detailedName);
      }
    }
  }

//
// ─────────────────────────────────────────────── END OF BRANCHING FUNCTIONS ─────
//

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.gpaAdmFormGroup = this.formBuilder.group({
      gpaAdmCtrl: ['', Validators.required]
    });
    this.langFormGroup = this.formBuilder.group({
      langCtrl: ['', Validators.required]
    });
    this.pmspOmsRankingFormGroup = this.formBuilder.group({
      pmspOmsRankingCtrl: ['', Validators.required]
    });
    this.acFormGroup = this.formBuilder.group({
      acCtrl: ['', Validators.required]
    });
    this.extracurricularFormGroup = this.formBuilder.group({
      extracurricularCtrl: ['', Validators.required]
    });
    this.maturityFormGroup = this.formBuilder.group({
      maturityCtrl: ['', Validators.required]
    });
    this.apftFormGroup = this.formBuilder.group({
      apftCtrl: ['', [Validators.max(300), Validators.min(0)]]
    });
    this.athleticsFormGroup = this.formBuilder.group({
      athleticsCtrl: ['', [Validators.max(300), Validators.min(0)]]
    });
  }

}
