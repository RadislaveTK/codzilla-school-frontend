"use client";

import { useListener } from "react-bus";
import { useState } from "react";
import CustomModal from "@/shared/ui/modal/CustomModal";
import CourseForm from "../forms/CourseForm";
import FeedbackForm from "../forms/FeedbackForm";

export default function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [course, setCourse] = useState("");

  useListener("feedbackModal:open", ({ title, type, course=null }) => {
    setTitle(title);
    setType(type);
    setCourse(course);
    setOpen(true);
  });

  const renderContent = (type) => {
    switch (type) {
      case "course":
        return <CourseForm course={course} onSuccess={() => setOpen(false)} />;
      case "feedback":
        return <FeedbackForm onSuccess={() => setOpen(false)} />;
      default:
        return <p>Тип модального окна не указан</p>;
    }
  };

  return (
    <CustomModal
      title={title}
      openState={[open, setOpen]}
      onClose={() => setOpen(false)}
    >
      {renderContent(type)}
    </CustomModal>
  );
}
