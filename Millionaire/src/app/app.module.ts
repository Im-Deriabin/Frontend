import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionComponent } from './components/questions/question.component';
import { ScoreComponent } from './components/score/score.component';
import { GameOverComponent } from './game-over/game-over.component';
import { WinnerComponent } from './winner/winner.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    ScoreComponent,
    GameOverComponent,
    WinnerComponent
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
