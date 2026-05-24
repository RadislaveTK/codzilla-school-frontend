import CourseBlockHome
	from "@/features/course/ui/CourseBlockHome/CourseBlockHome";
import CarouselOne from "@/shared/ui/components/home/CarouselOne";
import CarouselTwo from "@/shared/ui/components/home/CarouselTwo";
import StatisticBlock from "@/shared/ui/components/home/StatisticBlock";
import {generateMetadata} from "@/shared/config/seo/seo";
import JsonLd from "../shared/config/seo/JsonLd";

export const metadata = generateMetadata("home");

export default function Home() {
	return <>
		<JsonLd pageType={"home"} pageName={"home"}/>
		<div className="page">
			<CarouselOne/>
			<CourseBlockHome/>
			<StatisticBlock/>
			<CarouselTwo/>
		</div>
	</>;
}
