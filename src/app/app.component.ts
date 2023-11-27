import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Change, diffWordsWithSpace } from 'diff';

enum FormFields {
  Original = 'original',
  Updated = 'updated',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Show Me Diff';

  union!: string;
  differences!: string;
  intersection!: string;

  compareForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setupForm();
  }

  private setupForm(): void {
    this.compareForm = this.fb.group({
      [FormFields.Original]: [''],
      [FormFields.Updated]: [''],
    });
  }

  onSubmit(): void {
    const { original, updated } = this.compareForm.value;

    // Union
    const changes = diffWordsWithSpace(original, updated, { ignoreCase: true });
    this.union = changes.map((part: Change) => part.value).join(' ');

    // Differences
    const addedChanges = changes.filter((part) => part.added);
    this.differences = addedChanges.map((part) => part.value).join(' ');

    // Intersection
    const originalWords = original.split(/\s+/);
    const updatedWords = updated.split(/\s+/);

    this.intersection = originalWords
      .filter((word: string) => updatedWords.includes(word))
      .join(' ');
  }
}
