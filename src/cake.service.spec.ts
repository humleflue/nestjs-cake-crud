import { Test, TestingModule } from '@nestjs/testing';
import { CakeKind, CakeService } from './cake.service';

describe('CakeService', () => {
  let cakeService: CakeService;

  
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CakeService],
    }).compile();

    cakeService = app.get<CakeService>(CakeService);
  });

  describe('getCakeById called with id 1', () => {
    it('should return brownie cake!', () => {
      // TODO: Figure out why the signature isn't 'Cake | undefined' but just 'Cake'
      // (non-optional access to .kind is allowed here but shouldn't be)
      expect(cakeService.getCakeById(1).kind).toBe("brownie");
    });
  });

  describe('getCakeById called with id 99', () => {
    it('should return undefined', () => {
      expect(cakeService.getCakeById(99)?.kind).toBeUndefined();
    });
  });

  describe('updateCake called valid kind', () => {
    it('should return updated cake', () => {
      expect(cakeService.updateCake({ id: 1, kind: "kaj"})).toBeDefined();
    });
  });

  describe('updateCake called invalid kind', () => {
    it('should return undefined', () => {
      expect(cakeService.updateCake({ id: 1, kind: "not-a-cake-kind" as CakeKind})).toBeUndefined();
    });
  });
});
