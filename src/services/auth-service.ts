'use server';

import configuration from '@/config/configuration';
import prisma from '@/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(email: string, password: string) {
  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      configuration?.jwtSecret as string,
      {
        expiresIn: '7d',
      },
    );

    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function logout() {
  // In a client-side auth system, we just need to remove the token
  // This is handled in the auth context by removing from localStorage
  return true;
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, configuration?.jwtSecret as string) as {
      id: string;
    };
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}
