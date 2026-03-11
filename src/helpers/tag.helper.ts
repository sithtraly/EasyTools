import $ from 'jquery'

interface Attibute {
	key: string,
	value: any
}

export const newTag = (tagName: string, options: {
	classes?: string | string[],
	id?: string,
	value?: string,
	text?: string,
	otherAttribute?: Attibute[]
} = {}) => {
	const { classes, id, otherAttribute, text, value } = options
	let tag
	if (tagName == 'input') tag = $(`<${tagName} />`)
	else tag = $(`<${tagName}></${tagName}>`)

	if (classes) {
		if (typeof classes == 'string') tag.addClass(classes.split(' '))
		else tag.addClass(classes)
	}
	if (id) tag.attr('id', id)
	if (value) tag.val(value)
	if (text) tag.html(text)
	if (otherAttribute) otherAttribute.forEach(attr => tag.attr(attr.key, attr.value))
	return tag
}