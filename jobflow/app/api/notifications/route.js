import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import db from '../../database/db';

export async function GET(req) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const today = new Date().toISOString().split('T')[0]; // '2025-04-28'
  
  const jobs = db.prepare('SELECT * FROM jobs WHERE user_id = ? AND interview_date = ?').all(userId, today);

  return NextResponse.json(jobs);
}