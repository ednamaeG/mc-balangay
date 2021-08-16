import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { IChoice, IQuestion, IQuiz } from '../interfaces/quiz';
import { QuizService } from '../services/quiz.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AudioService } from '../services/audio.service';
import { AlertController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
Chart.register(...registerables);

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.page.html',
  styleUrls: ['./quiz-view.page.scss'],
})
export class QuizViewPage implements OnInit {
  @ViewChild('timer', { static: false }) private countdown: CountdownComponent;
  @ViewChild('slider') slider: IonSlides;
  @ViewChild('content') content: IonContent;
  @ViewChild('lineCanvas', { static: true }) lineCanvas: ElementRef;
  chartDonut: any;
  // QUESTION STATUS 0 - Incorrect / 1 -Correct / 2 - Times Up / 3 - Skipped
  slidesOptions = {

    // freeMode: true,
    // loop: true,
    allowTouchMove: false
  };

  totalScore = 0;
  showResults = false;
  config: CountdownConfig = { leftTime: 15, format: 'mm:ss', notify: [10] };;
  totalCorrectAnswers = 0;
  questions: IQuestion[] = [];
  currentPage = 0;
  lastPage = 0;
  quizContent: IQuiz;
  currentQuestion: any;
  time: number = 30;
  totalPoints = 0;
  letters = [
    'A',
    'B',
    'C',
    'D',
    'E'
  ]
  CORRECT_ANSWER_SOUND_ID = 'correct_answer';
  INCORRECT_ANSWER_SOUND_ID = 'incorrect_answer';
  TIMER_SOUND_ID = 'timer_sound';
  correctSoundUrl = 'assets/sounds/correct_answer.mp3';
  incorrectSoundUrl = 'assets/sounds/wrong-answer.mp3';
  timerSoundUrl = 'assets/sounds/timer.mp3';
  progress = 0;

