'use client';

import { useEffect, useState } from "react";
import dash from "./dashboard.module.css";

interface Course {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  seats: number;
  semesters: number;
  rating: number;
  price: number;
  type: string;
  imageUrl?: string;
}

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();

        if (!Array.isArray(data)) {
          setError('Error loading courses.');
          return;
        }
        setCourses(data);
      } catch (error) {
        setError('Error connecting to the server.');
      }
    }

    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Delete failed');
      }

      // Remove course from UI
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      alert('Failed to delete course.');
      console.error(error);
    }
  };

  return (
    <div className={dash.container}>
      <h1 className={dash.title}>Courses Dashboard</h1>

      {error && <p className={dash.error}>{error}</p>}

      {!error && courses.length === 0 && <p>No courses available at the moment.</p>}

      {courses.length > 0 && (
        <table className={dash.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Seats</th>
              <th>Semesters</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.seats}</td>
                <td>{course.semesters}</td>
                <td>{course.rating}</td>
                <td>{course.price}</td>
                <td>{course.type}</td>
                <td>
                  <button
                    className={dash.deleteBtn}
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
