import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataPage } from './add-data.page';

describe('AddDataPage', () => {
  let component: AddDataPage;
  let fixture: ComponentFixture<AddDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
