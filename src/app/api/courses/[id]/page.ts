import { connectToDB } from '@/utils/db'; // your db connection file
import Course from '@/models/Course'; // your Mongoose model
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectToDB();

  if (req.method === 'DELETE') {
    try {
      const deleted = await Course.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
