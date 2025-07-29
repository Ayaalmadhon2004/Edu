'use client';

import { useEffect, useState } from 'react';
import teacher from './teacher.module.css';

export default function Page() {
  interface Teacher {
    _id: string;
    teacherImage: string;
    teacherName: string;
    teacherSpecialist: string;
  }

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teacher'); // تأكد من وجود هذا الـ route
        const data = await res.json();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className={teacher.teacher}>
      <h2 className={teacher.title}>Our Teachers</h2>
      <div className={teacher.grid}>
        {teachers.map((t) => (
          <div key={t._id} className={teacher.card}>
            <img src={t.teacherImage} alt={t.teacherName} className={teacher.image} />
            <h3>{t.teacherName}</h3>
            <p>{t.teacherSpecialist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
