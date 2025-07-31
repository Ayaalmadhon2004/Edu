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
  const [loading, setLoading] = useState(true);

  // Fetch courses from API
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received.');
        }

        setCourses(data);
      } catch (err) {
        console.error(err);
        setError('Error loading courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Delete course handler
  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Delete failed with status ${res.status}`);
      }

      // Update UI after delete
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete course. Please try again.');
    }
  };

  return (
    <div className={dash.container}>
      <h1 className={dash.title}>Courses Dashboard</h1>

      {loading && <p>Loading courses...</p>}

      {error && <p className={dash.error}>{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p>No courses available at the moment.</p>
      )}

      {!loading && !error && courses.length > 0 && (
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
