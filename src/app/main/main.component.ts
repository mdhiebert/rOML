import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // GPA
  gpa = 0.0;
  gpaPoints = 0;
  // ADM
  adm = false;
  admPoints = 0;

  // LANGUAGE
  stratLangMaj = false;
  nonstratLangMaj = false;
  stratLangCourses = 0;
  nonStratLangCourses = 0;
  languagePoints = 0;

  // POTENTIAL
  pmspOMSOpts = ['TOP', 'MQ', 'HQ', 'Q', 'NQ']; // {TOP: 14, MQ: 10.5, HQ: 7, Q: 3.5, NQ: 0}; // last ranking?
  pmspOMS = '?';
  pmspOMSPoints = 0;
  // ranking
  ranking = 0;
  totalPeople = 1;
  pmsRankingPoints = 0;

  // ADVANCED CAMP
  coerOMSOpts = ['TOP', 'E', 'P', 'C', 'U']; // {TOP: 15.0, E: 11.25, P: 7.5, C: 3.75, U: 0, '?': 0};
  coerOMS = '?';
  coerOMSPoints = 0;

  // RECONDO
  recondo = false;
  recondoPoints = 0;

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

  // MATURITY RESPONSIBILITY
  yearsFullTime = 0;
  yearsPartTime = 0;
  usarNGSMP = 0;

  maturityResponsibilityPoints = 0;

  // APFT
  fallAPFT = 0;
  springAPFT = 0;
  acAPFT = 0;

  fallAPFTPoints = 0;
  springAPFTPoints = 0;
  acAPFTPoints = 0;

  // ATHLETICS
  yearsCommunityAthletics = 0;
  yearsIM = 0;
  yearsVarsity = 0;

  athleticsPoints = 0;

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

  maxGPAPoints = 31;
  maxADMPoints = 4;
  maxPMSOMSPoints = 14;
  maxRankingPoints = 7;
  maxLanguagePoints = 5;
  maxCampPoints = 15;
  maxRecondoPoints = 1;
  maxExtracurricularPoints = 5;
  maxMaturityResponsibilityPoints = 3;
  maxFallAPFTPoints = 3;
  maxSpringAPFTPoints = 3;
  maxACAPFTPoints = 6;
  maxAthleticsPoints = 3;

  // EXTRACURRICULAR EVENT FUNCTIONS
  genericCheck(event, property) {
    this[property] += event.checked ? 1 : -1;
  }

  // RECONDO
  updateRecondo(event) {
    this.recondo = event.checked;
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
  }

  calculateGPA() {
    const cutoff = 2.8;
    const cutoffPoints = 6.2;
    const maxVal = 4.0;
    const maxPoints = 31;

    if (this.gpa <= cutoff) {
      const fraction = this.gpa / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (this.gpa - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateADM() {
    return this.adm ? 4 : 0;
  }

  calculatePMSOMS() {
    const lookup = {TOP: 14, MQ: 10.5, HQ: 7, Q: 3.5, NQ: 0, '?': 0};
    return lookup[this.pmspOMS];
  }

  calculateRankingPoints() {
    return 7 * ( ( this.totalPeople - this.ranking + 1) / this.totalPeople );
  }

  calculateLanguagePoints() {
    const cutoff = 9;
    const cutoffPoints = 2.5;
    const maxVal = 45;
    const maxPoints = 5;

    let runningScore = 0;

    if (this.stratLangMaj) { runningScore += 45; }
    if (this.nonstratLangMaj) { runningScore += 30; }
    runningScore += this.stratLangCourses * 5;
    runningScore += this.nonStratLangCourses * 3;

    if (runningScore > 45) { runningScore = 45; }

    if (runningScore <= cutoff) {
      const fraction = runningScore / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (runningScore - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateCampPoints() {
    const lookup = {TOP: 15.0, E: 11.25, P: 7.5, C: 3.75, U: 0, '?': 0};
    return lookup[this.coerOMS];
  }

  calculateRecondoPoints() {
    return this.recondo ? 1 : 0;
  }

  calculateExtracurricularPoints() {
    const cutoff = 40;
    const cutoffPoints = 2.5;
    const maxVal = 100;
    const maxPoints = 5;

    let runningScore = 0;

    runningScore += 5 * this.numberTrainings;
    runningScore += 5 * this.yearsBandMember;
    runningScore += 5 * this.yearsColorGuard;
    runningScore += 5 * this.yearsCommunityService;
    runningScore += 5 * this.yearsDrillTeam;
    runningScore += 10 * this.yearsElectedOfficial;
    runningScore += 10 * this.yearsLeaderPresidentCaptain;
    runningScore += 5 * this.yearsTutor;
    runningScore += 5 * this.yearsROTCRecruiter;
    runningScore += 5 * this.yearsRangerChallenge;
    runningScore += 10 * this.yearsResidentAdvisor;
    runningScore += 5 * this.yearsStudentGovernment;

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
    const maxVal = 60;
    const maxPoints = 3;

    let runningScore = 0;

    runningScore += 20 * this.yearsFullTime;
    runningScore += 10 * this.yearsPartTime;
    runningScore += 10 * this.usarNGSMP;

    if (runningScore > maxVal) { runningScore = maxVal; }
    const fraction = runningScore / maxVal;
    return fraction * maxPoints;
  }

  calculateAPFTPoints(score) {
    const cutoff = 236;
    const cutoffPoints = 1.2;
    const maxVal = 300;
    const maxPoints = 6;

    if (score <= cutoff) {
      const fraction = score / cutoff;
      return fraction * (cutoffPoints);
    } else {
      const fraction = (score - cutoff) / (maxVal - cutoff);
      return cutoffPoints + fraction * (maxPoints - cutoffPoints);
    }
  }

  calculateAthleticsPoints() {
    const cutoff = 15;
    const cutoffPoints = 1.5;
    const maxVal = 60;
    const maxPoints = 3;

    let runningScore = 0;

    runningScore += 20 * this.yearsVarsity;
    runningScore += 10 * this.yearsIM;
    runningScore += 5 * this.yearsCommunityAthletics;

    if (runningScore > maxVal) { runningScore = maxVal; }
    const fraction = runningScore / maxVal;
    return fraction * maxPoints;
  }

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
