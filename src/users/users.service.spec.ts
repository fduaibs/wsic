import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import UsersUtils from '../common/test/UsersUtils';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import exp from 'constants';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should list all users', async () => {
      const user = UsersUtils.getValidUser();

      mockRepository.find.mockReturnValue([user, user]);

      const users = await service.findAllUsers();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserById', () => {
    it('should find an existing user', async () => {
      const user = UsersUtils.getValidUser();

      mockRepository.findOne.mockReturnValue(user);

      const userFound = await service.findUsersById('1');

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userFound).toMatchObject(user);
    });

    it('should return an exception when it does not find an user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findUsersById('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create an user', async () => {
      const user = UsersUtils.getValidUser();

      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);

      const savedUser = await service.createUser(user);

      expect(savedUser).toMatchObject(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return an exception when it does not create an user', async () => {
      const user = UsersUtils.getValidUser();

      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(null);

      await service.createUser(user).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Attempt to create a new user failed',
        });
      });

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('Should update an user', async () => {
      const user = UsersUtils.getValidUser();
      const updatedUser = { name: 'Updated Name' };

      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });

      mockRepository.create.mockReturnValue({
        ...user,
        ...updatedUser,
      });

      const returnedUser = await service.updateUser('1', {
        ...user,
        ...updatedUser,
      });

      expect(returnedUser).toMatchObject(updatedUser);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('Should delete an existing user', async () => {
      const user = UsersUtils.getValidUser();

      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(user);

      const deleteUser = await service.deleteUser('1');

      expect(deleteUser).toMatchObject({ deleted: true, user: user });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('Should not delete an inexisting user', async () => {
      const user = UsersUtils.getValidUser();

      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(null);

      const deleteUser = await service.deleteUser('3');

      expect(deleteUser).toMatchObject({ deleted: false });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
