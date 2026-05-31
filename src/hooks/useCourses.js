"use client";

import {useEffect, useState} from "react";
import { API_URL } from "@/shared/config/api";

export default function useCourses() {
	const [loading, setLoading] = useState(false);
	const [courses, setCourses] = useState([]);
	const [filter, setFilter] = useState(null);
	
	useEffect(() => {
		async function getCourses() {
			setLoading(true);

			try {
				const res = await fetch(
					`${API_URL}/api/v1/public/courses?${filter || ""}`, {
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
		
		const timeoutId = window.setTimeout(getCourses, 0);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [filter]);
	
	return {courses, loading, filter, setFilter};
}
