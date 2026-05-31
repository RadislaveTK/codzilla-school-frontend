import { useState } from "react";
import { API_URL } from "@/shared/config/api";

export default function useFeedback() {
  const [loading, setLoading] = useState(false);

  const sendFeedback = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/v1/public/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("Ошибка отправки отзыва");
      }
      return await response.json();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendCourseEnrollment = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/public/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("Ошибка отправки заявки на курс");
      }
      return await response.json();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendFeedback, sendCourseEnrollment };
}
