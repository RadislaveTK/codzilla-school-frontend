"use client";

import {useEffect, useState} from "react";

export default function useCourses() {
	const [loading, setLoading] = useState(false);
	const [courses, setCourses] = useState([]);
	const [filter, setFilter] = useState(null);
	
	useEffect(() => {
		setLoading(true);
		
		async function getCourses() {
			try {
				const res = await fetch(
					`https://codzilla-school-backend.local/api/v1/public/courses?${filter}`, {
						cache: 'no-store'
					}
				);
				const data = await res.json();
				setCourses(data?.data);
			} catch (error) {
				console.error("Ошибка при загрузке курсов:", error);
			} finally {
				setLoading(false);
			}
		}
		
		getCourses();
	}, [filter]);
	
	return {courses, loading, filter, setFilter};
}
