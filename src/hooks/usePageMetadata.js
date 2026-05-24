import {generateMetadata} from "@/shared/config/seo/seo";

export function usePageMetadata(pageName, customMetadata={}) {
	return generateMetadata(pageName, customMetadata);
}