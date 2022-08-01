const parcelCss = require('@parcel/css')

const result = parcelCss.transform({
	code: Buffer.from(`.title {	color: orange; } .test { display: flex; }`),
	sourceMap: true,
	// cssModules: true
})

console.log(result.code.toString())
console.log(result.exports)
