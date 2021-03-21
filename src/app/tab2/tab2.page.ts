import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownEvent, CountdownComponent, CountdownConfig } from 'ngx-countdown';
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
  quizzes:any;
  testItems = [
    {
      id: 1,
      question: "Who was elected President of the United States in 2017?",
      isOpen: false,
      choices: [
        {
          title: "Donald Trump",
          selected: false,
          correct: true
        },
        {
          title: "Barack Obama",
          selected: false,
          correct: false

        },
        {
          title: "George Bush",
          selected: false,
          correct: false
        }
      ]
    },
    {
      id: 2,
      question: "What is the approximate number of islands that comprise the Philippines?",
      isOpen: false,
      choices: [
        {
          title: "6500",
          selected: false,
          correct: false
        },
        {
          title: "7500",
          selected: false,
          correct: true
        },
        {
          title: "8500",
          selected: false,
          correct: false
        }
      ]
    },
    {
      id: 3,
      question: "Which country occupied the Philppies during World War II",
      isOpen: false,
      choices: [
        {
          title: "Germany",
          selected: false,
          correct: false
        },
        {
          title: "Japan",
          selected: false,
          correct: true
        },
        {
          title: "China",
          selected: false,
          correct: false
        }
      ]
    },
    {
      id: 4,
      question: "What is the term of the President of the Philippines?",
      isOpen: false,
      choices: [
        {
          title: "Four years",
          selected: false,
          correct: false
        },
        {
          title: "Five years",
          selected: false,
          correct: false
        },
        {
          title: "Six Years",
          selected: false,
          correct: true
        }
      ]
    }, {
      id: 5,
      question: "Which country had the Philippines as its colony for more than 300 years?",
      isOpen: false,
      choices: [
        {
          title: "Italy",
          selected: false,
          correct: false
        },
        {
          title: "Spain",
          selected: false,
          correct: true
        },
        {
          title: "England",
          selected: false,
          correct: false
        }
      ]
    }
  ];
  currentPage = 0;
  lastPage = 0;
  constructor(private httpClient: HttpClient,private router:Router) {
    this.lastPage = this.testItems.length;
    console.log(this.lastPage)

    this.currentData = this.testItems[0];
    this.config = { leftTime: 5, format: 'mm:ss' };
  }

  async ngOnInit(){
    this.quizzes = await this.getQuizzes()
    console.log(this.quizzes)
  }
  setCurrentData() {
    const idx = this.currentPage;
    this.currentData = this.testItems[idx];
  }

  nextPage() {
    this.currentPage++;


    if (this.currentPage >= this.lastPage) {
      console.log(this.currentPage, this.lastPage)
      this.currentData = ''
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
    console.log('test:;', this.currentData.question)
    this.currentData.isOpen = true;
    this.currentData.choices[i].selected = true;

    if (this.currentData.choices[i].correct) {
      this.totalScore++;
      console.log('totalscore', this.totalScore)
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

  openQuiz(quiz){
    const quizContent = JSON.stringify(quiz)
    this.router.navigate(['/quiz-view', {data:quizContent}])
  }
}
