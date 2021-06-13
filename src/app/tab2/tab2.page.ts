import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent, CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { IQuestion, IQuiz } from '../interfaces/quiz';
import { QuizService } from '../services/quiz.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // @ViewChild('timer') counter: CountdownComponent;
  @ViewChild('timer', { static: false }) private countdown: CountdownComponent;

  currentData;
  totalScore = 0;
  showResults = false;
  config: CountdownConfig;
  quizzes: IQuiz[] = [];

  currentPage = 0;
  lastPage = 0;
  constructor(private httpClient: HttpClient, private router: Router, private quizSvc: QuizService) {
  }

  async ngOnInit() {
    // add comparison for updated/newly inserted quizzes /
    const data = await this.quizSvc.getQuizzes();
    if (!data) {
      // const quizzes = await this.getQuizzes();
      let quizzes = await this.getQuizzes();
      quizzes = quizzes.filter(quiz => quiz.questions.length > 0);
      const storeQuiz = await this.quizSvc.storeQuizzes(quizzes);
      this.quizzes = quizzes;
      this.quizSvc.quizzes$.next(quizzes);
    } else {
      this.quizSvc.quizzes$.next(data);
      this.quizzes = this.quizSvc.quizzes$.getValue()
    }

    // for testing
    // let quizzes = await this.getQuizzes();
    // quizzes = quizzes.filter(quiz => quiz.questions.length > 0);
    // const storeQuiz = await this.quizSvc.storeQuizzes(quizzes);
    // this.quizzes = quizzes;
    // this.quizSvc.quizzes$.next(quizzes);
    const quizzesFromApi = await this.quizSvc.getQuizList();
    console.log('Quizzes from api',quizzesFromApi)

    console.log('Data', data)
    console.log(this.quizzes)
  }

  // nextPage() {
  //   this.currentPage++;


  //   if (this.currentPage >= this.lastPage) {
  //     console.log(this.currentPage, this.lastPage)
  //     this.currentData = ''
  //     this.showResults = true
  //   } else {
  //     this.setCurrentData()
  //   }


  // }

  // previousPage() {
  //   this.currentPage--;
  //   this.setCurrentData()
  // }

  async getQuizzes() {
    return await this.httpClient.get<IQuiz[]>('./assets/mocks/quizzes-mock.json').toPromise();
  }

  openQuiz(quiz) {
    const quizContent = JSON.stringify(quiz)
    this.router.navigate(['/quiz-view', { data: quizContent }])
  }

  getPercentage(progress) {
    let percentage = progress * 100;

    return Number(percentage.toFixed(1));

  }

}
