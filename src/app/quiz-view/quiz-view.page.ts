import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { IQuestion, IQuiz } from '../interfaces/quiz';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.page.html',
  styleUrls: ['./quiz-view.page.scss'],
})
export class QuizViewPage implements OnInit {
  @ViewChild('timer', { static: false }) private countdown: CountdownComponent;
  currentData;
  totalScore = 0;
  showResults = false;
  config: CountdownConfig;
  totalCorrectAnswers = 0;
  questions:IQuestion[] = [];
  currentPage = 0;
  lastPage = 0;
  quizContent: IQuiz;
  currentQuestion: any;
  time = 30;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.quizContent = JSON.parse(this.route.snapshot.params.data);
    console.log('route params', this.quizContent);

    this.lastPage = this.quizContent.questions.length;
    console.log(this.lastPage)


    this.currentQuestion = this.quizContent.questions[0];
    this.config = { leftTime: this.time, format: 'mm:ss' };
  }


  async ngOnInit() {
    const quiz: any = await this.getQuizzes()
    this.questions = quiz[0].questions;
    console.log(this.questions, quiz)
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
      this.currentData = ''
      this.currentQuestion = ''
      this.showResults = true
    } else {
      this.setCurrentData()
    }
  }

  previousPage() {
    this.currentPage--;
    this.setCurrentData()
  }

  select(i) {
    // if (!this.currentData.isOpen) {

    // this.currentData.isOpen = true;
    this.currentQuestion.choices[i].selected = true;

    if (this.currentQuestion.choices[i].correct) {
      this.totalScore += this.currentQuestion.points;
      this.totalCorrectAnswers += 1;
      console.log(this.totalCorrectAnswers)
    }
    setTimeout(() => {
      this.currentData = '';
      this.nextPage();
      
    }, 300)

    // }
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

  resetQuiz(){
    this.totalCorrectAnswers = 0;
    this.totalScore = 0;
    this.currentPage = 0;
    this.currentQuestion = this.quizContent.questions[0];
    this.lastPage = this.quizContent.questions.length;
    this.showResults = false;
    this.quizContent.questions.map((question) =>{
      question.choices.forEach((choice) =>{
        choice.selected = false;
      })
    })
  }
}


