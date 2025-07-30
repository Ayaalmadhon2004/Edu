'use client';

import { useEffect, useState } from 'react';
import teacher from './teacher.module.css';

interface Teacher {
  _id: string;
  teacherImage: string;
  teacherName: string;
  teacherSpecialist: string;
}

// بيانات وهمية مؤقتة للاستخدام أثناء التطوير
const mockTeachers: Teacher[] = [
  {
    _id: "1",
    teacherImage: "/default.jpg",
    teacherName: "Aya Ahmad",
    teacherSpecialist: "Math Teacher",
  },
  {
    _id: "2",
    teacherImage: "/default.jpg",
    teacherName: "Fatima Ali",
    teacherSpecialist: "Science Teacher",
  },
];

export default function Page() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   // setTeachers(mockTeachers);
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teacher');
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error('❌ Received non-array data:', data);
          setError('حدث خطأ في تحميل المدرسين.');
          return;
        }

        setTeachers(data);
      } catch (err) {
        console.error('❌ Error fetching teachers:', err);
        setError('حدث خطأ في الاتصال بقاعدة البيانات.');
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className={teacher.teacher}>
      <h2 className={teacher.title}>Our Teachers</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className={teacher.grid}>
        {teachers.length > 0 ? (
          teachers.map((t) => (
            <div key={t._id} className={teacher.card}>
              <img
                src={t.teacherImage}
                alt={t.teacherName}
                className={teacher.image}
              />
              <h3>{t.teacherName}</h3>
              <p>{t.teacherSpecialist}</p>
            </div>
          ))
        ) : !error ? (
          <p>جاري التحميل أو لا يوجد بيانات حالياً.</p>
        ) : null}
      </div>
    </div>
  );
}
