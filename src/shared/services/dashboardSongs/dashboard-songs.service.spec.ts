import { TestBed } from '@angular/core/testing';

import { DashboardSongsService } from './dashboard-songs.service';

describe('DashboardSongsService', () => {
  let service: DashboardSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
