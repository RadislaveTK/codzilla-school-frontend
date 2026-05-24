"use client";

import {usePathname} from "next/navigation";

const jsonLdTemplates = {
	home: {
		"@type": "EducationalOrganization",
		name: "Codzilla School",
		description: "Онлайн школа программирования для детей",
		url: "https://codzilla-school.com",
	},
	about: {
		"@type": "AboutPage",
		name: "О школе Codzilla",
		description: "Информация о школе программирования для детей",
	},
	courses: {
		"@type": "ItemList",
		name: "Курсы программирования",
		description: "Список всех курсов программирования для детей",
		itemListElement: [], // Можно динамически заполнять из API
	},
};

export default function JsonLd({ pageType = "home", additionalData = {} }) {
	const pathname = usePathname();
	const baseUrl = "https://codzilla-school.com";
	
	const getJsonLd = () => {
		const template = jsonLdTemplates[pageType] || jsonLdTemplates.home;
		
		const baseJsonLd = {
			"@context": "https://schema.org",
			...template,
			url: `${baseUrl}${pathname}`,
			...additionalData,
		};
		
		// Добавляем хлебные крошки
		if (pageType !== "home") {
			baseJsonLd.breadcrumb = {
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Главная",
						item: baseUrl,
					},
					{
						"@type": "ListItem",
						position: 2,
						name: template.name,
						item: `${baseUrl}${pathname}`,
					},
				],
			};
		}
		
		return baseJsonLd;
	};
	
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }}
		/>
	);
}