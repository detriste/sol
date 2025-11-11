import { TestBed } from '@angular/core/testing';
import { DadosMockService } from './dados-mock.service';

describe('DadosMockService', () => {
  let service: DadosMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});