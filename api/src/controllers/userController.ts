import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { createSuccessResponse, createErrorResponse } from '@es/shared';
import { asyncHandler } from '../middleware/errorHandler';

// Validation schemas
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
});

// Get all users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json(createSuccessResponse(users));
});

// Get user by ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });

  if (!user) {
    return res.status(404).json(createErrorResponse('User not found'));
  }

  res.json(createSuccessResponse(user));
});

// Create user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const validation = createUserSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(createErrorResponse('Invalid input data'));
  }

  const { email, name } = validation.data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json(createErrorResponse('User with this email already exists'));
  }

  const user = await prisma.user.create({
    data: { email, name },
  });

  res.status(201).json(createSuccessResponse(user, 'User created successfully'));
});

// Update user
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validation = updateUserSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(createErrorResponse('Invalid input data'));
  }

  const updateData = validation.data;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    return res.status(404).json(createErrorResponse('User not found'));
  }

  // Check email uniqueness if email is being updated
  if (updateData.email && updateData.email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: updateData.email },
    });

    if (emailExists) {
      return res.status(409).json(createErrorResponse('Email already in use'));
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  res.json(createSuccessResponse(user, 'User updated successfully'));
});

// Delete user
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return res.status(404).json(createErrorResponse('User not found'));
  }

  await prisma.user.delete({
    where: { id },
  });

  res.json(createSuccessResponse(null, 'User deleted successfully'));
});