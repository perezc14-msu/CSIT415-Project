import { getAuth } from '@clerk/nextjs/server'; 
import { NextResponse } from 'next/server';
import db from '../../../database/db'; 

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

// ✅ Delete Job (DELETE)
export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        const statement = db.prepare(`DELETE FROM jobs WHERE id = ?`);
        const result = statement.run(id);

        if (result.changes === 0) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
