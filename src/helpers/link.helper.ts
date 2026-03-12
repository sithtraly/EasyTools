document.addEventListener('DOMContentLoaded', () => {
	if (location.href.includes('localhost')) {
		const links = document.querySelectorAll('a')
		links.forEach(link => {
			link.href = link.href.replace('/EasyTools/', '/')
		})
	}
})