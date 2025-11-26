import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentClients } from './recent-clients';

describe('RecentClients', () => {
  let component: RecentClients;
  let fixture: ComponentFixture<RecentClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentClients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentClients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
