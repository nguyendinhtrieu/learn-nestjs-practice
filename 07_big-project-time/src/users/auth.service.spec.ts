import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

describe('Test AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      find: (email: string) => Promise.resolve([]),
      createUser: (email: string, password: string) =>
        Promise.resolve({ id: 123, email, password } as UserEntity),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Test signup success', async () => {
    const user = await service.signup('username@host.com', 'password');
    expect(user).toBeDefined();
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('Test signup throw an error if user signs up with an email that is in used', async () => {
    fakeUserService.find = (email: string) =>
      Promise.resolve([
        { id: 12, email: email, password: 'sdfasdf' } as UserEntity,
      ]);
    await expect(service.signup('alsd@alsdk.com', 'sdfs')).rejects.toThrow(
      BadRequestException,
    );
  });
});
