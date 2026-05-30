import { useState } from "react";

export default function useFeedback() {
  const [loading, setLoading] = useState(false);

  const sendFeedback = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://codzilla-school-backend.local/api/v1/public/feedback",
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
        "https://codzilla-school-backend.local/api/v1/public/applications",
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
