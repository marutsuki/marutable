import React, { ReactNode } from "react";

export const getInnerText = (jsx: ReactNode): string => {
	if (jsx === null) {
		return "";
	}
	if (Array.isArray(jsx)) {
		return jsx.reduce((prev, curr) => prev.concat(getInnerText(curr)), "");
	}
	if (React.isValidElement(jsx)) {
		return getInnerText(jsx.props.children);
	}
	switch (typeof jsx) {
		case "undefined":
			return "";
		case "number":
			return String(jsx);
		case "string":
			return jsx;
		case "boolean":
			return String(jsx);
	}
	return "";
};
