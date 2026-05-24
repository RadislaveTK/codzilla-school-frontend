export const defaultMetadata = {
	title: "Codzilla School — Онлайн школа программирования для детей",
	description: "Codzilla School — современная онлайн школа программирования для детей. Курсы по веб-разработке, логике и IT-навыкам с практикой и поддержкой.",
	keywords: [
		"программирование для детей",
		"онлайн школа программирования",
		"курсы программирования",
		"Codzilla School",
		"обучение IT детям"
	],
	authors: [{ name: "Codzilla School" }],
	creator: "Codzilla School",
	publisher: "Codzilla School",
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
	metadataBase: new URL("https://codzilla-school.com"),
	openGraph: {
		siteName: "Codzilla School",
		locale: "ru_RU",
		type: "website",
		images: [{
			url: "/og-image.jpg",
			width: 1200,
			height: 630,
			alt: "Codzilla School — онлайн школа программирования для детей",
		}],
	},
	twitter: {
		card: "summary_large_image",
		site: "@codzilla_school",
		creator: "@codzilla_school",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
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
			url: "https://codzilla-school.com",
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
			url: "https://codzilla-school.com/about",
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
			url: "https://codzilla-school.com/courses",
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