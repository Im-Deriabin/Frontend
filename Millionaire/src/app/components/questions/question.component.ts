import {Component, EventEmitter, Input, Output} from '@angular/core'
import { Ianswer } from 'src/app/models/ianswer'
import { IQuestion } from 'src/app/models/question'



@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class QuestionComponent {
    @Input() question: IQuestion;
    @Output() outAnswer = new EventEmitter<boolean>();
    clickAnswer:string="";

    onChoiseClick(answer: Ianswer): void{
        this.outAnswer.emit(answer.corect);
        if(answer.corect){
            this.clickAnswer = "corect";
        } else if(!answer.corect){
            this.clickAnswer="incorect";
        } 
    }
}

