import { Component } from '@angular/core';
import {IQuestion} from'src/app/models/question';
import{questions as data} from 'src/app/data/questions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Кто хочет стать миллионером';
  questions: IQuestion[] = data;
  scoreParent: number=0;
  game_over:boolean=false;
  outAnswer(outScoreCild:boolean){
    
    if (outScoreCild) {
      setTimeout(()=>{
        this.scoreParent++;
        data.shift();
      },1000);
    } else if(!outScoreCild){
      setTimeout(()=>{
        this.game_over=!this.game_over;
      },1000);
    }
  } 
}