  totalAnswered = 0;
  showQuizResults = false;
  correctCount = 0;
  incorrectCount = 0;
  skippedCount = 0;
  timeUpCount = 0;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private quizSvc: QuizService,
    private audioSvc: AudioService, private navCtrl: NavController, private alertCtrl: AlertController,
    private firebaseAuthSvc: FirebaseAuthService,
    private afd: AngularFireDatabase
  ) {
    this.quizContent = JSON.parse(this.route.snapshot.params.data);
    if (this.quizContent.questions && this.quizContent.questions.length > 0) {
      this.lastPage = this.quizContent.questions.length;
      this.shuffleQuestions();
      this.currentQuestion = this.quizContent.questions[0];

      this.quizContent.questions.forEach(question => this.totalPoints += Number(question.points))
      console.log('total points', this.totalPoints, this.quizContent, this.quizContent.questions)
    }


  }


  async ngOnInit() {

    // const quiz: any = await this.getQuizzes()
    // this.questions = quiz[0].questions;
    // console.log(this.questions, quiz)
  }

  async ngAfterViewInit() {
    this.audioSvc.initSounds(this.CORRECT_ANSWER_SOUND_ID, this.correctSoundUrl)
    this.audioSvc.initSounds(this.INCORRECT_ANSWER_SOUND_ID, this.incorrectSoundUrl)
    this.audioSvc.initSounds(this.TIMER_SOUND_ID, this.timerSoundUrl)

  }

  setCurrentData() {
    const idx = this.currentPage;
    this.currentQuestion = this.quizContent.questions[idx];
    // this.resetTimer()
  }
  skipQuiz() {
    this.quizContent.questions[this.currentPage].status = 3;
    this.nextPage();
  }

  nextPage() {
    this.audioSvc.stopSound(this.TIMER_SOUND_ID)

    this.currentPage++;
    this.progress = this.currentPage / this.lastPage;
    this.slider.slideTo(this.currentPage)
    this.content.scrollToTop()

    // this.resetTimer()
    if (this.currentPage >= this.lastPage) {
      console.log(this.currentPage, this.lastPage)

      this.currentQuestion = ''
      this.showResults = true;
      this.getStatsChart()
      this.saveScore()
    } else {
      this.setCurrentData()
    }
    this.resetTimer()
  }

  previousPage() {
    this.currentPage--;
    this.setCurrentData()
  }

  _select(i) {
    console.log('currentQuestion', this.quizContent.questions)
    if (!this.quizContent.questions[this.currentPage].hasAnswer) {
      this.currentQuestion.choices[i].selected = true;
      this.quizContent.questions[this.currentPage].hasAnswer = true;


      this.totalAnswered++;
      if (this.currentQuestion.choices[i].correct) {
        this.audioSvc.playSound(this.CORRECT_ANSWER_SOUND_ID);
        this.totalScore += this.currentQuestion.points;
        this.totalCorrectAnswers += 1;
        console.log(this.totalCorrectAnswers)
      }
      setTimeout(() => {
        this.nextPage();
      }, 300)
    }
  }


  select(i) {
    console.log('currentQuestion', this.quizContent.questions)
    this.audioSvc.stopSound(this.TIMER_SOUND_ID)

    if (!this.quizContent.questions[this.currentPage].hasAnswer) {
      this.currentQuestion.choices[i].selected = true;
      const correctAnswer = this.currentQuestion.choices.find(choice => choice.correct == true);

      console.log('choices', this.currentQuestion.choices)
      this.quizContent.questions[this.currentPage].hasAnswer = true;
      this.totalAnswered++;
      if (this.currentQuestion.choices[i].correct) {
        this.quizContent.questions[this.currentPage].status = 1;
        this.audioSvc.playSound(this.CORRECT_ANSWER_SOUND_ID);
        this.totalScore += Number(this.currentQuestion.points);
        this.totalCorrectAnswers += 1;
        console.log(this.totalCorrectAnswers)


      } else {
        this.countdown.stop()
        this.audioSvc.playSound(this.INCORRECT_ANSWER_SOUND_ID)
        this.quizContent.questions[this.currentPage].status = 0;
        console.log('correct answer::', correctAnswer)
        // this.showCorrectAnswer(correctAnswer.title, "answer")
      }
      setTimeout(() => {
        this.nextPage();
        // this.resetTimer()

      }, 300)

    }
  }

  handleTimer(e: CountdownEvent) {

    if (e.action == "notify") {
      this.audioSvc.playSound(this.TIMER_SOUND_ID);
    }

    if (e.action == "done") {
      console.log("Done!");
      console.log('page', this.currentPage);
      this.quizContent.questions[this.currentPage].status = 2;
      // alert("Times up!")
      // this.nextPage()
      // const correctAnswer = this.currentQuestion.choices.find(choice => choice.correct == true);
      this.showCorrectAnswer("timer")
      this.start_timer();
    }

  }

  start_timer() {
    // this.config = { leftTime: this.time, format: 'mm:ss', notify:[5]};
    this.countdown.begin();
  }

  resetTimer() {
    console.log('reset timer')
    // this.config = { leftTime: this.time, format: 'mm:ss', notify:[5]};

    this.countdown.restart()
    // this.start_timer()
  }

  async getQuizzes() {
    return await this.httpClient.get('./assets/mocks/quizzes-mock.json').toPromise();
  }

  resetQuiz() {
    this.chartDonut.destroy()
    this.totalAnswered = 0;
    this.totalCorrectAnswers = 0;
    this.totalScore = 0;
    this.currentPage = 0;
    this.progress = 0;
    this.currentQuestion = this.quizContent.questions[0];
    this.lastPage = this.quizContent.questions.length;
    this.showResults = false;
    this.shuffleQuestions()
    this.quizContent.questions.map((question) => {
      question.hasAnswer = false;
      question.choices.forEach((choice) => {
        choice.selected = false;
      })
    })
  }

  shuffleQuestions() {
    this.quizContent.questions.sort(function () {
      return 0.8 - Math.random()
    });

    console.log(this.quizContent.questions)

    this.quizContent.questions.forEach((question) => {
      question.choices.sort(function () {
        return 0.5 - Math.random()
      })
    })
  }

  saveScore() {
    const quizzes = this.quizSvc.quizzes$.getValue();
    console.log(quizzes, this.quizContent)
    const quiz = quizzes.find(quiz => quiz.id === this.quizContent.id)
    // TEMP DISABLED (WILL GO BACK )
    // quiz.total_score = this.totalScore > quiz.total_score ? this.totalScore : quiz.total_score;
    // console.log(quiz.total_score)
    // const percentage = this.totalScore / this.totalPoints;
    // quiz.percentage = Number(percentage.toFixed(2));
    // const progress = this.totalAnswered / this.lastPage;
    // quiz.progress = quiz.progress == 1 ? quiz.progress : Number(this.progress.toFixed(2))
    // console.log('percentage', quiz.percentage, quiz.progress)
    this.quizSvc.storeQuizzes(quizzes);
    this.saveUserQuiz()
  }

  exitQuiz() {
    this.navCtrl.pop()
  }

  quitQuiz() {
    this.confirmQuitAlert()
  }

  async confirmQuitAlert() {
    const self = this;
    const alert = await this.alertCtrl.create({
      header: 'MC Balangay',
      message: 'Are you sure you want to leave this quiz?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            this.saveScore()
            self.navCtrl.pop()
          }
        }
      ]
    });

    await alert.present();
  }

  async showCorrectAnswer(type) {
    const alert = await this.alertCtrl.create({
      header: type == "timer" ? "TIMES UP!" : "INCORRECT!",
      // message: ' ' + correctAnswer,
      // subHeader: 'The Correct Answer is:',
      mode: 'ios',
      cssClass: type == "timer" ? 'quiz-alert timer-alert' : 'quiz-alert incorrect-alert',

      // buttons: [
      //   {
      //     text: 'Continue',
      //     role: 'cancel',
      //     cssClass: 'secondary',
      //     handler: (blah) => {

      //     }
      //   }]
      //   }, {
      //     text: 'Continue',
      //     handler: () => {
      //       this.saveScore()
      //       self.navCtrl.pop()
      //     }
      //   }
      // ]
    });



    await alert.present();

    setTimeout(async () => {
      await alert.dismiss();
      this.nextPage();
    }, 500)
  }

  ngOnDestroy() {
    console.log('ondestroy');
    this.audioSvc.stopSound(this.TIMER_SOUND_ID)


  }


  getQuizStats(status) {
    let statusTitle = ""
    switch (status) {
      case 0:
        statusTitle = "Incorrect";
        break;
      case 1:
        statusTitle = "Correct";
        break;
      case 2:
        statusTitle = "Time Ran Out";
        break;
      case 3:
        statusTitle = "Skipped";
        break;
      default:
        break;
    }
    return statusTitle;
  }

  getCorrectAnswer(choices: IChoice[]) {
    const correctAnswer = choices.find(choice => choice.correct);
    return correctAnswer.title;
  }

  getStatsChart() {
    // let correctCount = 0;
    // let incorrectCount = 0;
    // let skippedCount = 0;
    // let timeUpCount = 0;
    this.quizContent.questions.forEach(question => {
      if (question.status == 0) {
        this.incorrectCount++;
      } else if (question.status == 1) {
        this.correctCount++;
      } else if (question.status == 2) {
        this.timeUpCount++;
      } else if (question.status == 3) {
        this.skippedCount++;
      }
    });

    let dataSet = [
      {
        "label": "Correct",
        "value": this.correctCount
      }, {
        "label": "Incorrect",
        "value": this.incorrectCount
      }, {
        "label": "Skipped",
        "value": this.skippedCount
      }, {
        "label": "Time ran out",
        "value": this.timeUpCount
      }
    ]

    console.log(dataSet)
    this.createChart(dataSet)
  }

  createChart(dataSet) {

    // const stats = dataSet.filter((s) => {
    //   return s.value !== 0
    // })
    const labels = dataSet.map(d => d.label)
    const data = dataSet.map(d => d.value)

    console.log(data, labels)

    const chartOptions: any = {
      responsive: true,
      maintainAspectRatio: false
      ,
      plugins: {
        legend: {
          position: 'top',
        },
        // title: {
        //   display: true,
        //   text: 'Total Population'
        // }
      }, elements: {
        center: {
          text: 'Red is 2/3 of the total numbers',
          color: '#FF6384', // Default is #000000
          fontStyle: 'Arial', // Default is Arial
          sidePadding: 20, // Default is 20 (as a percentage)
          minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
          lineHeight: 25 // Default is 25 (in px), used for when text wraps
        }
      }
    }
    this.chartDonut = new Chart(this.lineCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          label: 'Population As of TEST',
          data: data,
          backgroundColor: [
            '#2dd36f',
            '#eb445a',
            '#ffc409',
            '#92949c'
          ],
          hoverOffset: 4
        }]
      }, options: chartOptions



    });

  }

  saveUserQuiz() {
    const userInfo = this.firebaseAuthSvc.userDetails$.getValue()
    const percentage = this.totalScore / this.totalPoints;

    const progress = this.quizContent.progress == 1 ? this.quizContent.progress : this.totalAnswered / this.lastPage;
    const score = this.quizContent.total_score > this.totalScore ? this.quizContent.total_score : this.totalScore
    const ref = this.afd.database.ref(`users/${userInfo.id}/quizzes/${this.quizContent.id}`)
    const quizDetails = {
      quiz_id: this.quizContent.id,
      score: score,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      skippedCount: this.skippedCount,
      timeUpCount: this.timeUpCount,
      percentage: percentage,
      progress: progress,
      name: this.quizContent.title
    }

    ref.set(quizDetails)

  }
}
