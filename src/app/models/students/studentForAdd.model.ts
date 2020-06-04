import { Score } from '../score/score.model';

export class StudentForAdd {
  public name: string;
  public scores: Score[];
  constructor(name?: string, scores?: Score[]) {
    this.name = name;
    this.scores = scores;
  }
}
