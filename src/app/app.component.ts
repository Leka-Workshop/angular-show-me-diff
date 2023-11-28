import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Change, diffWordsWithSpace } from 'diff';
import { Subject, takeUntil } from 'rxjs';

enum FormFields {
  Original = 'original',
  Updated = 'updated',
  Language = 'language'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  title = 'Show Me Diff';

  union!: string;
  differences!: string;
  intersection!: string;

  formatLanguage = 'typescript';
  compareForm!: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setupForm();
    // this.listenOnLanguageChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setupForm(): void {
    this.compareForm = this.fb.group({
      [FormFields.Original]: [''],
      [FormFields.Updated]: [''],
      // [FormFields.Language]: ['1']
    });
  }

  setLanguage(lng: string) {
    console.log(lng);
    this.formatLanguage = lng;
  }

  // private listenOnLanguageChanges() {
  //   this.compareForm.get(FormFields.Language)?.valueChanges
  //   .pipe(
  //     takeUntil(this.unsubscribe$)
  //   )
  //   .subscribe((newSelection: string) => {
  //     this.formatLanguage = newSelection;
  //     this.cdr.detectChanges(); // Manually trigger change detection

  //   })
  // }

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
