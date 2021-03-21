import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

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
  questions = [];
  testItems = [
    {
      id: 1,
      question: "Who was elected President of the United States in 2017?",
      isOpen: false,
      points: 20,
      choices: [
        {
          title: "Donald Trump",
          correct: true,

        },
        {
          title: "Barack Obama",
          correct: false,


        },
        {
          title: "George Bush",
          correct: false,
        }
      ]
    },
    {
      id: 2,
      question: "What is the approximate number of islands that comprise the Philippines?",
      isOpen: false,
      points: 20,
      choices: [
        {
          title: "6500",
          correct: false
        },
        {
          title: "7500",
          correct: true
        },
        {
          title: "8500",
          correct: false
        }
      ]
    },
    {
      id: 3,
      points: 20,
      question: "Which country occupied the Philppies during World War II",
      isOpen: false,
      choices: [
        {
          title: "Germany",
          correct: false
        },
        {
          title: "Japan",
          correct: true
        },
        {
          title: "China",
          correct: false
        }
      ]
    },
    {
      id: 4,
      points: 20,
      question: "What is the term of the President of the Philippines?",
      isOpen: false,
      choices: [
        {
          title: "Four years",
          correct: false
        },
        {
          title: "Five years",
          correct: false
        },
        {
          title: "Six Years",
          correct: true
        }
      ]
    }, {
      id: 5,
      points: 20,
      question: "Which country had the Philippines as its colony for more than 300 years?",
      isOpen: false,
      choices: [
        {
          title: "Italy",
          correct: false
        },
        {
          title: "Spain",
          correct: true
        },
        {
          title: "England",
          correct: false
        }
      ]
    }
  ];
  currentPage = 0;
  lastPage = 0;
  quizContent: any;
  currentQuestion: any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.quizContent = JSON.parse(this.route.snapshot.params.data);
    console.log('route params', this.quizContent)
    this.lastPage = this.testItems.length;
    console.log(this.lastPage)

    this.currentData = this.testItems[0];
    this.currentQuestion = this.quizContent.questions[0];
    this.config = { leftTime: 5, format: 'mm:ss' };
  }


  async ngOnInit() {
    const quiz: any = await this.getQuizzes()
    this.questions = quiz[0].questions;
    console.log(this.questions, quiz)
  }

  setCurrentData() {
    const idx = this.currentPage;
    this.currentData = this.testItems[idx];
    this.currentQuestion = this.quizContent.questions[idx];
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
      this.totalCorrectAnswers +=1;
      console.log(this.totalCorrectAnswers)
    }
    setTimeout(() => {
      this.currentData = '';
      this.nextPage();
      this.resetTimer()
    }, 300)

    // }
  }

  checkScore() {

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
    this.config = { leftTime: 5, format: 'mm:ss', demand: false };
    this.countdown.begin();
  }

  resetTimer() {
    this.countdown.restart()
  }

  async getQuizzes() {
    return await this.httpClient.get('./assets/mocks/quizzes-mock.json').toPromise();
  }

}


