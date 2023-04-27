import React from 'react';
import head from '../data/json/headsData';

const getMeta = page => {
	if (page && head[page] && head[page].meta)
		return head[page].meta.map((value, index) => <meta key={index} {...value} />);
	return '';
};

const getTitle = (page, vars) => {
	if (page && head[page] && head[page].title) {
		var title = head[page].title;
		vars && Object.keys(vars).forEach(key => {
			title = title.replace(`#${key}`, vars[key])
		});
		return <title>{title}</title>;
	}
	return '';
}

export { getMeta, getTitle };