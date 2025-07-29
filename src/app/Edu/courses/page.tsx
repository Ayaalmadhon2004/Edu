'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import coursesStyles from './courses.module.css';

 interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  seats: number;
  semesters: number;
  rating: number;
  price: number;
  type: string;
  imageUrl: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data: Course[]) => {
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch((err) => console.error('Failed to fetch courses:', err));
  }, []);

  const filterCourses = (search: string, type: string) => {
    let filtered = courses;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(lowerSearch) ||
          course.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (type) {
      filtered = filtered.filter((course) => course.type.toLowerCase() === type.toLowerCase());
    }

    setFilteredCourses(filtered);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterCourses(value, selectedType);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    filterCourses(searchTerm, value);
  };

  const addToCart = (course: Course) => { //Course from an interface and course is the type of course
    const cart: Course[] = JSON.parse(localStorage.getItem('cart') || '[]'); // cart is contain data from Course data type and localStorage.getItem('cart') to save prev data
    const exists = cart.find((item) => item._id === course._id);
    if (!exists) {
      cart.push(course); // to put the cart at the last it is like cart=['course1',course2]; cart.push(course3);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    } else {
      alert('Course already in cart');
    }
  };

  return (
    <div className={coursesStyles.container}>
      <div className={coursesStyles.details} style={{ marginBottom: '1.5rem' }}>
        <input
          name="search"
          placeholder="Search on what you want"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '0.5rem',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      <div className={coursesStyles.details} style={{ marginBottom: '1.5rem' }}>
        <select name="courseType" id="courseType" onChange={handleTypeChange} value={selectedType}>
          <option value="">All Types</option>
          <option value="Online">Online</option>
          <option value="Part-Time">Part Time</option>
          <option value="On-Campus">OnCampus</option>
          <option value="Full-Time">Full Time</option>
        </select>
      </div>

      <div className={coursesStyles.courses}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course._id} className="course-card">
              <img
                src={course.image}
                alt={course.title}
                style={{ maxWidth: '200px', width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <h2>{course.title}</h2>
              <h3>{course.subtitle}</h3>
              <p>{course.description}</p>
              <p>
                Seats: {course.seats} • Semesters: {course.semesters}
              </p>
              <p>
                Rating: {course.rating} • Price: ${course.price}
              </p>
              <p>Type: {course.type}</p>
              <i
                className="fa-solid fa-cart-plus"
                onClick={() => addToCart(course)}
                style={{ cursor: 'pointer', fontSize: '1.5rem', color: 'var(--main-Red)' }}
              ></i>
            </div>
          ))
        ) : (
          <p>No courses found matching &quot;{searchTerm}&quot;</p>
        )}
      </div>
    </div>
  );
}
