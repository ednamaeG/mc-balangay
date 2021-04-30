import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ITrivia } from '../interfaces/trivia';
import { TriviaService } from '../services/trivia.service';

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
  
  constructor(private navParams: NavParams, private modalCtrl: ModalController, private triviaSvc: TriviaService) { }

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

  async updateTrivia(id) {
    let trivias = await this.triviaSvc.getTrivias();
    const trivia = trivias.find(t => t.id == id)
    trivia.isAnswered = true;
    console.log(trivias)
    this.triviaSvc.storeTrivias(trivias)
  }
}