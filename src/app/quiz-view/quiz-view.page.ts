import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { IQuestion, IQuiz } from '../interfaces/quiz';
import { QuizService } from '../services/quiz.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AudioService } from '../services/audio.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.page.html',
  styleUrls: ['./quiz-view.page.scss'],
})
export class QuizViewPage implements OnInit {
  @ViewChild('timer', { static: false }) private countdown: CountdownComponent;
  totalScore = 0;
  showResults = false;
  config: CountdownConfig;
  totalCorrectAnswers = 0;
  questions: IQuestion[] = [];
  currentPage = 0;
  lastPage = 0;
  quizContent: IQuiz;
  currentQuestion: any;
  time = 30;
  totalPoints = 0;
  letters = [
    'A',
    'B',
    'C',
    'D',
    'E'
  ]
  CORRECT_ANSWER_SOUND_ID = 'correct_answer';
  totalAnswered = 0;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private quizSvc: QuizService, private audioSvc: AudioService, private navCtrl: NavController, private alertCtrl: AlertController) {
    this.quizContent = JSON.parse(this.route.snapshot.params.data);
    this.lastPage = this.quizContent.questions.length;
    this.shuffleQuestions();
    this.currentQuestion = this.quizContent.questions[0];
    this.config = { leftTime: this.time, format: 'mm:ss' };
    this.quizContent.questions.forEach(question => this.totalPoints += question.points)
    console.log('total points', this.totalPoints)
  }


  async ngOnInit() {

    const quiz: any = await this.getQuizzes()
    this.questions = quiz[0].questions;
    console.log(this.questions, quiz)
  }

  async ngAfterViewInit() {
    this.audioSvc.initSounds(this.CORRECT_ANSWER_SOUND_ID)
  }

  setCurrentData() {
    const idx = this.currentPage;

    this.currentQuestion = this.quizContent.questions[idx];
    this.resetTimer()
  }

  nextPage() {
    this.currentPage++;
    if (this.currentPage >= this.lastPage) {
      console.log(this.currentPage, this.lastPage)

      this.currentQuestion = ''
      this.showResults = true
      this.saveScore()
    } else {
      this.setCurrentData()
    }
  }

  previousPage() {
    this.currentPage--;
    this.setCurrentData()
  }

  select(i) {
    this.currentQuestion.choices[i].selected = true;
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


  handleTimer(e: CountdownEvent) {
    if (e.action == "start") {
      console.log("Start")
    }

    if (e.action == "done") {
      console.log("Done!");
      console.log('page', this.currentPage)
      this.nextPage()
      this.start_timer();
    }

  }

  start_timer() {
    this.config = { leftTime: this.time, format: 'mm:ss', demand: false };
    this.countdown.begin();
  }

  resetTimer() {
    this.countdown.restart()
  }

  async getQuizzes() {
    return await this.httpClient.get('./assets/mocks/quizzes-mock.json').toPromise();
  }

  resetQuiz() {
    this.totalAnswered = 0;
    this.totalCorrectAnswers = 0;
    this.totalScore = 0;
    this.currentPage = 0;
    this.currentQuestion = this.quizContent.questions[0];
    this.lastPage = this.quizContent.questions.length;
    this.showResults = false;
    this.shuffleQuestions()
    this.quizContent.questions.map((question) => {
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
    quiz.total_score = this.totalScore > quiz.total_score ? this.totalScore : quiz.total_score;
    console.log(quiz.total_score)
    const percentage = this.totalScore / this.totalPoints;
    quiz.percentage = Number(percentage.toFixed(2));
    const progress = this.totalAnswered / this.lastPage;
    quiz.progress = quiz.progress == 1 ? quiz.progress : Number(progress.toFixed(2))
    console.log('percentage', quiz.percentage, quiz.progress)
    this.quizSvc.storeQuizzes(quizzes);
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
      header: 'MCC 101 E-Learning',
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
}


