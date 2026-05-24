import {generateMetadata} from "@/shared/config/seo/seo";
import PageContent from "@/app/courses/PageContent";

export const metadata = generateMetadata("about", {
	title: "Codzilla School — Онлайн школа программирования для детей",
	description:
		"Codzilla School — современная онлайн школа программирования для детей. Курсы по веб-разработке, логике и IT-навыкам с практикой и поддержкой.",
	keywords: [
		"программирование для детей",
		"онлайн школа программирования",
		"курсы программирования",
		"Codzilla School",
		"обучение IT детям"
	],
	openGraph: {
		title: "Codzilla School — Онлайн школа программирования для детей",
		category: "education",
		description: "Научите ребенка программировать с нуля до первых проектов. Интерактивные курсы, реальные проекты и поддержка наставников.",
		url: "https://codzilla-school.com",
		siteName: "Codzilla School",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Codzilla School — онлайн школа программирования для детей",
				type: "image/jpeg"
			}
		],
		locale: "ru_RU",
		type: "website",
		emails: ["info@codzilla-school.com"],
		phoneNumbers: ["+7 (XXX) XXX-XX-XX"]
	},
	appleWebApp: {
		title: "Codzilla School",
		statusBarStyle: "black-translucent",
		capable: true
	}
});


export default function CoursePage() {
	return <PageContent />;
}