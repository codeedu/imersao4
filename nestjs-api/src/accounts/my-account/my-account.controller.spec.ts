import { Test, TestingModule } from '@nestjs/testing';
import { MyAccountController } from './my-account.controller';

describe('MyAccountController', () => {
  let controller: MyAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyAccountController],
    }).compile();

    controller = module.get<MyAccountController>(MyAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
