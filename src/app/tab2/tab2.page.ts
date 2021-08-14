import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { CountdownEvent, CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { IQuestion, IQuiz } from '../interfaces/quiz';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { QuizService } from '../services/quiz.service';
import firebase from 'firebase';
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
  userQuizzes = [];
  constructor(private httpClient: HttpClient, private router: Router, private quizSvc: QuizService, private plt: Platform, private afd: AngularFireDatabase,
    private firebaseAuthSvc: FirebaseAuthService,
    private loadingCtrl: LoadingController) {
  }

  async _ngOnInit() {
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
    console.log('Quizzes from api', quizzesFromApi)

    console.log('Data', data)
    console.log(this.quizzes)
  }

  async ngOnInit() {
    this.plt.ready().then(async () => {
      // const quizzesFromApi = await this.quizSvc.getQuizList();
      // console.log('Quizzes from api',quizzesFromApi)

      // this.quizSvc.quizzes$.next(quizzesFromApi);
      // this.quizzes = this.quizSvc.quizzes$.getValue()
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();
      this.afd.list('barangays/quizzes').valueChanges().forEach(async (val: IQuiz[]) => {
        console.log("QUIZZES", val)

        const list = val;
        this.quizzes = list.filter((l) => Number(l.status) == 1);

        const userInfo = this.firebaseAuthSvc.userDetails$.getValue();
        const records = userInfo.quizzes;
        records.forEach(rec => {
          const quizIdx = this.quizzes.findIndex((q) => q.id == rec.quiz_id)
          if (quizIdx >= 0) {
            console.log(quizIdx)
            this.quizzes[quizIdx].percentage = rec.percentage
            this.quizzes[quizIdx].total_score = rec.score
            this.quizzes[quizIdx].progress = rec.progress

          }
        });


        console.log("q", this.quizzes)

        await loading.dismiss()



      })

      this.getUserQuizRecord()

      console.log(this.userQuizzes, "RECORD")
    })

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

  getUserQuizRecord() {
    const userInfo = this.firebaseAuthSvc.userDetails$.getValue();
    console.log("user", userInfo)
    // let records = [];
    // const self = this;
    // firebase.database().ref(`users/${userInfo.id}/quizzes`)
    // .once("value", function (snapshot) {
    //   snapshot.forEach(function (data) {
    //     console.log("ww",data.val().quiz_id)
    //     const q = self.quizzes.find((quiz) => quiz.id == data.val().quiz_id)
    //     console.log("q",q)
    //   });
    // });


    // console.log(records,"rec")

    //   console.log(records)
    const self = this;
    this.afd.list(`users/${userInfo.id}/quizzes`).valueChanges().forEach(records => {
      //  console.log("RECORDS",records,this.quizzes)
      //  this.userQuizzes = records;
      records.forEach((rec: any) => {
        const quizIdx = self.quizzes.findIndex((q) => q.id == rec.quiz_id)
        if (quizIdx >= 0) {
          console.log(quizIdx)
          self.quizzes[quizIdx].percentage = rec.percentage
          self.quizzes[quizIdx].total_score = rec.score
        }

        console.log("Quizzes", self.quizzes)
      })


    })

  }

}
