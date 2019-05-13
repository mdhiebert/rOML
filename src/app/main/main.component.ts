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

  // ADM
  adm = false;

  // LANGUAGE
  yearsStratLangMaj = false;
  yearsNonstratLangMaj = false;
  stratLangCourses = 0;
  nonStratLangCourses = 0;

  // POTENTIAL
  pmspOMSOpts = ['TOP', 'MQ', 'Q', '?']; // {TOP: 14, MQ: 10.5, Q: 7}; // last ranking?
  pmspOMS = '?';
  // ranking
  ranking = 0;
  totalPeople = 1;

  // ADVANCED CAMP
  coerOMSOpts = ['O', 'E', 'P', 'U', '?']; // {O: 15.0, E: 11.25, P: 7.5, U: 3.75};
  coerOMS = '?';

  // RECONDO
  recondo = 0;

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

  // MATURITY RESPONSIBILITY
  yearsFullTime = 0;
  yearsPartTime = 0;
  usarNGSMP = 0;

  // APFT
  fallAPFT = 0;
  springAPFT = 0;
  acAPFT = 0;

  // ATHLETICS
  yearsCommunityAthletics = 0;
  yearsIM = 0;
  yearsVarsity = 0;

  isLinear = false;
  gpaAdmFormGroup: FormGroup;
  langFormGroup: FormGroup;
  pmspOmsRankingFormGroup: FormGroup;
  acFormGroup: FormGroup;
  extracurricularFormGroup: FormGroup;
  maturityFormGroup: FormGroup;
  apftFormGroup: FormGroup;
  athleticsFormGroup: FormGroup;

  // EXTRACURRICULAR EVENT FUNCTIONS
  genericCheck(event, property) {
    this[property] += event.checked ? 1 : -1;
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
