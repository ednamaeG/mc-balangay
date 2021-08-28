import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ITrivia } from '../interfaces/trivia';
import { TriviaService } from '../services/trivia.service';
import firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseAuthService } from '../services/firebase-auth.service';
@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {
  trivia: ITrivia;
  showInfo = false;
  title = "Trivia Time!";
  correctAnswer = '';
  choice_letters = ["A", "B", "C"];
  answerStats = '';

  constructor(private navParams: NavParams, private modalCtrl: ModalController, private triviaSvc: TriviaService,private afd: AngularFireDatabase,private firebaseAuthSvc:FirebaseAuthService) { }

  ngOnInit() {
    this.trivia = this.navParams.get('value');
    console.log(this.trivia)
  }

  selectAnswer(i) {
    console.log(i)
    this.correctAnswer = this.trivia.choices[i].title;
    this.trivia.choices[i].selected = true;
    if (this.trivia.choices[i].correct) {
      this.answerStats = "CORRECT!";
    } else {
      this.answerStats = "INCORRECT!"
    }
    this.updateTrivia(this.trivia.id)
    setTimeout(() => {
      this.title = "Did you know?"
      this.showInfo = true;
    }, 700)
  }

  dismissModal() {
    this.modalCtrl.dismiss()
  }

  saveAnsweredTrivia(id){

  }

  async updateTrivia(id) {
    // const userInfo  = this.firebaseAuthSvc.userDetails$.getValue();
    // const ref = this.afd.database.ref(`users/${userInfo.id}/trivias`);
    // const triviaData = {
    //   trivia_id: id
    // }
    // console.log(userInfo)
    // ref.push(triviaData)
    let trivias = await this.triviaSvc.getTrivias();
    const trivia = trivias.find(t => t.id == id)
    trivia.isAnswered = true;
    console.log(trivias)
    this.triviaSvc.storeTrivias(trivias)
  }
}
