import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/shared/config/site";

export const defaultMetadata = {
	title: "Codzilla School — Онлайн школа программирования для детей",
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	keywords: [
		"программирование для детей",
		"онлайн школа программирования",
		"курсы программирования",
		"Codzilla School",
		"обучение IT детям"
	],
	authors: [{ name: SITE_NAME }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	category: "education",
	referrer: "origin-when-cross-origin",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: "/",
		languages: {
			ru: "/",
			kk: "/",
		},
	},
	openGraph: {
		title: "Codzilla School — Онлайн школа программирования для детей",
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		siteName: SITE_NAME,
		locale: "ru_RU",
		type: "website",
		images: [{
			url: "/opengraph-image",
			width: 1200,
			height: 630,
			alt: "Codzilla School — онлайн школа программирования для детей",
		}],
	},
	twitter: {
		card: "summary_large_image",
		title: "Codzilla School — Онлайн школа программирования для детей",
		description: SITE_DESCRIPTION,
		images: ["/opengraph-image"],
	},
	icons: {
		icon: "/favicon.ico",
	},
	manifest: "/manifest.webmanifest",
};

// Метаданные для каждой страницы
export const pageMetadata = {
	home: {
		title: "Codzilla School — Онлайн школа программирования для детей",
		description: "Научите ребенка программировать с нуля до первых проектов. Интерактивные курсы, реальные проекты и поддержка наставников.",
		keywords: [...defaultMetadata.keywords, "главная страница", "обучение с нуля"],
		openGraph: {
			title: "Codzilla School — Онлайн школа программирования для детей",
			description: "Научите ребенка программировать с нуля до первых проектов. Запишитесь на пробный урок!",
			url: SITE_URL,
		},
		twitter: {
			title: "Codzilla School — Онлайн школа программирования для детей",
			description: "Научите ребенка программировать с нуля до первых проектов. Запишитесь на пробный урок!",
		},
	},
	about: {
		title: "О школе Codzilla — Наша миссия и команда",
		description: "Узнайте о Codzilla School: наша миссия, опытные преподаватели, современные методики обучения и достижения учеников.",
		keywords: ["о школе", "команда", "миссия", "преподаватели", "достижения"],
		openGraph: {
			title: "О школе Codzilla — Наша миссия и команда",
			description: "Узнайте о Codzilla School: опытные преподаватели, современные методики и достижения учеников.",
			url: `${SITE_URL}/about`,
		},
		twitter: {
			title: "О школе Codzilla — Наша миссия и команда",
			description: "Узнайте о Codzilla School: опытные преподаватели, современные методики и достижения учеников.",
		},
	},
	courses: {
		title: "Курсы программирования для детей — Codzilla School",
		description: "Выберите курс программирования для ребенка: веб-разработка, логика, Python, игры. Интерактивные занятия с практикой.",
		keywords: ["курсы программирования", "выбрать курс", "расписание", "цены"],
		openGraph: {
			title: "Курсы программирования для детей — Codzilla School",
			description: "Выберите курс программирования для ребенка: веб-разработка, Python, игры. Запишитесь на пробный урок!",
			url: `${SITE_URL}/courses`,
		},
		twitter: {
			title: "Курсы программирования для детей — Codzilla School",
			description: "Выберите курс программирования для ребенка: веб-разработка, Python, игры.",
		},
	},
};

// Функция для объединения метаданных
export function generateMetadata(pageName, customMetadata = {}) {
	const basePageMetadata = pageMetadata[pageName] || {};
	
	return {
		...defaultMetadata,
		...basePageMetadata,
		...customMetadata,
		openGraph: {
			...defaultMetadata.openGraph,
			...basePageMetadata.openGraph,
			...customMetadata.openGraph,
		},
		twitter: {
			...defaultMetadata.twitter,
			...basePageMetadata.twitter,
			...customMetadata.twitter,
		},
		keywords: customMetadata.keywords || basePageMetadata.keywords || defaultMetadata.keywords,
	};
}
