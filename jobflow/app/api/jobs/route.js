import { getAuth } from '@clerk/nextjs/server'; // Correct import for getAuth
import { NextResponse } from 'next/server';
import db from '../../database/db'; // Your database import

// 🔹 GET: Fetch all jobs for the logged-in user
export async function GET(req) {
  const { userId } = getAuth(req); // Use getAuth and pass req to get the logged-in user's ID

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // If no userId, return 401 Unauthorized
  }

  // Query the database for jobs associated with the logged-in user
  const jobs = db.prepare('SELECT * FROM jobs WHERE user_id = ?').all(userId);

  return NextResponse.json(jobs); // Return the jobs as a JSON response
}

// 🔹 POST: Add a new job for the logged-in user
export async function POST(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { company, position, status, applied_date } = await req.json();

  // Insert the new job into the database
  const insert = db.prepare(
    'INSERT INTO jobs (user_id, company, position, status, applied_date) VALUES (?, ?, ?, ?, ?)'
  );
  const result = insert.run(userId, company, position, status, applied_date);

  // Return the newly added job (with ID) so that the front-end can update its state
  const newJob = {
    id: result.lastInsertRowid, // Assuming `lastInsertRowid` gives the inserted job ID
    user_id: userId,
    company,
    position,
    status,
    applied_date,
  };

  return NextResponse.json({ success: true, job: newJob }, { status: 201 });
}

// 🔹 PUT: Update an existing job
export async function PUT(req, { params }) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { company, position, status, applied_date } = await req.json();
  const { id } = params;

  // Update the job with the new data
  const update = db.prepare(
    'UPDATE jobs SET company = ?, position = ?, status = ?, applied_date = ? WHERE id = ? AND user_id = ?'
  );
  update.run(company, position, status, applied_date, id, userId);

  // Return the updated job object
  const updatedJob = {
    id,
    user_id: userId,
    company,
    position,
    status,
    applied_date,
  };

  return NextResponse.json({ success: true, job: updatedJob });
}
