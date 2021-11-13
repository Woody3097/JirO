import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`#CreateTask id => currentId`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.form.get('id')?.value).toBe(0);
    app.createTask()
    expect(app.form.get('id')?.value).toBe(app.currentId);
  });

  it(`#SetCreator creator => { name: 'Michael' }`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.form.get('creator')?.value).toBe('');
    app.setCreator();
    expect(app.form.get('creator')?.value).toEqual({ name: 'Michael' });
  });
});
