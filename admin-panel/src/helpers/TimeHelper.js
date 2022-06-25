export const getDateTime = (date) => {
	let diff = (Date.now() - date) / 1000;
	if (diff < 60) {
		return `${Math.round(diff)} second${diff === 1 ? '' : 's'} ago`;
	}

	diff = Math.round(diff / 60);
	if (diff < 60) {
		return `${diff} minute${diff === 1 ? '' : 's'} ago`;
	}

	diff = Math.round(diff / 60);
	if (diff < 24) {
		return `${diff} hour${diff === 1 ? '' : 's'} ago`;
	}

	diff = Math.round(diff / 24);
	if (diff < 3) {
		return `${diff} day${diff === 1 ? '' : 's'} ago`;
	}

	const d = new Date(date).toString().split(' ');
	const t = new Date(date).toLocaleTimeString().split(':');
	const amPm = t[2]?.split(' ');
	return `${d[1]} ${d[2]}, ${d[3]} at ${t[0]}:${t[1]}${amPm[1] && amPm.length > 1 ? ' ' + amPm[1] : ''}`;
};