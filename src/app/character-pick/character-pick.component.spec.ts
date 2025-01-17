import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPickComponent } from './character-pick.component';

describe('CharacterPickComponent', () => {
  let component: CharacterPickComponent;
  let fixture: ComponentFixture<CharacterPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterPickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
